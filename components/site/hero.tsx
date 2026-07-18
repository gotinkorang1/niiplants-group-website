"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle scroll parallax — cards drift at different rates as you scroll away.
  const slow = useTransform(scrollY, [0, 600], [0, -30]);
  const fast = useTransform(scrollY, [0, 600], [0, -60]);

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

            {/* Photo collage — desktop */}
            <div className="relative hidden lg:col-span-5 lg:block" aria-hidden="false">
              <div className="relative aspect-[4/5] w-full">
                {/* Decorative ring */}
                <motion.span
                  {...stagger(4)}
                  suppressHydrationWarning
                  className="absolute -right-6 top-4 size-36 rounded-full border border-accent-500/30"
                  aria-hidden="true"
                />

                {/* Main card */}
                <motion.div
                  {...stagger(3)}
                  suppressHydrationWarning
                  style={shouldReduceMotion ? undefined : { y: slow }}
                  className="absolute left-0 top-8 w-[78%]"
                >
                  <motion.figure
                    animate={float(8, 7, 0)}
                    className="relative overflow-hidden rounded-lg border border-paper-0/15 shadow-floating rotate-[-2deg]"
                  >
                    <Image
                      src="/trivoxo/event-biking.webp"
                      alt="Trivoxo group biking tour on a ridge overlooking the valley"
                      width={700}
                      height={327}
                      priority
                      className="w-full object-cover"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent px-4 pb-3 pt-8 text-sm text-paper-0/90">
                      Adventure tours · Trivoxo
                    </figcaption>
                  </motion.figure>
                </motion.div>

                {/* Secondary card */}
                <motion.div
                  {...stagger(4)}
                  suppressHydrationWarning
                  style={shouldReduceMotion ? undefined : { y: fast }}
                  className="absolute bottom-14 right-0 w-[58%]"
                >
                  <motion.figure
                    animate={float(10, 8.5, 0.6)}
                    className="relative overflow-hidden rounded-lg border border-paper-0/15 shadow-floating rotate-[2.5deg]"
                  >
                    <Image
                      src="/awards/ceo-receiving-award.jpg"
                      alt="Receiving an award on stage at the National Tourism Awards"
                      width={520}
                      height={347}
                      priority
                      className="w-full object-cover"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent px-4 pb-3 pt-8 text-sm text-paper-0/90">
                      National Tourism Awards
                    </figcaption>
                  </motion.figure>
                </motion.div>

                {/* Third card */}
                <motion.div
                  {...stagger(5)}
                  suppressHydrationWarning
                  style={shouldReduceMotion ? undefined : { y: slow }}
                  className="absolute bottom-0 left-6 w-[42%]"
                >
                  <motion.figure
                    animate={float(6, 6, 1.1)}
                    className="relative overflow-hidden rounded-lg border border-paper-0/15 shadow-floating rotate-[-3deg]"
                  >
                    <Image
                      src="/trivoxo/event-hiking.webp"
                      alt="Trivoxo hiking event — group celebrating on a hillside trail"
                      width={420}
                      height={280}
                      className="w-full object-cover"
                    />
                  </motion.figure>
                </motion.div>

                {/* Gold dots accent */}
                <motion.span
                  {...stagger(5)}
                  suppressHydrationWarning
                  className="absolute -left-4 top-1/2 grid grid-cols-3 gap-2"
                  aria-hidden="true"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} className="size-1 rounded-full bg-accent-500/50" />
                  ))}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Photo strip — mobile/tablet */}
          <motion.div
            {...stagger(4)}
            suppressHydrationWarning
            className="mt-10 flex gap-3 lg:hidden"
          >
            {[
              { src: "/trivoxo/event-biking.webp", alt: "Trivoxo group biking tour", rotate: "-rotate-2" },
              { src: "/awards/ceo-receiving-award.jpg", alt: "Receiving an award at the National Tourism Awards", rotate: "rotate-1" },
              { src: "/trivoxo/event-hiking.webp", alt: "Trivoxo hiking event", rotate: "-rotate-1" },
            ].map((photo) => (
              <div
                key={photo.src}
                className={`relative h-24 flex-1 overflow-hidden rounded-md border border-paper-0/15 shadow-floating sm:h-32 ${photo.rotate}`}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="33vw" className="object-cover" />
              </div>
            ))}
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
