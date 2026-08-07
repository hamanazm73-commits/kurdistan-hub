"use client";

import { motion } from "motion/react";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { useI18n, LOCALES } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { HotelsMark, EstateMark, HubMark } from "./marks";

const MARKS = { hotels: HotelsMark, estate: EstateMark } as const;

const WHATSAPP = "9647700572004";

export function Hub() {
  const { locale, dir, t, setLocale } = useI18n();

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* the light behind everything */}
      <div
        aria-hidden
        className="drift-a pointer-events-none absolute -top-40 -end-32 size-[36rem] max-w-full rounded-full bg-gold/20 blur-[110px]"
      />
      <div
        aria-hidden
        className="drift-b pointer-events-none absolute -bottom-48 -start-40 size-[32rem] max-w-full rounded-full bg-sky-500/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(223,178,80,0.12),transparent_65%)]"
      />

      {/* language, kept out of the way until wanted */}
      <div className="relative flex justify-center pt-6">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
          <Globe className="mx-2 size-4 text-white/40" />
          {LOCALES.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLocale(l.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                locale === l.id
                  ? "bg-gold text-[#122b45]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-10 sm:pt-14">
        {/* the parent brand */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -18 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 190, damping: 14 }}
            className="mx-auto w-fit"
          >
            <HubMark className="size-16 sm:size-20" />
          </motion.div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t.brand}
          </h1>

          {/* the gold rule both sites carry under their masthead */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="mx-auto mt-4 h-0.5 w-28 origin-center rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
          />

          <p className="mt-4 text-lg font-semibold text-gold sm:text-xl">
            {t.tagline}
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/50">
            {t.intro}
          </p>
        </motion.div>

        {/* the doors */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const Mark = MARKS[p.id];
            return (
              <motion.a
                key={p.id}
                href={p.comingSoon ? undefined : p.href}
                target={p.comingSoon ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.14, duration: 0.55 }}
                whileHover={p.comingSoon ? undefined : { y: -6 }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition-colors sm:p-7 ${
                  p.comingSoon
                    ? "cursor-default opacity-70"
                    : "hover:border-gold/60 hover:bg-white/[0.08]"
                }`}
              >
                {/* the sweep of light on hover */}
                {!p.comingSoon && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -inset-x-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  >
                    <span className="sheen block size-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </span>
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <Mark className="size-14 sm:size-16" />
                  {p.comingSoon && (
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
                      {t.soon}
                    </span>
                  )}
                </div>

                <h2 className="relative mt-5 text-xl font-extrabold sm:text-2xl">
                  {p.name[locale]}
                </h2>
                <p className="relative mt-1.5 text-sm font-medium text-gold/90">
                  {p.tagline[locale]}
                </p>

                <ul className="relative mt-4 space-y-2">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold/70" />
                      <span className="leading-relaxed">{pt[locale]}</span>
                    </li>
                  ))}
                </ul>

                {!p.comingSoon && (
                  <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-[#122b45] shadow-lg shadow-black/30 transition group-hover:gap-3">
                    {t.visit}
                    <ArrowLeft
                      className={`size-4 ${dir === "ltr" ? "rotate-180" : ""}`}
                    />
                  </span>
                )}
              </motion.a>
            );
          })}
        </div>

        {/* one way to reach a person */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur sm:p-8"
        >
          <h3 className="text-lg font-bold">{t.contactTitle}</h3>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-white/50">
            {t.contactBody}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition hover:bg-[#1ebe5d] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            {t.contactCta}
          </a>
        </motion.div>

        <p className="mt-10 text-center text-xs text-white/30">
          © {new Date().getFullYear()} {t.brand} — {t.rights}
        </p>
      </div>
    </main>
  );
}
