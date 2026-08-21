import type { Metadata } from "next";
import { Hub } from "@/components/hub";
import { alternatesFor, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const TITLE = "لای حەمە — هۆتێل، خانووبەرە و دووکان لە کوردستان";
const DESCRIPTION =
  "هۆتێلەکانی لای حەمە و نووسینگەی لای حەمە — هەموو خزمەتگوزارییەکانمان لە یەک شوێن. هۆتێل حیجز بکە، یان خانوو، شوقە و زەوی بدۆزەرەوە لە هەولێر، سلێمانی، دهۆک و کەرکووک.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("ku", "/"),
  openGraph: {
    type: "website",
    // Repeated here on purpose: a page's openGraph replaces the layout's
    // rather than merging into it, so without this line the home page was
    // the one page on the site that never said whose it was.
    siteName: "لای حەمە",
    title: TITLE,
    description: DESCRIPTION,
    url: alternatesFor("ku", "/").canonical,
    locale: "ckb_IQ",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd("لای حەمە", DESCRIPTION)),
        }}
      />
      {/* What Google prints in place of the address. Without it a result for
          this site is headed layhama.com; with it, لای حەمە. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd("لای حەمە")),
        }}
      />
      <Hub />
    </>
  );
}
