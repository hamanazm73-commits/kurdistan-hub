import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Hub } from "@/components/hub";
import { alternatesFor, organizationJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/locales";

/** Only these two are prefixed — Kurdish is served from the root. */
const SUPPORTED = ["ar", "en"] as const;

export function generateStaticParams() {
  return SUPPORTED.map((lang) => ({ lang }));
}

/**
 * The doorway in Arabic and English.
 *
 * Same component as the Kurdish page — the language comes from the URL, which
 * the provider reads during render, so the server sends Arabic HTML for an
 * Arabic URL. Before this existed all three languages lived on one address
 * and only the Kurdish one could be indexed.
 */
const COPY: Record<
  "ar" | "en",
  { title: string; description: string; ogLocale: string }
> = {
  ar: {
    // The name is the Iraqi one now; the nouns stay standard, because فنادق
    // and عقارات are what gets typed into Google either way.
    title: "يم حمة — فنادق وعقارات في كردستان",
    description:
      "يم حمة للفنادق ويم حمة للعقارات — كل خدماتنا بمكان واحد. احجز فندق، أو دوّر على بيت أو شقة أو أرض بأربيل والسليمانية ودهوك وكركوك.",
    ogLocale: "ar_IQ",
  },
  en: {
    title: "Lay Hama — Hotels and homes across Kurdistan",
    description:
      "Lay Hama Hotels and Lay Hama Homes — everything we build, in one place. Book a hotel, or find a house, flat or plot of land across Erbil, Sulaymaniyah, Duhok and Kirkuk.",
    ogLocale: "en_US",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const copy = COPY[lang as "ar" | "en"] ?? COPY.en;
  return {
    title: copy.title,
    description: copy.description,
    alternates: alternatesFor(lang as Locale, "/"),
    openGraph: {
      type: "website",
      title: copy.title,
      description: copy.description,
      url: alternatesFor(lang as Locale, "/").canonical,
      locale: copy.ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function LocalisedHub({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(SUPPORTED as readonly string[]).includes(lang)) notFound();
  const copy = COPY[lang as "ar" | "en"];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <>
      {/* <html lang> is written by the root layout, which cannot see this
          segment. Correcting it before paint rather than in an effect keeps
          the served HTML honest about the language it is in. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(
            lang,
          )};document.documentElement.dir=${JSON.stringify(dir)};`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organizationJsonLd(copy.title.split(" — ")[0], copy.description),
          ),
        }}
      />
      <Hub />
    </>
  );
}
