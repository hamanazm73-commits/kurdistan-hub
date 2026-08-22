# Lay Hama — the doorway

One address that holds every project, so an advert can carry a single link
instead of choosing between them.

Live projects it opens onto:

- **[Lay Hama Hotels](https://hotels.layhama.com)** — find a hotel and book directly
- **Lay Hama Homes** — houses, flats and land, to buy or rent

## Adding a project

One entry in [`src/lib/projects.ts`](src/lib/projects.ts) and its emblem in
[`src/components/marks.tsx`](src/components/marks.tsx). The grid, the animation
order and the layout all follow from the length of that list, so nothing else
needs touching.

## The screenshots on the cards

Each card shows a picture of the site it links to, taken from the live site and
kept in `public/shots/`. A picture goes stale the moment that site changes, so
when one of them gets a new look, take them again:

```bash
npm run shots
```

That drives headless Chrome and writes all three files. It needs Chrome
installed; if it is somewhere unusual, point `CHROME` at it. Nothing else is
required — no packages, and no key.

The screenshots are committed, so a build never depends on the three sites
being up.

## Running it

```bash
npm install
npm run dev
```

## Notes

There is no database, no API and nothing to sign into — it is a static page,
which is why the Content-Security-Policy in `next.config.ts` can stay as tight
as it is. Kurdish, Arabic and English; the visitor's choice is remembered on
their own device.
