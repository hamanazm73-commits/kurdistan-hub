"use client";

import { motion } from "motion/react";
import { ArrowLeft, ChevronDown, Globe, Mail } from "lucide-react";
import { useI18n, LOCALES } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { HotelsMark, EstateMark, ShopsMark, HubMark } from "./marks";

const MARKS = { hotels: HotelsMark, estate: EstateMark, shops: ShopsMark } as const;

const WHATSAPP = "9647700572004";

/** Only the doorway carries this. The two project sites keep their own
    addresses, which are the ones their existing bookings reply to. */
const EMAIL = "hayatm@layhama.com";

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
                    ? "bg-gold text-[#0f1624]"
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
            {/* No navy tile. On the cards the tile gives the mark a panel to
                stand on; over a photograph it reads as a sticker pasted on.
                Bare, the mountains show through the rings. Larger too, and
                the shadow is what keeps it off the ridgeline now that there
                is no tile to separate it. */}
            {/* Sized on Tailwind's own scale, not an arbitrary value.
                `size-[5rem]` produced no rule at all here and the mark
                collapsed to nothing — the card marks next to it use the
                scale and render, which is what gave it away. */}
            <HubMark
              bare
              className="relative size-24 drop-shadow-2xl sm:size-32"
            />
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
          {/* Ruqaa sets narrow — at 62px the whole name measured 180px across
              a 1600px screen, which reads as small however large the number
              looks. The sizes here are chosen against the rendered width, not
              the font size. */}
          <h1 className="mt-6 flex flex-wrap justify-center gap-x-[0.28em] font-[family-name:var(--font-display)] text-[4rem] leading-[1.45] sm:text-[7rem]">
            {t.brand.split(" ").map((word, i) => (
              <motion.span
                key={i}
                /* The gradient goes on the word, not on the h1.
                   `text-gold-gradient` paints by setting the text transparent
                   and clipping a background to the glyphs. A child inherits
                   the transparent colour but not the background, and the
                   `filter` this animation leaves behind gives the span its own
                   paint context, so the parent's clip can no longer reach it —
                   the word ends up transparent over transparent, and the name
                   disappears off the page. Each word carrying its own
                   background is what keeps it painted. */
                className="text-gold-gradient gold-sweep"
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
            className="mt-5 max-w-lg text-balance text-lg font-normal leading-relaxed text-white/70 sm:text-2xl"
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
          {/* The heading stands alone. The line under it counted the cards
              and told the reader to pick one, which the two cards directly
              below already say better than a sentence can. */}
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            {t.projectsTitle}
          </h2>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:mt-14 lg:grid-cols-3">
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
                {/* A browser window, not a badge.

                    The card used to show the site’s logo on a lit stage —
                    three rings, a turning wedge of light and a floating mark,
                    repeated three times down the page. It was a lot of motion
                    saying nothing: a logo cannot tell you what a site looks
                    like. A screenshot can, and the window frame around it says
                    "this is a website" before a single word is read. */}
                <div className="p-2.5 pb-0 sm:p-3 sm:pb-0">
                  {/* the chrome: three dots and the address, which is why the
                      domain no longer needs a chip of its own below */}
                  <div className="flex items-center gap-1.5 px-1 pb-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-white/15" />
                    <span aria-hidden className="size-1.5 rounded-full bg-white/15" />
                    <span aria-hidden className="size-1.5 rounded-full bg-white/15" />
                    <span
                      dir="ltr"
                      className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1"
                    >
                      <Mark bare className="size-3 shrink-0" />
                      <span className="truncate font-mono text-[0.6rem] text-white/40">
                        {p.domain}
                      </span>
                    </span>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-navy-deep">
                    {/* Held back a little. Three bright screens side by side
                        are three things shouting; muted, they sit under the
                        words and brighten when the card is touched. */}
                    <img
                      src={p.shot}
                      alt={p.name[locale]}
                      width={1280}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[8/5] w-full object-cover object-top opacity-90 saturate-[0.8] transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100"
                    />
                    {/* fades the foot of the picture into the card, so there
                        is no hard seam above the text */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-navy-deep to-transparent"
                    />
                  </div>

                  {!live && (
                    <span className="absolute end-5 top-9 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                      {t.soon}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
                  {/* The one gold thing on the card. It replaces the filled
                      button that used to sit at the bottom — the whole card is
                      already the link, so the button was a second thing to
                      press for the same result. */}
                  <span
                    aria-hidden
                    className="mb-4 block h-0.5 w-8 rounded-full bg-gold transition-all duration-500 group-hover:w-14"
                  />

                  <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
                    {p.name[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-gold/90">
                    {p.tagline[locale]}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                    {p.blurb[locale]}
                  </p>

                  {live && (
                    <span className="mt-6 flex items-center justify-end border-t border-white/10 pt-4 text-sm font-bold text-gold">
                      <span className="inline-flex items-center gap-2 transition-all group-hover:gap-3.5">
                        {t.visit}
                        <ArrowLeft
                          className={`size-4 ${dir === "ltr" ? "rotate-180" : ""}`}
                        />
                      </span>
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
            className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(231, 186, 84,0.12),transparent_70%)]"
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

            {/* The address in full rather than behind a word. Someone who
                would rather write from their own mail app needs to be able
                to read it and copy it, and seeing it spelled out is also
                what makes the domain feel like a place with people in it. */}
            {/* Set in the brand's own face rather than font-mono. Nothing
                here declares a monospace family, so that class fell through
                to whatever the browser keeps for code — Courier on most
                Windows machines — and an address typeset in Courier reads
                like a config file, not like a way to reach someone. */}
            <a
              href={`mailto:${EMAIL}`}
              dir="ltr"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-2.5 ps-4 pe-4 text-white/75 transition-colors hover:border-gold/55 hover:bg-gold/10 hover:text-white"
            >
              <Mail className="size-4 shrink-0 text-gold" aria-hidden />
              <span className="text-[0.9rem] font-medium tracking-[0.015em]">
                {EMAIL}
              </span>
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
