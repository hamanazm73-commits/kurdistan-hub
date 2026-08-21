# TEAM-LOG — who is doing what

Two people work on this repo through Claude, from different machines. This file
is how the two sides avoid building the same thing twice.

The rules are in `AGENTS.md`. In short: pull, read this file, push your claim
**before** starting, then mark it done when the code is pushed.

Newest entry at the top.

---

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
