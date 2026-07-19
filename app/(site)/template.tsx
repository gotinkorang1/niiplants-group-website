"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Soft fade-rise on every route change — subtle, corporate-safe. */
export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      suppressHydrationWarning
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
