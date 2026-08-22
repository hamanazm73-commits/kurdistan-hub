# TEAM-LOG — who is doing what

Two people work on this repo through Claude, from different machines. This file
is how the two sides avoid building the same thing twice.

The rules are in `AGENTS.md`. In short: pull, read this file, push your claim
**before** starting, then mark it done when the code is pushed.

Newest entry at the top.

---

## 2026-08-22 — hamakali2005 · done

**Re-shot the cards.** The shops site got a hero this morning — a photograph,
the badge pill and the gold rule the other two open with — and the card was
still showing the flat navy screen from before it. Three doors, one of them a
picture of a site that no longer looks like that.

`npm run shots` against the live sites. Eight of the nine changed; only
`homes.en` came back byte-identical. The shops frame reads as one family with
the other two now: same mountains, same hour, same masthead.

Nothing in your card design was touched — the browser window, the tilt and the
glint are all yours and all still there. This is only the picture inside them.

## 2026-08-22 04:20 — Mohammed · done

The screenshot on each card now sits in a browser window that looks like one.
It had three dots and an address, which says "browser" only to somebody
already looking for it. Six things were added, and every one of them is a
thing a real browser has — it was their absence that made it read as a
picture rather than a screen:

- a **tab**, carrying the site's own favicon and its name
- **back / forward / reload**, and a **padlock** in the address
- a **scrollbar**, thumb a little down from the top — the detail that says
  this is the head of a long page, not the whole of a short one
- **depth**: the window casts a shadow onto the card and catches a hairline
  of light along its top edge
- **light**: a lit screen spills onto what it stands on, so the card glows
  faintly behind the window; the picture itself is no longer held back
- a **tilt** of 3.5°, straightening when a finger is on the card, and a
  **glint** that crosses the glass once on hover

Nothing moves until something is hovered, and the whole set is off under
`prefers-reduced-motion`.

The six parts live in `globals.css` under "The browser window on each project
card" rather than as Tailwind utilities — it is one object whose parts have to
agree with each other, and it is readable as CSS.

Checked at 1280px and 375px; no overflow, all three pictures load.

## 2026-08-22 03:40 — Mohammed · done

Two faults in the card screenshots from an hour ago, both found by Hama:

1. **The picture stayed Kurdish** whatever language the doorway was set to.
2. **The pictures contained counts** — "16 hotels, 2 cities" on hotels, "3
   cities, 1 property" on homes — so adding a listing would have made them
   wrong, and every listing after that would have meant taking them again.

Both are fixed in `scripts/shoot.mjs`:

- **Nine pictures, not three.** Each site is shot in ku, ar and en;
  `projects.ts` now holds `shot` as a translated field and the card picks the
  one matching the reader. Only three ever load — the language in use.
- **The frame stops above the counter.** Rather than hard-coding where the
  counter sits today, the script asks the page: it looks for anything in the
  hero whose whole text is a number and clips 26px above the highest one. The
  measurement runs per language, because the Arabic hero is shorter than the
  English one — 585px against 630px on homes.
- The top of the frame is still the site's own `<header>`, so switching the
  coming-soon banner off does not slice into the hotels navigation.

The card frame went from 8:5 to 2:1 to suit the shorter crop.

Also fixed: `npm run shots` exited 1 on Windows after writing all nine files,
because Chrome still held its temp profile when the script tried to delete it.

Checked in all three languages at 1280px and in Kurdish at 375px.

## 2026-08-22 03:10 — Mohammed · done

The three project cards on layhama.com now show a **screenshot of the site**
they link to, inside a browser-window frame with the address in its bar.

What was there before: each card had the project's logo on a lit stage — two
still rings, two rippling outward, a wedge of gold turning behind it and the
mark floating up and down, three times over. Under it, the name, the tagline,
the domain in a chip, three bullet points and a filled gold button.

What changed and why:

- **The logo became a screenshot.** A logo cannot tell anyone what a site
  looks like; a picture of the page can, and the window frame around it reads
  as "a website" before a word is read.
- **The domain moved into the address bar**, so it no longer needs a chip of
  its own — and the project's mark sits beside it like a favicon, which is
  why `marks.tsx` is still used.
- **Nine bullet points became three sentences.** Three cards times three
  points is nine lines on one screen and nobody reads them. `points` in
  `projects.ts` is now `blurb`, one sentence in all three languages.
- **The gold button became a gold rule** above the name that widens on hover.
  The whole card was already the link, so the button was a second thing to
  press for the same result.
- **60 lines of animation CSS deleted** — `.sweep`, `.ripple`, `.float-mark`
  and their reduced-motion block existed only for the stage.

`npm run shots` (new, `scripts/shoot.mjs`) retakes all three pictures from the
live sites. It drives headless Chrome over DevTools Protocol, because each of
the three opens a language chooser on a first visit and `chrome --screenshot`
has no way to answer one. Needs Chrome, no packages, no key. **When you change
the look of hotels, homes or bedozawa, run it** — otherwise the doorway keeps
advertising a version of your site that no longer exists.

Checked at 375px: no overflow, the cards stack, all three images load.

## OPEN — Mohammed: Vercel is blocking everything Hama pushes

Vercel's own words, on the dukan deployment of `0b92381`:

> **Deployment Blocked** — The deployment was blocked because the commit author
> did not have contributing access to the project on Vercel. The Hobby Plan does
> not support collaboration for private repositories.

