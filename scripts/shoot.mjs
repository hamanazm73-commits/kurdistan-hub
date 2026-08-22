/**
 * Refresh the screenshots on the project cards.
 *
 *     npm run shots
 *
 * Each card shows a picture of the site it links to, and a picture goes stale
 * the moment that site changes. This takes them again from the live sites.
 *
 * Two things it is careful about, because both of them made the pictures wrong
 * once already:
 *
 * **Language.** A visitor reading the doorway in Arabic was shown three
 * Kurdish screenshots. Every site is now shot once per language the doorway
 * speaks, and the card picks the one matching what the reader chose.
 *
 * **Counts.** The hotels hero ends in "16 hotels, 2 cities" and the homes hero
 * in "3 cities, 1 property". Those change every time somebody adds a listing,
 * which would put the picture out of date within the week. The frame now stops
 * above them: what is left is the part of a hero that does not move.
 *
 * It drives headless Chrome over the DevTools Protocol rather than using
 * `chrome --screenshot`, because two of these sites open a language chooser on
 * a first visit and the plain CLI has no way to answer one.
 *
 * No packages: Node 22+ has a global WebSocket and fetch.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "shots");
const PORT = 9333;

/** The languages the doorway speaks. The three sites spell them differently. */
const LANGS = ["ku", "ar", "en"];

/**
 * Each site, and which window of it to show.
 *
 * `inset` crops in from both sides; `maxHeight` is how far down from the top of
 * the site's own `<header>` the frame may reach. Both are ceilings, not
 * measurements — where the frame actually stops is worked out on the page
 * itself, by `MEASURE` below.
 */
const SITES = [
  {
    name: "hotels",
    url: "https://hotels.layhama.com/",
    // Kurdish is "ckb" here — that site also speaks Badini, which the doorway
    // does not.
    lang: { ku: "ckb", ar: "ar", en: "en" },
    prepare: (l) => `localStorage.setItem("lang", ${JSON.stringify(l)});`,
    inset: 0,
    maxHeight: 620,
  },
  {
    name: "homes",
    url: "https://homes.layhama.com/",
    lang: { ku: "ku", ar: "ar", en: "en" },
    // themeAsked skips the second half of its welcome screen, which asks about
    // dark or light after the language.
    prepare: (l) => `
      localStorage.setItem("aqarat.locale", ${JSON.stringify(l)});
      localStorage.setItem("aqarat.themeAsked", "1");`,
    inset: 0,
    maxHeight: 630,
  },
  {
    name: "shops",
    url: "https://bedozawa.layhama.com/",
    lang: { ku: "ku", ar: "ar", en: "en" },
    // A cookie, not localStorage: the shop pages are server-rendered, so the
    // choice has to be readable before the page is built.
    prepare: (l) =>
      `document.cookie = "dukan.lang=" + ${JSON.stringify(l)} + "; path=/; max-age=31536000; samesite=lax";`,
    // Deliberately near-empty — a logo and a search box, like Google — so it is
    // cropped in from both sides. Narrowing the viewport instead made its
    // language pills collide with the logo.
    inset: 102,
    // The search box is the whole site; a frame that stops halfway down it is
    // a picture of a site that looks broken. It moved 51px the morning a badge
    // and a rule went into that hero, and a fixed height cut it in half — so
    // the frame is told what it must contain rather than how tall to be.
    mustShow: ".field",
    maxHeight: 700,
  },
];

/**
 * Where the frame starts and where it has to stop, asked of the page.
 *
 * **Start**: the top of the site's own `<header>`. Not the top of the page —
 * hotels carries a coming-soon banner above its header that the owner can
 * switch off, and a fixed offset would slice into the navigation the day
 * they do.
 *
 * **Stop**: above the first bare number in the hero. Both hotels and homes end
 * their hero with a counter — "16 hotels, 2 cities" — which changes every time
 * somebody adds a listing. A picture containing it is wrong within the week,
 * so rather than hard-code where that box sits today, find anything in the
 * hero whose whole text is a number and stop short of it. It costs nothing on
 * bedozawa, which has no counter and simply returns null.
 */
const MEASURE = `(() => {
  const top = Math.max(0, Math.round(
    (document.querySelector("header")?.getBoundingClientRect().top ?? 0) + scrollY));
  let cut = Infinity;
  for (const el of document.querySelectorAll("main *, section *, header ~ * *")) {
    const text = (el.textContent || "").trim();
    // "16", "3", "+1" — a number and nothing else. Short, so a sentence that
    // happens to start with a digit is not mistaken for a counter.
    if (text.length > 6 || !/^\\+?[0-9][0-9.,]*\\+?$/.test(text)) continue;
    const y = Math.round(el.getBoundingClientRect().top + scrollY);
    // Only the hero: far enough down to be past the heading, near enough to be
    // above the fold.
    if (y < top + 400 || y > top + 1000) continue;
    cut = Math.min(cut, y);
  }
  // Where a named element ends, when the site has said the frame has to
  // contain one. The token below is substituted per site before this runs —
  // and it is the only place it may appear, because the substitution replaces
  // one occurrence and a second mention would swallow it.
  const sel = MUST_SHOW;
  const must = sel ? document.querySelector(sel) : null;
  const need = must
    ? Math.round(must.getBoundingClientRect().bottom + scrollY)
    : null;
  return JSON.stringify({ top, cut: Number.isFinite(cut) ? cut : null, need });
})()`;

