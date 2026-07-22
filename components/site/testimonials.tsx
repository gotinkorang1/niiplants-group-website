"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Real client testimonials as published on niiplantsghana.com. */
const testimonials = [
  {
    quote:
      "Booking a car with Nii Plants & Car Rentals is reasonably quick and straight forward. I particularly enjoyed the professionalism of the driver. I believe their services are quite efficient.",
    name: "Gershon Navada",
    role: "Client, Nii Plants and Car Rentals",
  },
  {
    quote:
      "My family and I had an unforgettable vacation in Ghana, all thanks to Nii Plants Car Rentals. We rented a Toyota Coaster for our large group, and it exceeded our expectations.",
    name: "Michael Brown",
    role: "Chicago, USA",
  },
];

const INTERVAL_MS = 8000;

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, paused]);

  const active = testimonials[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mx-auto max-w-3xl text-center"
    >
      <span
        className="mx-auto block font-display text-[4rem] leading-none text-accent-500/50"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Fixed min-height stops the section jumping between quote lengths. */}
      <div className="relative min-h-[13rem] sm:min-h-[11rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-h3 font-display text-ink-900 text-balance"
          >
            {active.quote}
            <footer className="mt-6 flex items-center justify-center gap-3">
              <span className="inline-block h-px w-8 bg-accent-500" aria-hidden="true" />
              <span className="text-sm font-normal not-italic text-ink-500">
                {active.name} · {active.role}
              </span>
              <span className="inline-block h-px w-8 bg-accent-500" aria-hidden="true" />
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-accent-700" : "w-2.5 bg-line-200 hover:bg-ink-500",
            )}
          />
        ))}
      </div>
    </div>
  );
}
