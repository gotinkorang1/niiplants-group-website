"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { DarkSurfaceDecor } from "@/components/site/dark-surface";

const sectors = [
  "Transportation",
  "Hospitality",
  "Logistics",
  "Travel",
  "Automotive",
  "Food",
  "Leasing",
  "Office Supplies",
];

/**
 * Entrance stagger. Markup is identical on server and client —
 * `MotionConfig reducedMotion="user"` disables transform animation for
 * reduced-motion users without branching the render (hydration-safe), and
 * `suppressHydrationWarning` covers framer-motion applying initial styles
 * post-mount (see components/site/reveal.tsx).
 */
const stagger = (index: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.2, 0.8, 0.2, 1] as const,
    delay: 0.15 + index * 0.12,
  },
});

/** Gentle perpetual float for the photo cards (disabled for reduced motion via MotionConfig). */
const float = (distance: number, duration: number, delay: number) => ({
  y: [0, -distance, 0],
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
});

const slides = [
  {
    src: "/trivoxo/event-biking.webp",
    alt: "Trivoxo group biking tour on a ridge overlooking the valley",
    tagline: ["Journeys that", "inspire."],
    caption: "Adventure tours · Trivoxo, part of Niiplants Group",
  },
  {
    src: "/awards/ceo-receiving-award.jpg",
    alt: "Receiving an award on stage at the National Tourism Awards",
    tagline: ["Excellence,", "recognised."],
    caption: "Recognised at the National Tourism Awards",
  },
  {
    src: "/trivoxo/event-hiking.webp",
    alt: "Trivoxo hiking event — group celebrating on a hillside trail",
    tagline: ["One group.", "Many journeys."],
    caption: "Group experiences across Ghana",
  },
];

const SLIDE_INTERVAL_MS = 5000;

/**
 * Crossfading slideshow with a slow Ken Burns drift, dot controls, and
 * pause-on-hover. Auto-advance is skipped for reduced-motion users.
 */
function HeroSlideshow({ aspect }: { aspect: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, paused]);

  const slide = slides[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative"
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.07 }}
              transition={{ duration: SLIDE_INTERVAL_MS / 1000 + 1.5, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Animated tagline — midway over the image, lines rise in from a mask. */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center bg-gradient-to-r from-ink-900/45 via-ink-900/10 to-transparent px-6"
          aria-hidden="true"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`tagline-${slide.src}`}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="font-display text-h2 leading-tight text-paper-0 [text-shadow:0_2px_16px_rgba(11,18,32,0.55)]"
            >
              {slide.tagline.map((line, lineIndex) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.2, 0.8, 0.2, 1],
                      delay: 0.35 + lineIndex * 0.14,
                    }}
                    className={`block ${lineIndex === slide.tagline.length - 1 ? "text-gradient-gold [text-shadow:none]" : ""}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink-900/85 to-transparent px-5 pb-10 pt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={slide.caption}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-paper-0/90"
            >
              {slide.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dot controls */}
        <div className="absolute bottom-3.5 left-5 z-20 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show slide ${i + 1} of ${slides.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-accent-500" : "w-2.5 bg-paper-0/40 hover:bg-paper-0/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle scroll parallax — cards drift at different rates as you scroll away.
  const slow = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-noise relative flex min-h-[92svh] items-center overflow-hidden bg-gradient-to-br from-ink-900 via-[#101b30] to-ink-700 text-paper-0">
        <DarkSurfaceDecor />

        <Container className="relative z-10 w-full pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Copy column */}
            <div className="lg:col-span-7">
              <motion.p
                {...stagger(0)}
                suppressHydrationWarning
                className="text-label uppercase tracking-wide text-paper-0/70 mb-5 flex items-center gap-3"
              >
                <span className="inline-block h-px w-10 bg-accent-500" aria-hidden="true" />
                Niiplants Group · Ghana
              </motion.p>

              <motion.h1
                {...stagger(1)}
                suppressHydrationWarning
                className="text-display font-display max-w-3xl text-balance"
              >
                Building businesses that{" "}
                <span className="text-gradient-gold">move Africa forward.</span>
              </motion.h1>

              <motion.p
                {...stagger(2)}
                suppressHydrationWarning
                className="mt-6 max-w-xl text-body-lg text-paper-0/80"
              >
                Eight companies, one standard of reliability — from car rentals
                and fleet leasing to serviced apartments, travel, logistics,
                and more.
              </motion.p>

              <motion.div
                {...stagger(3)}
                suppressHydrationWarning
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button asChild size="lg" className="btn-sheen">
                  <Link href="/companies">Explore our companies</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="border-paper-0/70 text-paper-0 hover:bg-paper-0 hover:text-ink-900"
                >
                  <Link href="/about">About the Group</Link>
                </Button>
              </motion.div>

              {/* Award proof chip */}
              <motion.p
                {...stagger(4)}
                suppressHydrationWarning
                className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-accent-500/40 bg-accent-700/15 px-4 py-2 text-sm text-paper-0/90 backdrop-blur-sm"
              >
                <Trophy className="size-4 text-accent-500" aria-hidden="true" />
                Car Rental Service Provider of the Year 2024 — Ghana Tourism Authority
              </motion.p>
            </div>

            {/* Hero photo — one large card, desktop */}
            <div className="relative hidden lg:col-span-5 lg:block">
              {/* Decorative ring + dots behind the card */}
              <motion.span
                {...stagger(5)}
                suppressHydrationWarning
                className="absolute -right-8 -top-8 size-40 rounded-full border border-accent-500/30"
                aria-hidden="true"
              />
              <motion.span
                {...stagger(5)}
                suppressHydrationWarning
                className="absolute -bottom-6 -left-6 grid grid-cols-3 gap-2"
                aria-hidden="true"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="size-1 rounded-full bg-accent-500/50" />
                ))}
              </motion.span>

              <motion.div
                {...stagger(3)}
                suppressHydrationWarning
                style={shouldReduceMotion ? undefined : { y: slow }}
                className="relative"
              >
                <motion.div
                  animate={float(8, 8, 0.5)}
                  className="relative overflow-hidden rounded-lg border border-paper-0/15 shadow-floating"
                >
                  <HeroSlideshow aspect="aspect-[4/5]" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Hero photo — mobile/tablet */}
          <motion.div
            {...stagger(4)}
            suppressHydrationWarning
            className="mt-10 lg:hidden"
          >
            <div className="relative overflow-hidden rounded-lg border border-paper-0/15 shadow-floating">
              <HeroSlideshow aspect="aspect-[16/9]" />
            </div>
          </motion.div>

          {/* Sector ticker — quiet proof of breadth. */}
          <motion.ul
            {...stagger(5)}
            suppressHydrationWarning
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-paper-0/15 pt-6 text-sm text-paper-0/60 md:mt-14"
          >
            {sectors.map((sector, index) => (
              <li key={sector} className="flex items-center gap-4">
                {index > 0 && (
                  <span className="size-1 rounded-full bg-accent-500/70" aria-hidden="true" />
                )}
                {sector}
              </li>
            ))}
          </motion.ul>
        </Container>

        {/* Scroll cue — always rendered; the global prefers-reduced-motion
            rule in globals.css freezes its animation when needed. */}
        <div
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
          aria-hidden="true"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-paper-0/30 p-1.5">
            <div
              className="h-2 w-1 rounded-full bg-paper-0/70"
              style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
