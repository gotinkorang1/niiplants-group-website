"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Restrained count-up numeral, triggered once on scroll into view
 * (docs/06-components.md, "Stats strip"). Honors prefers-reduced-motion.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  // Always start at 0 so server and client render identically (hydration-safe);
  // reduced-motion users jump straight to the final value in the effect below.
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
