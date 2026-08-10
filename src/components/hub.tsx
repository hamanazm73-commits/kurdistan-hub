"use client";

import { motion } from "motion/react";
import { ArrowLeft, ChevronDown, Globe } from "lucide-react";
import { useI18n, LOCALES } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { HotelsMark, EstateMark, HubMark } from "./marks";

const MARKS = { hotels: HotelsMark, estate: EstateMark } as const;

const WHATSAPP = "9647700572004";

/**
 * The photograph behind the first screen. Kurdistan itself rather than either
 * business — the doorway belongs to both, so it cannot lead with a hotel room
 * or a house without quietly favouring one.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop";

/** Reveal as the section arrives, once — not every time it passes. */
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
};

export function Hub() {
  const { locale, dir, t, setLocale } = useI18n();

  return (
    <main className="relative">
      {/* ───────────────────────── the first screen ───────────────────────── */}
      <section className="relative flex min-h-dvh flex-col overflow-hidden">
        {/* the photograph, and the dark it has to sink into so text can live
            on top of it at any size */}
        <div aria-hidden className="grain absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="hero-pan size-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-navy-deep/72" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_80%_55%_at_50%_38%,transparent,rgba(6,18,31,0.92)_78%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-navy-deep" />
        </div>

        {/* the light that moves behind everything */}
        <div
          aria-hidden
          className="drift-a pointer-events-none absolute -top-40 -end-32 size-[36rem] max-w-full rounded-full bg-gold/15 blur-[110px]"
        />
        <div
          aria-hidden
          className="drift-b pointer-events-none absolute -bottom-48 -start-40 size-[32rem] max-w-full rounded-full bg-sky-500/10 blur-[120px]"
        />

        {/* language, kept out of the way until wanted */}
        <div className="relative z-10 flex justify-center px-5 pt-6">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-black/25 p-1 backdrop-blur-md">
            <Globe className="mx-2 size-4 shrink-0 text-white/40" />
            {LOCALES.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLocale(l.id)}
                className={`rounded-full px-3 py-1.5 text-[0.8rem] font-semibold transition-colors sm:px-3.5 sm:text-sm ${
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

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -18 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 190, damping: 14 }}
            className="relative"
          >
            {/* the mark sits in its own light rather than on the photograph */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[55px] sm:size-56"
            />
            <HubMark className="relative size-20 sm:size-24" />
          </motion.div>

          {/* The name, a word at a time.
              Kurdish is a joined script: splitting a word into per-letter
              spans renders every letter in its isolated form and the word
              falls apart. Words are the smallest safe unit, and the stagger
              between them is what makes this read as a name being spoken
              rather than a block of text appearing.

              Lighter and looser than it was. `font-extrabold tracking-tight`
              is drawn for Latin; on Kurdish it presses the letters together
              until the name looks cramped. Size carries the weight instead —
              500 is also a weight the Arabic face actually ships, so nothing
              is synthesised. */}
          <h1 className="text-gold-gradient gold-sweep mt-6 flex flex-wrap justify-center gap-x-[0.28em] text-[2.9rem] font-medium leading-[1.18] sm:text-7xl">
            {t.brand.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.15 + i * 0.16,
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* The rule carries the Latin name inside it rather than beneath —
              one line of furniture instead of two. In English the heading has
              already said it, so the rule closes up and stays a plain rule. */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex w-full max-w-xs items-center justify-center gap-3"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
            {locale !== "en" && (
              <span
                dir="ltr"
                className="text-[0.62rem] font-medium tracking-[0.42em] text-gold/70 sm:text-[0.7rem]"
              >
                LAY HAMA
              </span>
            )}
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.6 }}
            className="mt-5 max-w-lg text-balance text-base font-normal leading-relaxed text-white/70 sm:text-xl"
          >
            {t.tagline}
          </motion.p>
        </div>

        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-1.5 text-white/45 transition-colors hover:text-gold"
        >
          <span className="text-[0.7rem] font-medium tracking-wide">
            {t.scroll}
          </span>
          <ChevronDown className="rise size-4" />
        </motion.a>
      </section>

      {/* ─────────────────────────── the two doors ─────────────────────────── */}
      <section id="projects" className="relative px-5 pb-20 pt-4 sm:pt-10">
        <motion.div {...reveal} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            {t.projectsTitle}
          </h2>
          <p className="mx-auto mt-2.5 max-w-sm text-sm leading-relaxed text-white/45">
            {t.projectsIntro}
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:mt-14 lg:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const Mark = MARKS[p.id];
            const live = !p.comingSoon;
            return (
              <motion.a
                key={p.id}
                href={live ? p.href : undefined}
                target={live ? "_blank" : undefined}
                rel="noopener noreferrer"
                {...reveal}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={live ? { y: -6 } : undefined}
                className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] backdrop-blur transition-colors ${
                  live
                    ? "hover:border-gold/50 hover:bg-white/[0.06]"
                    : "cursor-default opacity-70"
                }`}
              >
                {/* The stage the mark stands on. The logo is the picture
                    here, so it is given the room a photograph would have had
                    and lit from behind rather than dropped onto a flat
                    panel. overflow-hidden keeps the sweep and the rings
                    inside the card's rounded corner. */}
                <div className="relative grid h-44 place-items-center overflow-hidden sm:h-52">
                  {/* the turning wedge of light */}
                  <span
                    aria-hidden
                    className="sweep pointer-events-none absolute start-1/2 top-1/2 size-[26rem] rounded-full opacity-20 blur-[2px]"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0 58%, #DFB250 76%, transparent 88% 100%)",
                    }}
                  />
                  {/* the glow it throws onto the badge */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute start-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-3xl rtl:translate-x-1/2"
                  />
                  {/* still rings, to give the moving ones something to leave */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute size-36 rounded-full border border-gold/15 sm:size-40"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute size-52 rounded-full border border-gold/[0.07] sm:size-56"
                  />
                  {/* and the ones that travel outward */}
                  <span
                    aria-hidden
                    className="ripple pointer-events-none absolute start-1/2 top-1/2 size-36 rounded-full border border-gold/30 sm:size-40"
                  />
                  <span
                    aria-hidden
                    className="ripple pointer-events-none absolute start-1/2 top-1/2 size-36 rounded-full border border-gold/30 [animation-delay:2.3s] sm:size-40"
                  />

                  <Mark
                    bare
                    className="float-mark relative size-24 sm:size-28"
                  />

                  {/* the drawing fades into the card rather than stopping on
                      a hard line above the text */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-deep to-transparent"
                  />

                  {!live && (
                    <span className="absolute end-4 top-4 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                      {t.soon}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 pt-1 sm:p-7 sm:pt-2">
                  <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
                    {p.name[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-gold/90">
                    {p.tagline[locale]}
                  </p>

                  {/* the address, so the button holds no surprises */}
                  <span
                    dir="ltr"
                    className="mt-3 w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.68rem] text-white/40"
                  >
                    {p.domain}
                  </span>

                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm text-white/55"
                      >
                        <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-gold/70" />
                        <span className="leading-relaxed">{pt[locale]}</span>
                      </li>
                    ))}
                  </ul>

                  {live && (
                    <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-[#122b45] shadow-lg shadow-black/30 transition-all group-hover:gap-3.5">
                      {t.visit}
                      <ArrowLeft
                        className={`size-4 ${dir === "ltr" ? "rotate-180" : ""}`}
                      />
                    </span>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ──────────────────── one way to reach a person ──────────────────── */}
      <section className="relative px-5 pb-14">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(223,178,80,0.12),transparent_70%)]"
          />
          <div className="relative">
            <h3 className="text-lg font-bold sm:text-xl">{t.contactTitle}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/50">
              {t.contactBody}
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition hover:bg-[#1ebe5d] active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              {t.contactCta}
            </a>
          </div>
        </motion.div>

        <p className="mt-10 text-center text-xs text-white/25">
          © {new Date().getFullYear()} {t.brand} — {t.rights}
        </p>
      </section>
    </main>
  );
}
