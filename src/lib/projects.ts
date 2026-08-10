import type { Locale } from "./i18n";

/** A string in every language the doorway speaks. */
export type L = Record<Locale, string>;

export interface Project {
  /** stable key, also the React key and the mark to draw */
  id: "hotels" | "estate";
  href: string;
  /** the bare address, shown as a small chip — it tells a visitor where the
      button is about to take them before they press it */
  domain: string;
  name: L;
  tagline: L;
  /** what a visitor can do there, three at most — this is a doorway, not a
      brochure, and a fourth line makes the card scroll on a phone */
  points: L[];
  /** What the cover drawing shows, per language. The drawing itself lives in
      `covers.tsx` — it is artwork, not data — but it still needs describing
      for anyone who cannot see it. */
  imageAlt: L;
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
    imageAlt: {
      ku: "قەڵای هەولێر و هۆتێلێکی ڕووناک لە بەردەمی",
      ar: "قلعة أربيل وفندق مضاء أمامها",
      en: "The Erbil citadel with a lit hotel before it",
    },
    name: {
      ku: "هۆتێلەکانی لای حەمە",
      ar: "عند حمة للفنادق",
      en: "Lay Hama Hotels",
    },
    tagline: {
      ku: "هۆتێل بدۆزەرەوە و ڕاستەوخۆ حیجز بکە",
      ar: "ابحث عن فندق واحجز مباشرة",
      en: "Find a hotel and book directly",
    },
    points: [
      {
        ku: "هۆتێل لە هەولێر، سلێمانی، دهۆک، دووکان و کەرکووک",
        ar: "فنادق في أربيل والسليمانية ودهوك ودوكان وكركوك",
        en: "Hotels in Erbil, Sulaymaniyah, Duhok, Dukan and Kirkuk",
      },
      {
        ku: "نرخی ڕوون — پارە ڕاستەوخۆ بۆ هۆتێل",
        ar: "أسعار واضحة — الدفع مباشرة للفندق",
        en: "Clear prices — you pay the hotel directly",
      },
      {
        ku: "حیجز بە چەند کلیکێک، بە واتساپ پەیوەندی بکە",
        ar: "احجز بنقرات، وتواصل عبر واتساب",
        en: "Book in a few taps, reach them on WhatsApp",
      },
    ],
  },
  {
    id: "estate",
    href: "https://homes.layhama.com",
    domain: "homes.layhama.com",
    imageAlt: {
      ku: "گەڕەکێکی خانوو لە زەردەپەڕدا، چراکان داگیرساون",
      ar: "حي من المنازل عند الغروب، والأضواء مضاءة",
      en: "A street of houses at dusk with the lights on",
    },
    name: {
      ku: "نووسینگەی لای حەمە",
      ar: "عند حمة للعقارات",
      en: "Lay Hama Homes",
    },
    tagline: {
      ku: "خانوو، شوقە و زەوی بۆ فرۆشتن و کرێ",
      ar: "منازل وشقق وأراضٍ للبيع والإيجار",
      en: "Houses, flats and land, to buy or rent",
    },
    points: [
      {
        ku: "بەپێی شار و گەڕەک بگەڕێ",
        ar: "ابحث حسب المدينة والحي",
        en: "Search by city and district",
      },
      {
        ku: "وێنە، نرخ و شوێن لەسەر نەخشە",
        ar: "صور وأسعار وموقع على الخريطة",
        en: "Photos, prices and the spot on the map",
      },
      {
        ku: "ڕاستەوخۆ پەیوەندی بە خاوەنەکەیەوە بکە",
        ar: "تواصل مباشرة مع المالك",
        en: "Reach the owner directly",
      },
    ],
  },
];
