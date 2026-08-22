import type { Locale } from "./i18n";

/** A string in every language the doorway speaks. */
export type L = Record<Locale, string>;

export interface Project {
  /** stable key, also the React key and the mark to draw */
  id: "hotels" | "estate" | "shops";
  href: string;
  /** the bare address, shown as a small chip — it tells a visitor where the
      button is about to take them before they press it */
  domain: string;
  name: L;
  tagline: L;
  /** a screenshot of the site itself, under /public — one per language,
      because a reader who chose Arabic was being shown a Kurdish site. A
      picture of the real page answers "what is this" faster than any sentence,
      and unlike a stock photograph it cannot be about somebody else’s hotel.
      Refreshed with `npm run shots` — see README. */
  shot: L;
  /** one sentence. There were three bullet points here; three cards times
      three points is nine lines on one screen, which nobody reads. */
  blurb: L;
  /** shown when the site isn't live yet */
  comingSoon?: boolean;
}

/**
 * Every project the doorway opens onto.
 *
 * Adding another is one entry here plus its mark in `marks.tsx` — the grid,
 * the animation order and the layout all follow from the length of this list,
 * so nothing else has to change.
 */
export const PROJECTS: Project[] = [
  {
    id: "hotels",
    href: "https://hotels.layhama.com",
    domain: "hotels.layhama.com",
    name: {
      ku: "هۆتێلەکانی لای حەمە",
      ar: "يم حمة للفنادق",
      en: "Lay Hama Hotels",
    },
    tagline: {
      ku: "هۆتێل بدۆزەرەوە و ڕاستەوخۆ حیجز بکە",
      ar: "ابحث عن فندق واحجز مباشرة",
      en: "Find a hotel and book directly",
    },
    shot: {
      ku: "/shots/hotels.ku.jpg",
      ar: "/shots/hotels.ar.jpg",
      en: "/shots/hotels.en.jpg",
    },
    blurb: {
      ku: "هۆتێل لە هەولێر، سلێمانی، دهۆک، دووکان و کەرکووک. نرخی ڕوون، پارە ڕاستەوخۆ بۆ هۆتێل، و حیجز بە چەند کلیکێک.",
      ar: "فنادق في أربيل والسليمانية ودهوك ودوكان وكركوك. أسعار واضحة، والدفع مباشرة للفندق، والحجز بنقرات.",
      en: "Hotels in Erbil, Sulaymaniyah, Duhok, Dukan and Kirkuk. Clear prices, you pay the hotel directly, and you book in a few taps.",
    },
  },
  {
    id: "estate",
    href: "https://homes.layhama.com",
    domain: "homes.layhama.com",
    name: {
      ku: "نووسینگەی لای حەمە",
      ar: "يم حمة للعقارات",
      en: "Lay Hama Homes",
    },
    tagline: {
      ku: "خانوو، شوقە و زەوی بۆ فرۆشتن و کرێ",
      ar: "منازل وشقق وأراضٍ للبيع والإيجار",
      en: "Houses, flats and land, to buy or rent",
    },
    shot: {
      ku: "/shots/homes.ku.jpg",
      ar: "/shots/homes.ar.jpg",
      en: "/shots/homes.en.jpg",
    },
    blurb: {
      ku: "خانوو، شوقە و زەوی بۆ فرۆشتن و کرێ — بەپێی شار و گەڕەک، بە وێنە و نرخ و شوێن لەسەر نەخشە.",
      ar: "منازل وشقق وأراضٍ للبيع والإيجار — حسب المدينة والحي، مع الصور والأسعار والموقع على الخريطة.",
      en: "Houses, flats and land to buy or rent — by city and district, with photos, prices and the spot on the map.",
    },
  },
  {
    id: "shops",
    href: "https://bedozawa.layhama.com",
    domain: "bedozawa.layhama.com",
    name: {
      ku: "لای حەمە بیدۆزەوە",
      ar: "يم حمة تلاقيها",
      en: "Find It at Lay Hama",
    },
    tagline: {
      ku: "نووسین لە تۆ، گەڕان و دۆزینەوە لە ئێمە",
      ar: "اكتب ما تريد، ونحن نجد المحل",
      en: "Name the thing, we find the shop",
    },
    shot: {
      ku: "/shots/shops.ku.jpg",
      ar: "/shots/shops.ar.jpg",
      en: "/shots/shops.en.jpg",
    },
    blurb: {
      ku: "بنووسە چیت دەوێت، نەک ناوی دووکان — و دووکانەکەی شارەکەی خۆت بە ژمارە و ناونیشانەوە بدۆزەرەوە.",
      ar: "اكتب ما تريد، لا اسم المحل — ونجد لك محل مدينتك بالهاتف والعنوان.",
      en: "Name the thing, not the shop — and find it in your own city, with the number and the address.",
    },
  },
];
