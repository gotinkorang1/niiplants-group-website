"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Route transitions stay visible even if motion is interrupted during hydration. */
export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      suppressHydrationWarning
      initial={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
