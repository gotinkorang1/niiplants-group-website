"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Scroll-triggered fade/rise, once, per docs/08-animation.md. Honors prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      // Framer Motion applies `initial`/`whileInView` styles to the DOM after
      // mount rather than in the server-rendered HTML, so the style attribute
      // legitimately differs between server and first client paint. Harmless —
      // see https://github.com/framer/motion/issues/2312.
      suppressHydrationWarning
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
