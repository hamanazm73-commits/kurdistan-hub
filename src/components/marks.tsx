/**
 * The emblems, lifted from the two sites they stand for so the doorway shows
 * each project's real face. Same navy badge, same gold double ring — only the
 * motif inside changes, which is what makes them read as a family.
 */

/** The navy field and gold rings every mark shares. */
const NAVY = "#15304A";
const GOLD = "#DFB250";

function Badge({
  className,
  star = true,
  children,
}: {
  className?: string;
  /** The project marks sit under a star; the monogram fills that space itself. */
  star?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#15304A] shadow-lg ${className ?? ""}`}
    >
      <svg viewBox="0 0 100 100" className="size-[82%]" aria-hidden="true">
        <circle cx="50" cy="50" r="43" fill="none" stroke={GOLD} strokeWidth="2.4" />
        <circle cx="50" cy="50" r="37" fill="none" stroke={GOLD} strokeWidth="1" />
        {star && (
          <path
            d="M50 27 l1.9 4 4.4.6-3.2 3.1.8 4.4-3.9-2.1-3.9 2.1.8-4.4-3.2-3.1 4.4-.6Z"
            fill={GOLD}
          />
        )}
        {children}
      </svg>
    </span>
  );
}

/** Kurdistan Hotels — the citadel of Erbil. */
export function HotelsMark({ className }: { className?: string }) {
  return (
    <Badge className={className}>
      <g fill={GOLD}>
        <rect x="33" y="52" width="8" height="17" />
        <rect x="46" y="45" width="8" height="24" />
        <rect x="59" y="52" width="8" height="17" />
      </g>
      <path d="M30 69 H70" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
    </Badge>
  );
}

/** Online Office — a peaked roof over a lit window. */
export function EstateMark({ className }: { className?: string }) {
  return (
    <Badge className={className}>
      <g stroke={GOLD} strokeWidth="5.5" strokeLinecap="round" fill="none">
        <path d="M31 62 L47 47" />
        <path d="M53 47 L69 62" />
      </g>
      <g fill={GOLD}>
        <rect x="42" y="56" width="5" height="5" rx="0.8" />
        <rect x="49.5" y="56" width="5" height="5" rx="0.8" />
        <rect x="42" y="63.5" width="5" height="5" rx="0.8" />
        <rect x="49.5" y="63.5" width="5" height="5" rx="0.8" />
      </g>
      <path
        d="M29 74 Q50 80 71 74"
        fill="none"
        stroke={GOLD}
        strokeWidth="2.4"
        strokeLinecap="round"
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
export function HubMark({ className }: { className?: string }) {
  return (
    <Badge className={className} star={false}>
      <g stroke={GOLD} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M48 38 V68" />
        <path d="M67 38 V68" />
        <path d="M48 53 H67" />
      </g>
      <path d="M48 62 V72" stroke={NAVY} strokeWidth="11" />
      <g stroke={GOLD} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M33 32 V67" />
        <path d="M33 67 H54" />
      </g>
    </Badge>
  );
}
