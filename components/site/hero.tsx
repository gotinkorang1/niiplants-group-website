"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { CountUp } from "@/components/site/count-up";

/** Full-bleed cinematic slides — the group's breadth, in four frames. */
const slides = [
  {
    src: "/photos/logistics-truck-port.jpg",
    alt: "Freight truck at a container port at sunset",
    label: "Logistics & distribution",
  },
  {
    src: "/photos/rentals-journey.jpg",
    alt: "Clients travelling together in a Niiplants vehicle",
    label: "Car rentals & leasing",
  },
  {
    src: "/awards/ceo-receiving-award.jpg",
    alt: "Receiving an award on stage at the National Tourism Awards",
    label: "Recognised for service excellence",
  },
  {
    src: "/trivoxo/event-biking.webp",
    alt: "Trivoxo group biking tour on a ridge overlooking the valley",
    label: "Travel & experiences",
  },
];

const SLIDE_MS = 6000;

/** Client-brief figures — see docs/04-content.md. */
const stats: Array<{ value?: number; suffix?: string; static?: string; label: string }> = [
  { value: 6, label: "Companies" },
  { value: 1000, suffix: "+", label: "Customers served" },
  { static: "24/7", label: "Support" },
  { static: "Nationwide", label: "Operations" },
];

/**
 * Homepage banner: full-viewport photography with a slow Ken Burns drift,
 * masked line-rise headline, and a glass stats rail. Markup is identical
 * on server and client; MotionConfig handles reduced motion.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, paused]);

  const slide = slides[index];

  const line = (delay: number) => ({
    initial: { y: "110%" },
    animate: { y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-900 text-paper-0">
        {/* Cinematic backdrop */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.div
                initial={{ scale: 1.02 }}
                animate={{ scale: 1.12 }}
                transition={{ duration: SLIDE_MS / 1000 + 2, ease: "linear" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Scrims — vertical for legibility, horizontal for copy side. */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/70"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/30 to-transparent"
            aria-hidden="true"
          />
          <div className="bg-noise absolute inset-0" aria-hidden="true" />
        </div>

        {/* Copy */}
        <Container className="relative z-10 w-full pb-10 pt-32 md:pb-16">
          <motion.p
            {...fade(0.15)}
            suppressHydrationWarning
            className="text-label uppercase tracking-[0.3em] text-paper-0/70 mb-6 flex items-center gap-3"
          >
            <span className="inline-block h-px w-12 bg-accent-500" aria-hidden="true" />
            Niiplants Group · Ghana
          </motion.p>

          <h1 className="font-display text-balance text-[clamp(2.5rem,1.2rem+5.2vw,5rem)] font-semibold leading-[1.04] tracking-tight">
            <span className="block overflow-hidden">
              <motion.span {...line(0.25)} suppressHydrationWarning className="block">
                Building businesses
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span {...line(0.38)} suppressHydrationWarning className="block">
                that <span className="text-gradient-gold">move Africa forward.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...fade(0.6)}
            suppressHydrationWarning
            className="mt-7 max-w-xl text-body-lg text-paper-0/80"
          >
            Six companies across transportation, logistics, travel,
            food, leasing and office supplies — held to one standard
            of reliability.
          </motion.p>

          <motion.div
            {...fade(0.72)}
            suppressHydrationWarning
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg" className="btn-sheen">
              <Link href="/companies">Explore our companies</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-paper-0/60 bg-paper-0/5 text-paper-0 backdrop-blur-sm hover:bg-paper-0 hover:text-ink-900"
            >
              <Link href="/contact">Contact us</Link>
            </Button>
          </motion.div>

          <motion.p
            {...fade(0.84)}
            suppressHydrationWarning
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-accent-500/40 bg-ink-900/40 px-4 py-2 text-sm text-paper-0/90 backdrop-blur-sm"
          >
            <Trophy className="size-4 shrink-0 text-accent-500" aria-hidden="true" />
            Car Rental Service Provider of the Year 2024 — Ghana Tourism Authority
          </motion.p>
        </Container>

        {/* Glass rail: slide controls + group stats */}
        <motion.div
          {...fade(0.95)}
          suppressHydrationWarning
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative z-10 border-t border-paper-0/15 bg-ink-900/40 backdrop-blur-md"
        >
          <Container className="flex flex-col gap-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            {/* Slide controls */}
            <div className="flex items-center gap-5">
              <div className="flex gap-2.5" role="group" aria-label="Banner slides">
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show slide ${i + 1}: ${s.label}`}
                    aria-current={i === index}
                    className="group relative h-6 w-10 pt-2.5"
                  >
                    <span className="block h-0.5 w-full overflow-hidden rounded-full bg-paper-0/30 transition-colors group-hover:bg-paper-0/50">
                      {i === index && (
                        <motion.span
                          key={`${index}-${paused}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: shouldReduceMotion || paused ? 0 : SLIDE_MS / 1000,
                            ease: "linear",
                          }}
                          className="block h-full w-full origin-left bg-accent-500"
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-paper-0/70"
                >
                  {slide.label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Stats */}
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 lg:gap-x-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl leading-none tabular-nums text-paper-0 md:text-3xl">
                      {stat.static ?? (
                        <CountUp value={stat.value ?? 0} suffix={stat.suffix ?? ""} />
                      )}
                    </span>
                    <span className="mt-1.5 block text-xs uppercase tracking-wider text-paper-0/60">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
