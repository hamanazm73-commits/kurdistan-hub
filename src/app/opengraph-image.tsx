import { ImageResponse } from "next/og";

export const alt = "Lay Hama — Hotels and homes across Kurdistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card a shared link unfolds into. Latin text only: Satori has no Arabic
 * glyphs without a bundled font, and shipping one for a single line is not
 * worth the weight — the emblem carries the brand, and the name exists in
 * Latin anyway.
 */
export default function OgImage() {
  const GOLD = "#DFB250";
  const STAR =
    "M50 20 l2.3 4.8 5.3.8-3.8 3.7 1 5.3-4.8-2.5-4.8 2.5 1-5.3-3.8-3.7 5.3-.8Z";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          background:
            "linear-gradient(150deg, #06121f 0%, #0a1a2b 55%, #14304a 100%)",
        }}
      >
        {/* the monogram, drawn rather than imported */}
        <svg width="150" height="150" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="43" fill="none" stroke={GOLD} strokeWidth="2.4" />
          <circle cx="50" cy="50" r="37" fill="none" stroke={GOLD} strokeWidth="1" />
          <mask id="gap">
            <rect width="100" height="100" fill="white" />
            <path d="M48 62 V72" stroke="black" strokeWidth="11" />
          </mask>
          <g stroke={GOLD} strokeWidth="5" strokeLinecap="round" fill="none" mask="url(#gap)">
            <path d="M48 38 V68" />
            <path d="M67 38 V68" />
            <path d="M48 53 H67" />
          </g>
          <g stroke={GOLD} strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M33 32 V67" />
            <path d="M33 67 H54" />
          </g>
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginTop: 34,
            color: GOLD,
          }}
        >
          Lay Hama
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 10,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Hotels and homes across Kurdistan
        </div>

        {/* the two doors this one opens onto */}
        <div style={{ display: "flex", gap: 18, marginTop: 40 }}>
          {["hotels.layhama.com", "homes.layhama.com"].map((d) => (
            <div
              key={d}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 22,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(223,178,80,0.35)",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 100 100">
                <path d={STAR} fill={GOLD} />
              </svg>
              {d}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
