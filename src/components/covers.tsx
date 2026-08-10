/**
 * A cover drawn for each project rather than photographed for none of them.
 *
 * Stock photography was the wrong answer here: a resort pool and a Californian
 * villa belong to no one, and least of all to a business in Kurdistan. These
 * are built from the same two colours as the emblems, so a card reads as part
 * of the brand instead of a picture borrowed from outside it.
 *
 * Being SVG they also cost nothing — no external host, no request leaving the
 * page, nothing to break when a photo is taken down, and sharp on any screen.
 */

const GOLD = "#DFB250";
const GOLD_SOFT = "#F0CD8A";

/** Windows lit from inside. Deterministic, so the drawing never flickers
 *  between renders — a random pattern would change on every navigation. */
function Windows({
  x,
  y,
  cols,
  rows,
  gap = 9,
  size = 4,
  lit,
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  gap?: number;
  size?: number;
  /** which cells are dark, as `col,row` — an entirely lit block looks fake */
  lit?: (c: number, r: number) => boolean;
}) {
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = lit ? lit(c, r) : true;
      out.push(
        <rect
          key={`${c}-${r}`}
          x={x + c * gap}
          y={y + r * gap}
          width={size}
          height={size}
          rx={0.8}
          fill={GOLD}
          opacity={on ? 0.9 : 0.16}
        />,
      );
    }
  }
  return <g>{out}</g>;
}

/** Sky, stars and the mountains every one of these sits in front of. */
function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1a2b" />
          <stop offset="55%" stopColor="#102a44" />
          <stop offset="100%" stopColor="#1a3a5c" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="88%" r="55%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.30" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="260" fill={`url(#${id}-sky)`} />

      {/* stars, thinning out towards the horizon */}
      <g fill="#fff">
        {[
          [38, 30, 1.1, 0.5], [92, 20, 0.8, 0.35], [148, 40, 1, 0.45],
          [206, 24, 0.9, 0.4], [262, 44, 1.2, 0.5], [318, 28, 0.8, 0.35],
          [360, 52, 1, 0.4], [70, 62, 0.7, 0.25], [232, 68, 0.7, 0.22],
          [286, 14, 0.7, 0.3], [122, 76, 0.6, 0.18],
        ].map(([cx, cy, r, o], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} opacity={o} />
        ))}
      </g>

      {/* the light sitting on the horizon */}
      <rect width="400" height="260" fill={`url(#${id}-glow)`} />

      {/* far mountains */}
      <path
        d="M0 150 L52 108 L88 132 L134 92 L182 134 L228 104 L276 138 L322 100 L368 136 L400 116 L400 260 L0 260 Z"
        fill="#0c2237"
        opacity="0.85"
      />
      {/* near mountains */}
      <path
        d="M0 176 L46 146 L96 172 L150 138 L204 174 L250 152 L306 180 L352 150 L400 172 L400 260 L0 260 Z"
        fill="#0a1b2c"
      />
    </>
  );
}

/**
 * Lay Hama Hotels — the citadel of Erbil on its mound, with a lit hotel
 * standing in front of it. The citadel is the one silhouette in the city
 * everybody recognises, and it is what the mark already draws.
 */