/** Dark on all three: a white card in a row of dark ones reads as a hole. */
const THEME = `localStorage.setItem("theme", "dark");`;

const CHROME_PATHS = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cdp(ws, method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1e9);
    const onMsg = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id !== id) return;
      ws.removeEventListener("message", onMsg);
      m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result);
    };
    ws.addEventListener("message", onMsg);
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
}

const profile = mkdtempSync(join(tmpdir(), "layhama-shots-"));
let chrome;

try {
  const bin = CHROME_PATHS.find((p) => {
    try { return spawn(p, ["--version"]).pid; } catch { return false; }
  });
  if (!bin) throw new Error("Chrome not found. Set CHROME to its path.");

  chrome = spawn(bin, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    "--no-first-run", "about:blank",
  ], { stdio: "ignore" });

  // Wait for the debugging port rather than guessing at a sleep.
  let ver;
  for (let i = 0; i < 40 && !ver; i++) {
    try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); }
    catch { await sleep(250); }
  }
  if (!ver) throw new Error("Chrome never opened its debugging port");

  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  for (const site of SITES) {
    for (const lang of LANGS) {
      const { targetId } = await cdp(ws, "Target.createTarget", { url: "about:blank" });
      const { sessionId } = await cdp(ws, "Target.attachToTarget", { targetId, flatten: true });

      await cdp(ws, "Page.enable", {}, sessionId);
      await cdp(ws, "Emulation.setDeviceMetricsOverride",
        { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);

      // First load: whatever the site opens with is up, but the origin now
      // exists, so its storage and cookies can be written to.
      await cdp(ws, "Page.navigate", { url: site.url }, sessionId);
      await sleep(6000);
      await cdp(ws, "Runtime.evaluate", {
        expression: `try { ${THEME} ${site.prepare(site.lang[lang])} } catch (e) {}`,
      }, sessionId);

      // Second load: the choice is already made, so nothing asks again.
      await cdp(ws, "Page.reload", {}, sessionId);
      await sleep(9000);

      const { result } = await cdp(ws, "Runtime.evaluate", {
        expression: MEASURE.replace(
          "MUST_SHOW",
          JSON.stringify(site.mustShow ?? null),
        ),
        returnByValue: true,
      }, sessionId);
      const { top, cut, need } = JSON.parse(result.value);

      /*
       * How tall the frame is, in order of who gets to decide.
       *
       * The counter is a hard stop: it changes every time somebody adds a
       * listing, so a frame containing it is wrong within the week. A clear
       * margin above it, so the rounded top edge of its box does not peek in.
       *
       * Below that, a site that named something the frame must contain gets
       * enough room for it and 24px of air. maxHeight is only the ceiling —
       * it stops a page with no counter and no floor from being shot to the
       * bottom of the viewport.
       */
      const ceiling = Math.min(site.maxHeight, cut ? cut - top - 26 : Infinity);
      const height = need ? Math.min(ceiling, need - top + 24) : ceiling;
      const width = 1280 - site.inset * 2;

      // JPEG, not PNG: these are photographs of photographs. PNG kept them at
      // 600-750 KB each, which is most of a second on a phone for what is
      // decoration on a landing page.
      const { data } = await cdp(ws, "Page.captureScreenshot", {
        format: "jpeg", quality: 82, captureBeyondViewport: false,
        clip: { x: site.inset, y: top, width, height, scale: 1280 / width },
      }, sessionId);

      const buf = Buffer.from(data, "base64");
      writeFileSync(join(OUT, `${site.name}.${lang}.jpg`), buf);
      console.log(
        `${site.name}.${lang}`.padEnd(12),
        `${Math.round(buf.length / 1024)} KB`.padStart(6),
        ` ${width}×${height}`.padEnd(11),
        cut ? `counter at ${cut}px` : "no counter",
      );

      await cdp(ws, "Target.closeTarget", { targetId });
    }
  }
  ws.close();
} finally {
  chrome?.kill();
  // Chrome keeps a lock on its profile for a moment after being killed, and on
  // Windows deleting it too early throws EPERM — which used to fail the whole
  // command after all nine pictures had already been written. Give it a moment,
  // then treat a leftover temp folder as what it is: not a problem.
  await sleep(1500);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 400 });
  } catch {
    /* the OS clears its own temp folder eventually */
  }
}
