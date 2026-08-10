import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";
import { urlFor, languageAlternates } from "@/lib/seo";

/**
 * One entry per language, each declaring the other two.
 *
 * The doorway is a single page, so the whole sitemap is those three URLs.
 * `alternates.languages` is what stops a crawler reading them as three
 * near-copies and keeping only one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates("/");
  return LOCALES.map((l) => ({
    url: urlFor(l.id, "/"),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages },
  }));
}
