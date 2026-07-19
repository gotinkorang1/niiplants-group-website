"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold reading-progress bar pinned under the fixed header on articles. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-20 z-40 h-0.5 origin-left bg-accent-500"
    />
  );
}
