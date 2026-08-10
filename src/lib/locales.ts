/**
 * The languages the doorway speaks.
 *
 * Kept in a plain module rather than beside the provider: `i18n.tsx` is a
 * client component, and importing this list from there into a server file
 * like `sitemap.ts` hands back a client reference instead of the array — the
 * build fails on `LOCALES.map is not a function`. Both sides can read this.
 */

export type Locale = "ku" | "ar" | "en";

export const LOCALES: { id: Locale; native: string; dir: "rtl" | "ltr" }[] = [
  { id: "ku", native: "کوردی", dir: "rtl" },
  { id: "ar", native: "العربية", dir: "rtl" },
  { id: "en", native: "English", dir: "ltr" },
];

/** The two that live behind a prefix. Kurdish is served from the root. */
export const PREFIXED_LOCALES: Locale[] = ["ar", "en"];

export const dirOf = (l: Locale): "rtl" | "ltr" => (l === "en" ? "ltr" : "rtl");
