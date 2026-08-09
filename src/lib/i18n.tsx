"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ku" | "ar" | "en";

export const LOCALES: { id: Locale; native: string; dir: "rtl" | "ltr" }[] = [
  { id: "ku", native: "کوردی", dir: "rtl" },
  { id: "ar", native: "العربية", dir: "rtl" },
  { id: "en", native: "English", dir: "ltr" },
];

const STORAGE_KEY = "hub.locale";

/** Every string the doorway says, in one shape so all three stay in step. */
interface Strings {
  brand: string;
  tagline: string;
  intro: string;
  visit: string;
  soon: string;
  contactTitle: string;
  contactBody: string;
  contactCta: string;
  rights: string;
}

const DICT: Record<Locale, Strings> = {
  ku: {
    brand: "لای حەمە",
    tagline: "هەموو خزمەتگوزارییەکانمان لە یەک شوێن",
    intro:
      "هەر پرۆژەیەک سایتی خۆی هەیە. یەکێکیان هەڵبژێرە بۆ دەستپێکردن.",
    visit: "بچۆ بۆ سایتەکە",
    soon: "بەم زووانە",
    contactTitle: "پرسیارت هەیە؟",
    contactBody: "بە واتساپ پەیوەندیمان پێوە بکە — بە کوردی وەڵامت دەدەینەوە.",
    contactCta: "پەیوەندی بە واتساپ",
    rights: "هەموو مافەکان پارێزراون",
  },
  ar: {
    brand: "عند حمة",
    tagline: "كل خدماتنا في مكان واحد",
    intro: "لكل مشروع موقعه الخاص. اختر واحداً للبدء.",
    visit: "زيارة الموقع",
    soon: "قريباً",
    contactTitle: "لديك سؤال؟",
    contactBody: "راسلنا على واتساب — نرد عليك بسرعة.",
    contactCta: "تواصل عبر واتساب",
    rights: "جميع الحقوق محفوظة",
  },
  en: {
    brand: "Lay Hama",
    tagline: "Everything we build, in one place",
    intro: "Each project has its own site. Pick one to begin.",
    visit: "Visit the site",
    soon: "Coming soon",
    contactTitle: "A question?",
    contactBody: "Message us on WhatsApp — we answer quickly.",
    contactCta: "Message on WhatsApp",
    rights: "All rights reserved",
  },
};

interface I18nValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Strings;
  setLocale: (l: Locale) => void;
}

const Ctx = createContext<I18nValue | null>(null);

const dirOf = (l: Locale) => (l === "en" ? "ltr" : "rtl");

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ku");

  // Restore after mount — the server always renders the default, so deciding
  // here is what keeps the markup identical on both sides.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && LOCALES.some((l) => l.id === saved)) setLocaleState(saved);
    } catch {
      /* storage blocked — the default is fine */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dirOf(locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, dir: dirOf(locale), t: DICT[locale], setLocale }),
    [locale, setLocale],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
