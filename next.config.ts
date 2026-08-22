import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * This site is a doorway: it holds no data, takes no input and talks to no
 * back end, so the policy can stay as tight as it looks. 'unsafe-eval' is
 * only permitted in dev, where Turbopack needs it.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      /*
       * One name for the front door.
       *
       * www.layhama.com was answering 200 with a byte-identical copy of the
       * site — 45,076 bytes either way — so the two names competed as
       * duplicates of each other. The canonical tag already pointed at the
       * apex, which tells Google which one counts, but it is advice rather
       * than an answer: the duplicate still gets crawled, still gets linked
       * to, and anyone who lands on it stays there.
       *
       * The homes site already does exactly this for its old name. This is
       * the same rule for the one domain that had not been given it.
       */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.layhama\\.com" }],
        destination: "https://layhama.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