The Vercel account is **mohammed**, on **Hobby**. The repos are **private**,
under `hamanazm73-commits`. Commits authored by **hamakali2005-ops** — every
commit from Hama's side — are refused a build. Yours build normally.

### What this is not

Worth saying plainly, because time went into ruling each of these out:

- **Not the code.** All four repos build clean locally.
- **Not a failed build.** The builds never start.
- **Not billing.** There was a separate "billing address incomplete" warning
  earlier; it is gone and the block stayed. Different thing.
- **Not env vars, not the branch setting, not DNS.**
- **Not `3-dukan.txt`.** Hama's `.env.local` has had all eight NEXT_PUBLIC_
  values since the first day; `/shops/…` answers 200 on his machine.

### Why some of his work IS live and some is not

A blocked commit is not lost — it is still on the branch. The next time **you**
push, Vercel builds **your** commit, and everything sitting behind it on the
branch ships with it.

That is the whole pattern: his work reaches the site whenever you happen to
push after him, and stops dead whenever you do not. The third card on
layhama.com is his and it is live, because you pushed at 04:31. Nothing after
that has moved.

### Waiting on the branch right now

- `f4f8799` Let each site say which commit it is running
- `c3a0cec` Ask Mohammed why the last commit has not deployed
- `8167f83` Name the shops site the same thing in all three languages
- `ef2f1e7` Move the third door to bedozawa.layhama.com
- `c34e426` Open a third door, to the shops
- `b654a49` Add the shared team workflow and TEAM-LOG so the two sides do not repeat work

### Four ways out — your call, it is your account

1. **Make the repos public.** Free, and Hobby only refuses collaboration on
   *private* repos. Nothing secret is in them — `.env.local` is gitignored and
   verified untracked in all four. The cost is that the code is readable by
   anyone.
2. **Upgrade to Pro.** About $20 a month. The correct fit for two people
   working on one thing, and the repos stay private.
3. **Have Hama's commits authored as you.** Free and immediate, but the history
   would say you wrote all of it — and TEAM-LOG only works because it says who
   did what.
4. **Deploy from the command line** with a token, which skips the author check.
   Free, but it becomes a manual step after every change.

Hama was asked and did not want to pick one on your behalf. Say which, and it
gets set up from his side in a few minutes.

### Until then

`/api/version` is on all four sites now — it reports the commit each one is
actually running, so this is visible in one request instead of by noticing an
old word on a page. It is itself in the blocked queue, so it starts answering
after the first successful deploy.

## 2026-08-21 14:39 — hamakali2005 · done

**`/api/version` reports the commit this site is actually running.** A push is
not a deploy: code sat right on origin for five hours today while the live site
served the morning's words, and the only way that surfaced was somebody
noticing the old name on the page.

`check-live.ps1` in `C:\Users\Admin\dev` asks all four and compares each
against its branch. BEHIND means the code is fine and the deployment did not
happen — a different problem, and one only the Vercel account holder can see.

## OPEN — Mohammed: this repo has an undeployed commit

**`8167f83` "Name the shops site the same thing in all three languages" is on
`origin/master` and is not on layhama.com.** Vercel is on your account, so only
you can see why.

What was checked from here:

- the new names are in `origin/master`: `يم حمة تلاقيها` / `Find It at Lay Hama`
- layhama.com/en and /ar still serve `Lay Hama Shops` / `يم حمة للمحلات`
- `Age` on the live page was **17672s — nearly five hours**, and the `Etag` did
  not move between two requests, so nothing new has been published since
  roughly 09:00
- earlier work from `master` **is** live (the gold token `#e7ba54`, the third
  card, the `bedozawa` domain), so deploying from this branch does normally work

So it is one deployment that did not happen, not a broken setup.

**Vercel → hub → Deployments:** is there a build for `8167f83`? Failed, missing,
or still building? If it failed, put the log in here and it can be fixed from
this side. If auto-deploy is off or paused, that is worth saying too — three
more pushes went out today assuming it was on.

Hama cannot check any of this: the project is on your account, not his.

## 2026-08-21 14:10 — hamakali2005 · done

The shops card is named the same thing in all three languages now. The Kurdish
said لای حەمە بیدۆزەوە while the Arabic and English still said "shops" — a
description, not the name. Now يم حمة تلاقيها and Find It at Lay Hama, in the
card, the organisation data here and the site's own.

**Hama chose the Kurdish name.** If either of the other two reads badly to a
native ear, change it and tell him — do not leave it wrong quietly.

## 2026-08-21 04:08 — hamakali2005 · done

The third door is **bedozawa.layhama.com**, not shops. — the address now says
what the site is called. Changed on both sides: the hub entry, the OG card and
the organisation data here, the default SITE_URL and .env.local there.

## 2026-08-21 04:00 — hamakali2005 · done

Third door added: **لای حەمە بیدۆزەوە** at shops.layhama.com, beside hotels and
homes. New entry in projects.ts, a ShopsMark drawn in the same family — navy
badge, gold double ring, the three stars, a shop front under an awning with its
counter punched out — and the grid opened to lg:grid-cols-3 in a max-w-6xl.

Titles, the OG card and the organisation JSON-LD all say three now, and
subOrganization carries shops so a search engine reads the four domains as one
business.

## 2026-08-21 02:45 — hamakali2005 · done

Shared workflow set up: Claude now runs git on both sides, and this log was
added so neither side repeats work the other has already started.
