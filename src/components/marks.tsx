/**
 * The emblems, lifted from the two sites they stand for so the doorway shows
 * each project's real face. Same navy badge, same gold double ring, same star
 * — only the motif inside changes, which is what makes them read as a family.
 */

function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#15304A] shadow-lg ${className ?? ""}`}
    >
      <svg viewBox="0 0 100 100" className="size-[82%]" aria-hidden="true">
        <circle cx="50" cy="50" r="43" fill="none" stroke="#DFB250" strokeWidth="2.4" />
        <circle cx="50" cy="50" r="37" fill="none" stroke="#DFB250" strokeWidth="1" />
        {/* the star both marks carry */}
        <path
          d="M50 27 l1.9 4 4.4.6-3.2 3.1.8 4.4-3.9-2.1-3.9 2.1.8-4.4-3.2-3.1 4.4-.6Z"
          fill="#DFB250"
        />
        {children}
      </svg>
    </span>
  );
}

/** Kurdistan Hotels — the citadel of Erbil. */
export function HotelsMark({ className }: { className?: string }) {
  return (
    <Badge className={className}>
      <g fill="#DFB250">
        <rect x="33" y="52" width="8" height="17" />
        <rect x="46" y="45" width="8" height="24" />
        <rect x="59" y="52" width="8" height="17" />
      </g>
      <path d="M30 69 H70" stroke="#DFB250" strokeWidth="2.2" strokeLinecap="round" />
    </Badge>
  );
}

/** Online Office — a peaked roof over a lit window. */
export function EstateMark({ className }: { className?: string }) {
  return (
    <Badge className={className}>
      <g stroke="#DFB250" strokeWidth="5.5" strokeLinecap="round" fill="none">
        <path d="M31 62 L47 47" />
        <path d="M53 47 L69 62" />
      </g>
      <g fill="#DFB250">
        <rect x="42" y="56" width="5" height="5" rx="0.8" />
        <rect x="49.5" y="56" width="5" height="5" rx="0.8" />
        <rect x="42" y="63.5" width="5" height="5" rx="0.8" />
        <rect x="49.5" y="63.5" width="5" height="5" rx="0.8" />
      </g>
      <path
        d="M29 74 Q50 80 71 74"
        fill="none"
        stroke="#DFB250"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </Badge>
  );
}

/** The doorway's own mark: the star alone, for the parent brand. */
export function HubMark({ className }: { className?: string }) {
  return (
    <Badge className={className}>
      <circle cx="50" cy="57" r="12" fill="none" stroke="#DFB250" strokeWidth="2.6" />
      <path d="M38 57 H62" stroke="#DFB250" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 45 V69" stroke="#DFB250" strokeWidth="2.2" strokeLinecap="round" />
    </Badge>
  );
}
