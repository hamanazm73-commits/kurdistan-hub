import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * There was no robots.txt at all, so this file is the first thing telling a
 * crawler where the sitemap is. Nothing here is private — the whole site is
 * one public page in three languages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
