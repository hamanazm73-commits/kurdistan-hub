import type { Metadata } from "next";
import { Hub } from "@/components/hub";
import { alternatesFor, organizationJsonLd } from "@/lib/seo";

const TITLE = "لای حەمە — هۆتێل و خانووبەرە لە کوردستان";
const DESCRIPTION =
  "هۆتێلەکانی لای حەمە و نووسینگەی لای حەمە — هەموو خزمەتگوزارییەکانمان لە یەک شوێن. هۆتێل حیجز بکە، یان خانوو، شوقە و زەوی بدۆزەرەوە لە هەولێر، سلێمانی، دهۆک و کەرکووک.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("ku", "/"),
  openGraph: {
    type: "website",
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
      <Hub />
    </>
  );
}
