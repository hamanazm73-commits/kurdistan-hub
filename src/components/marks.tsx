/**
 * The emblems, lifted from the two sites they stand for so the doorway shows
 * each project's real face. Same navy badge, same gold double ring — only the
 * motif inside changes, which is what makes them read as a family.
 */

/** The gold every mark is drawn in. The navy tile behind it is a Tailwind
 *  class on the badge, not a fill — nothing in the artwork is navy any more,
 *  because the two shapes that used to be are cut out instead. */
const GOLD = "#e7ba54";

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
        bare ? "" : "overflow-hidden rounded-2xl bg-[#141926] shadow-lg"
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
  /*
   * The door is still a hole rather than a navy patch — painted navy it only
   * looks like a doorway while a navy tile sits behind the mark.
   *
   * It is cut with `fill-rule: evenodd` and a second subpath instead of a
   * mask: same reason as the monogram below. A `url(#…)` that a phone
   * declines to resolve takes the whole house with it, and evenodd is
   * resolved by the renderer with nothing to look up.
   */
  return (
    <Badge className={className} bare={bare}>
      <Stars />
      <path
        d="M50 36 L27 55 L33 55 L33 72 L67 72 L67 55 L73 55 Z
           M46.4 59 H53.6 A1.4 1.4 0 0 1 55 60.4 V70.6 A1.4 1.4 0 0 1 53.6 72
           H46.4 A1.4 1.4 0 0 1 45 70.6 V60.4 A1.4 1.4 0 0 1 46.4 59 Z"
        fill={GOLD}
        fillRule="evenodd"
      />
    </Badge>
  );
}

/**
 * Lay Hama itself: an L and an H woven together.
 *
 * Drawn rather than typeset, so the two letters can share a plane instead of
 * standing side by side — the L's foot crosses the H's stem, and the break in
 * that stem is what reads as one letter passing under the other.
 */
export function HubMark({ className, bare }: MarkProps) {
  /*
   * No mask, and that is the point.
   *
   * The H used to be drawn full height and have its lower left stem cut away
   * by `mask="url(#…)"`, so the L could pass in front of it. When a browser
   * fails to resolve that reference — which happened intermittently on
   * phones, and came back on a refresh — the whole masked group vanishes and
   * the logo is left as a bare L.
   *
   * The stem simply stops short instead. It ends at 59.5 so its round cap
   * finishes at 62, exactly where the mask used to cut, and the gap before
   * the L's foot is the same gap it always was. Nothing here refers to
   * anything by id, so there is nothing left to fail to resolve.
   */
  return (
    <Badge className={className} bare={bare}>
      <g stroke={GOLD} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M48 38 V59.5" />
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