export function HotelsCover({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <Backdrop id="hc" />

      {/* the citadel mound and its wall of arches */}
      <g>
        <path d="M60 216 Q140 182 220 216 L220 220 L60 220 Z" fill="#0e2438" />
        <rect x="86" y="176" width="108" height="34" fill="#12293f" />
        <g fill="#0a1b2c">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${94 + i * 17} 210 L${94 + i * 17} 192 a5 5 0 0 1 10 0 L${104 + i * 17} 210 Z`}
            />
          ))}
        </g>
        <g fill={GOLD} opacity="0.75">
          {[0, 2, 4].map((i) => (
            <rect key={i} x={97 + i * 17} y={196} width="4" height="6" rx="1" />
          ))}
        </g>
        {/* the towers at each end */}
        <rect x="80" y="166" width="16" height="44" fill="#12293f" />
        <rect x="184" y="166" width="16" height="44" fill="#12293f" />
        <path d="M80 166 L88 156 L96 166 Z" fill={GOLD} opacity="0.5" />
        <path d="M184 166 L192 156 L200 166 Z" fill={GOLD} opacity="0.5" />
      </g>

      {/* the hotel, lit, standing nearer than the citadel */}
      <g>
        <rect x="238" y="120" width="86" height="118" rx="3" fill="#16334f" />
        <rect x="238" y="120" width="86" height="7" rx="3" fill={GOLD} opacity="0.55" />
        <Windows
          x={248}
          y={136}
          cols={8}
          rows={9}
          gap={9.6}
          size={5}
          lit={(c, r) => (c * 3 + r * 5) % 7 !== 0}
        />
        {/* the canopy over the door */}
        <rect x="266" y="222" width="30" height="16" fill="#0e2438" />
        <rect x="262" y="218" width="38" height="5" rx="2" fill={GOLD} opacity="0.8" />
        <rect x="277" y="226" width="8" height="12" rx="1" fill={GOLD} opacity="0.85" />
      </g>

      {/* a lower wing, so the block does not read as one slab */}
      <g>
        <rect x="326" y="168" width="52" height="70" rx="3" fill="#122c46" />
        <Windows
          x={334}
          y={180}
          cols={4}
          rows={5}
          gap={10}
          size={4.5}
          lit={(c, r) => (c + r * 2) % 5 !== 0}
        />
      </g>

      {/* ground */}
      <rect x="0" y="238" width="400" height="22" fill="#081726" />
      <rect x="0" y="238" width="400" height="1.5" fill={GOLD} opacity="0.35" />
    </svg>
  );
}

/**
 * Lay Hama Homes — a street of houses at dusk, lights on. Roofs at different
 * heights and depths so it reads as a neighbourhood somebody lives in rather
 * than a row of identical boxes.
 */
export function HomesCover({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <Backdrop id="mc" />

      {/* the row behind, darker and smaller — depth without detail */}
      <g fill="#0d2033" opacity="0.9">
        <path d="M18 200 L44 178 L70 200 L70 226 L18 226 Z" />
        <path d="M300 202 L326 180 L352 202 L352 226 L300 226 Z" />
        <path d="M352 206 L372 190 L392 206 L392 226 L352 226 Z" />
      </g>
      <g fill={GOLD} opacity="0.4">
        <rect x="38" y="192" width="5" height="5" rx="1" />
        <rect x="46" y="192" width="5" height="5" rx="1" />
        <rect x="320" y="194" width="5" height="5" rx="1" />
      </g>

      {/* the tall house on the left */}
      <g>
        <path d="M78 176 L112 148 L146 176 Z" fill="#16334f" />
        <path d="M78 176 L112 148 L146 176" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.6" />
        <rect x="86" y="176" width="52" height="62" fill="#14304a" />
        <Windows x={94} y={186} cols={2} rows={2} gap={16} size={8} />
        <rect x="106" y="216" width="14" height="22" rx="1.5" fill={GOLD} opacity="0.85" />
      </g>

      {/* the house in the middle, nearest and largest */}
      <g>
        <path d="M150 158 L200 116 L250 158 Z" fill="#1a3a5c" />
        <path d="M150 158 L200 116 L250 158" fill="none" stroke={GOLD_SOFT} strokeWidth="2.4" opacity="0.75" />
        <rect x="160" y="158" width="80" height="80" fill="#16334f" />
        <Windows x={172} y={170} cols={2} rows={2} gap={22} size={11} />
        {/* the door, lit from within */}
        <path d="M188 238 L188 208 a12 12 0 0 1 24 0 L212 238 Z" fill={GOLD} opacity="0.9" />
        <circle cx="206" cy="224" r="1.6" fill="#0a1b2c" />
        {/* the chimney */}
        <rect x="228" y="128" width="9" height="20" fill="#1a3a5c" />
      </g>

      {/* the wide house on the right */}
      <g>
        <path d="M252 180 L286 154 L320 180 Z" fill="#16334f" />
        <path d="M252 180 L286 154 L320 180" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.55" />
        <rect x="260" y="180" width="52" height="58" fill="#14304a" />
        <Windows x={268} y={190} cols={2} rows={2} gap={16} size={8} />
        <rect x="280" y="220" width="13" height="18" rx="1.5" fill={GOLD} opacity="0.8" />
      </g>

      {/* ground, and the path up to the middle door */}
      <rect x="0" y="238" width="400" height="22" fill="#081726" />
      <path d="M186 260 L214 260 L206 238 L194 238 Z" fill={GOLD} opacity="0.13" />
      <rect x="0" y="238" width="400" height="1.5" fill={GOLD} opacity="0.35" />
    </svg>
  );
}
