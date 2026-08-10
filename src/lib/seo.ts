import type { Locale } from "./locales";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://layhama.com";

/** The two sites this doorway opens onto. */
export const HOTELS_URL = "https://hotels.layhama.com";
export const HOMES_URL = "https://homes.layhama.com";

/** Kurdish sits at the root; the other two live behind a prefix. */
export function urlFor(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : `/${path.replace(/^\/|\/$/g, "")}`;
  return locale === "ku"
    ? `${SITE_URL}${clean || "/"}`
    : `${SITE_URL}/${locale}${clean}`;
}

/**
 * The three addresses of one page.
 *
 * `x-default` is the Kurdish page: it is where a visitor whose language we do
 * not serve should land, and it is the version the brand is named in.
 */
export function languageAlternates(path = "/") {
  return {
    ku: urlFor("ku", path),
    ar: urlFor("ar", path),
    en: urlFor("en", path),
    "x-default": urlFor("ku", path),
  };
}

export function alternatesFor(locale: Locale, path = "/") {
  return {
    canonical: urlFor(locale, path),
    languages: languageAlternates(path),
  };
}

/**
 * The business, and the fact that the other two sites are the same business.
 *
 * This is the part worth having here. On its own each domain looks like an
 * unrelated site; `subOrganization` and the matching `parentOrganization` on
 * the children are what let a search engine treat three domains as one brand,
 * so a search for the name can surface whichever of them answers it.
 */
export function organizationJsonLd(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name,
    alternateName: ["Lay Hama", "يم حمة", "عند حمة", "لای حەمە"],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kurdistan Region, Iraq",
    },
    address: { "@type": "PostalAddress", addressCountry: "IQ" },
    subOrganization: [
      {
        "@type": "Organization",
        name: "Lay Hama Hotels",
        url: HOTELS_URL,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        name: "Lay Hama Homes",
        url: HOMES_URL,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
    ],
    sameAs: [HOTELS_URL, HOMES_URL],
  };
}
