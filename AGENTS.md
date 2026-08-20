<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Build for a 375px phone first

Almost every visitor is on a phone. A layout that only works in the desktop
preview is broken for nearly everyone.

Before considering any UI change done:

- Check it at **375px wide**, not just the default preview width.
- Nothing may be wider than the viewport. If an element is cut off at the
  edge, the layout is wrong — don't leave it to horizontal scrolling.

# This site is the front door, not a site of its own

layhama.com introduces the family and sends people to the others:
hotels.layhama.com and homes.layhama.com. It has no database, no admin, and
one setting — its own address. Keep it that way; anything with a backend
belongs in one of the children.

# The name is set in Aref Ruqaa, and only the name

Ruqaa is a written script: right for a word, exhausting for a paragraph. It
is loaded as `--font-display` and used for "لای حەمە" and the mark. Body
text stays in the sans/naskh pairing the sister sites use.

Two things have broken here before and are easy to repeat:

- **Splitting the heading into animated spans.** The gold is a gradient
  clipped to the glyphs; a span that inherits `color: transparent` without
  the background paints nothing. Put the gradient classes on **each** span.
- **Two animations on one element.** The second replaces the first. Put the
  entrance animation on a wrapper.

# Arabic script joins

Per-letter animation splits words apart. Words are the smallest safe unit.
And ە (U+06D5) is missing from many Arabic-only fonts — check it renders
before adopting a face.

# Two people work on this, and neither of them runs git

The owner and his partner both drive this repository through an assistant,
from different machines, and neither types a git command by hand. Nobody is
watching for conflicts, so the agent has to be.

Every session, without being asked:

- **Before the first edit**, `git pull --rebase`. The other machine may have
  pushed since you last looked, and a rebase onto their work beats resolving
  a merge later.
- **After finishing a change**, commit it and `git push`. Work left sitting
  uncommitted is invisible to the other side and will be overwritten.
- **Never end a session with uncommitted changes.** If the work is not ready
  to land, say so — do not leave it on the disk of a machine the other
  person cannot see.

Pushing is deploying. The Vercel project builds from this repository, so a
push to the default branch replaces the live site within a minute. Run the
build first — `npm run build` — and do not push what does not compile.
