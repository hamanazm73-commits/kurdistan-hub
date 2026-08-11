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
import { usePathname, useRouter } from "next/navigation";
import { LOCALES, PREFIXED_LOCALES, dirOf, type Locale } from "./locales";

// Re-exported so callers can keep importing these from one place.
export { LOCALES, type Locale };

const STORAGE_KEY = "hub.locale";

/** Every string the doorway says, in one shape so all three stay in step. */
interface Strings {
  brand: string;
  tagline: string;
  visit: string;
  soon: string;
  /** the small line above the brand, where a masthead would sit */
  /** heading over the two doors */
  projectsTitle: string;
  /** the hint at the foot of the first screen */
  scroll: string;
  contactTitle: string;
  contactBody: string;
  contactCta: string;
  rights: string;
}

const DICT: Record<Locale, Strings> = {
  ku: {
    brand: "لای حەمە",
    tagline: "هۆتێل و خانوو لە هەموو شارەکانی کوردستان",
    visit: "بچۆ بۆ سایتەکە",
    soon: "بەم زووانە",
    projectsTitle: "پرۆژەکانمان",
    scroll: "بڕۆ خوارەوە",
    contactTitle: "پرسیارت هەیە؟",
    contactBody: "بە واتساپ پەیوەندیمان پێوە بکە — بە کوردی وەڵامت دەدەینەوە.",
    contactCta: "پەیوەندی بە واتساپ",
    rights: "هەموو مافەکان پارێزراون",
  },
  ar: {
    brand: "يم حمة",
    tagline: "فنادق وبيوت بكل مدن كردستان",
    visit: "زيارة الموقع",
    soon: "قريباً",
    projectsTitle: "مشاريعنا",
    scroll: "انزل للأسفل",
    contactTitle: "لديك سؤال؟",
    contactBody: "راسلنا على واتساب — نرد عليك بسرعة.",
    contactCta: "تواصل عبر واتساب",
    rights: "جميع الحقوق محفوظة",
  },
  en: {
    brand: "Lay Hama",
    tagline: "Hotels and homes across Kurdistan",
    visit: "Visit the site",
    soon: "Coming soon",
    projectsTitle: "Our projects",
    scroll: "Scroll down",
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


/** The language a path is written in, or null when it carries no prefix. */
export function localeFromPath(pathname: string): Locale | null {
  const first = pathname.split("/")[1];
  return (PREFIXED_LOCALES as string[]).includes(first) ? (first as Locale) : null;
}

/** The same page in another language: `/en` ⇄ `/`. */
export function pathForLocale(locale: Locale): string {
  return locale === "ku" ? "/" : `/${locale}`;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // The URL is the authority when it names a language. That is what makes the
  // English and Arabic pages render as English and Arabic on the server —
  // the only version a crawler is guaranteed to read. With no prefix we are
  // on the Kurdish page, and the saved choice applies.
  const urlLocale = localeFromPath(pathname);
  const [saved, setSaved] = useState<Locale>("ku");
  const locale = urlLocale ?? saved;

  // Restore after mount — the server always renders the default, so deciding
  // here is what keeps the markup identical on both sides.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && LOCALES.some((l) => l.id === stored)) setSaved(stored);
    } catch {
      /* storage blocked — the default is fine */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dirOf(locale);
  }, [locale]);

  // Switching language is a navigation now, not just a state change, so the
  // address bar keeps matching the words on the page — and so a visitor can
  // share or bookmark the language they chose.
  const setLocale = useCallback(
    (l: Locale) => {
      setSaved(l);
      try {
        localStorage.setItem(STORAGE_KEY, l);
      } catch {
        /* ignore */
      }
      const next = pathForLocale(l);
      if (next !== pathname) router.push(next);
    },
    [pathname, router],
  );

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
