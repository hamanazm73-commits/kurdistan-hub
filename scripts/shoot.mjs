/**
 * Refresh the screenshots on the project cards.
 *
 *     npm run shots
 *
 * Each card on the landing page shows a picture of the site it links to, and a
 * picture goes stale the moment that site changes. This takes them again from
 * the live sites, so the doorway never advertises a version of a site that no
 * longer exists.
 *
 * It drives headless Chrome over the DevTools Protocol rather than using
 * `chrome --screenshot`, because every one of these sites opens a language
 * chooser on a first visit and the plain CLI has no way to answer it. Here the
 * page is loaded once, the keys the chooser looks for are written, and the page
 * is loaded again — by which time the chooser stays shut.
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

/**
 * Each site, and the window of it worth showing.
 *
 * Every card shows the same 8:5 frame so the three sit level in the grid, but
 * how much of the page fills that frame differs. bedozawa is deliberately
 * near-empty — a logo and a search box, like Google — so it is shot wide and
 * cropped in from both sides; narrowing the viewport instead made its language
 * pills collide with the logo.
 */
const SITES = [
  {
    name: "hotels",
    url: "https://hotels.layhama.com/",
    // 34px down, past the coming-soon banner. A card is not the place for it.
    w: 1280, h: 834, scale: 1, clip: { x: 0, y: 34, width: 1280, height: 800 },
  },
  {
    name: "homes",
    url: "https://homes.layhama.com/",
    w: 1280, h: 800, scale: 1, clip: { x: 0, y: 0, width: 1280, height: 800 },
  },
  {
    name: "shops",
    url: "https://bedozawa.layhama.com/",
    w: 1280, h: 860, scale: 1.334, clip: { x: 160, y: 0, width: 960, height: 600 },
  },
];

/**
 * Every key any of the three language screens reads before deciding to open.
 * Writing all of them on all three origins is harmless — an origin ignores the
 * keys it never asks about — and it means this list does not have to be kept
 * in step with which site uses which name.
 */
const SEED = `
  try {
    localStorage.setItem("lang", "ckb");
    localStorage.setItem("aqarat.locale", "ku");
    localStorage.setItem("aqarat.themeAsked", "1");
    localStorage.setItem("theme", "dark");
  } catch (e) {}
`;

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
    const { targetId } = await cdp(ws, "Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp(ws, "Target.attachToTarget", { targetId, flatten: true });

    await cdp(ws, "Page.enable", {}, sessionId);
    await cdp(ws, "Emulation.setDeviceMetricsOverride",
      { width: site.w, height: site.h, deviceScaleFactor: 1, mobile: false }, sessionId);

    // First load: the language screen is up, but the origin now exists, so its
    // storage can be written to.
    await cdp(ws, "Page.navigate", { url: site.url }, sessionId);
    await sleep(6000);
    await cdp(ws, "Runtime.evaluate", { expression: SEED }, sessionId);

    // Second load: the keys are there, so it stays shut.
    await cdp(ws, "Page.reload", {}, sessionId);
    await sleep(9000);

    // JPEG, not PNG: these are photographs of photographs. PNG kept them at
    // 600-750 KB each, which is most of a second on a phone for what is
    // decoration on a landing page.
    const { data } = await cdp(ws, "Page.captureScreenshot",
      { format: "jpeg", quality: 82, captureBeyondViewport: false,
        clip: { ...site.clip, scale: site.scale } }, sessionId);

    const buf = Buffer.from(data, "base64");
    writeFileSync(join(OUT, `${site.name}.jpg`), buf);
    console.log(`${site.name.padEnd(7)} ${Math.round(buf.length / 1024)} KB`);

    await cdp(ws, "Target.closeTarget", { targetId });
  }
  ws.close();
} finally {
  chrome?.kill();
  rmSync(profile, { recursive: true, force: true });
}
