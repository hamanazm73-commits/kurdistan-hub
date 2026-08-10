/**
 * The emblems, lifted from the two sites they stand for so the doorway shows
 * each project's real face. Same navy badge, same gold double ring — only the
 * motif inside changes, which is what makes them read as a family.
 */

import { useId } from "react";

/** The gold every mark is drawn in. The navy tile behind it is a Tailwind
 *  class on the badge, not a fill — nothing in the artwork is navy any more,
 *  because the two shapes that used to be are cut out instead. */
const GOLD = "#DFB250";

/** The star, drawn with its tip at (50,20) and centre near (50,27.5). */
const STAR_D =
  "M50 20 l2.3 4.8 5.3.8-3.8 3.7 1 5.3-4.8-2.5-4.8 2.5 1-5.3-3.8-3.7 5.3-.8Z";

/** Sit a copy of the star at (cx,cy), scaled by s about its own centre. */
const placeStar = (cx: number, cy: number, s: number) =>
  `translate(${cx} ${cy}) scale(${s}) translate(-50 -27.5)`;

/** The three stars both project marks wear: one leading, two smaller flanking. */
function Stars() {
  return (
    <g fill={GOLD}>
      <path d={STAR_D} transform={placeStar(50, 23, 1)} />
      <path d={STAR_D} transform={placeStar(34.5, 30, 0.62)} />
      <path d={STAR_D} transform={placeStar(65.5, 30, 0.62)} />
    </g>
  );
}

/**
 * The navy field and gold double ring. Each mark supplies its own stars —
 * the two projects wear three, the monogram wears none.
 *
 * `bare` drops the navy tile and lets the ring stand on whatever is behind
 * it. On a navy page the tile reads as a square panel floating over the
 * background; with nothing behind it, the emblem is just the emblem. The mark
 * also fills the frame in that case — the 82% inset exists to keep the ring
 * off the tile's rounded corners, and with no tile there is nothing to clear.
 */
function Badge({
  className,
  bare = false,
  children,
}: {
  className?: string;
  bare?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${
        bare ? "" : "overflow-hidden rounded-2xl bg-[#15304A] shadow-lg"
      } ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 100 100"
        className={bare ? "size-full" : "size-[82%]"}
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="43" fill="none" stroke={GOLD} strokeWidth="2.4" />
        <circle cx="50" cy="50" r="37" fill="none" stroke={GOLD} strokeWidth="1" />
        {children}
      </svg>
    </span>
  );
}

/** Props every mark takes. */
type MarkProps = { className?: string; bare?: boolean };

/**
 * Lay Hama Hotels — the citadel of Erbil, middle tower carrying the mark,
 * under the same three stars its sister wears. The stars sit wide of the
 * middle so the taller centre tower runs up into the gap between them.
 */
export function HotelsMark({ className, bare }: MarkProps) {
  return (
    <Badge className={className} bare={bare}>
      <Stars />
      <g fill={GOLD}>
        <rect x="33" y="52" width="8" height="17" />
        <rect x="44.5" y="37" width="11" height="32" />
        <rect x="59" y="52" width="8" height="17" />
      </g>
      <path d="M30 69 H70" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
    </Badge>
  );
}

/**
 * Lay Hama Homes — a filled house with its door punched out, under the same
 * three stars. Filled rather than outlined: at small sizes thin gold strokes
 * close up into a smudge, while a solid silhouette keeps its shape.
 */
export function EstateMark({ className, bare }: MarkProps) {
  // The door is cut out of the house rather than painted over it. Painting it
  // navy only looks like a doorway while a navy tile sits behind the mark;
  // knocked out, it is a hole on any background.
  const id = useId();
  return (
    <Badge className={className} bare={bare}>
      <Stars />
      <mask id={`${id}-door`}>
        <rect width="100" height="100" fill="white" />
        <rect x="45" y="59" width="10" height="13" rx="1.4" fill="black" />
      </mask>
      <path
        d="M50 36 L27 55 L33 55 L33 72 L67 72 L67 55 L73 55 Z"
        fill={GOLD}
        mask={`url(#${id}-door)`}
      />
    </Badge>
  );
}

/**
 * Lay Hama itself: an L and an H woven together.
 *
 * Drawn rather than typeset, so the two letters can share a plane instead of
 * standing side by side — the L's foot crosses over the H's stem, and the
 * short navy stroke is the gap that reads as one passing under the other.
 * Order matters: the H, then the gap, then the L on top.
 */
export function HubMark({ className, bare }: MarkProps) {
  // The gap where the L crosses the H is cut out of the H, not painted over
  // it — same reason as the door above.
  const id = useId();
  return (
    <Badge className={className} bare={bare}>
      <mask id={`${id}-gap`}>
        <rect width="100" height="100" fill="white" />
        <path d="M48 62 V72" stroke="black" strokeWidth="11" />
      </mask>
      <g
        stroke={GOLD}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        mask={`url(#${id}-gap)`}
      >
        <path d="M48 38 V68" />
        <path d="M67 38 V68" />
        <path d="M48 53 H67" />
      </g>
      <g stroke={GOLD} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M33 32 V67" />
        <path d="M33 67 H54" />
      </g>
    </Badge>
  );
}
