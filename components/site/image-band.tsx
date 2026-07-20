"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

/**
 * Full-bleed photographic band with a slow parallax drift and a scrim
 * that guarantees text contrast. Used to break up long pages with
 * something visual without resorting to decorative filler.
 */
export function ImageBand({
  src,
  alt,
  eyebrow,
  title,
  body,
  cta,
  align = "left",
  height = "md",
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: { href: string; label: string };
  align?: "left" | "center";
  height?: "md" | "lg";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Image drifts slower than the page — subtle depth, no jitter.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden text-paper-0 ${
        height === "lg" ? "min-h-[70vh]" : "min-h-[52vh]"
      } flex items-center`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { y }}
        className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>

      {/* Scrims — directional for left-aligned copy, even for centered. */}
      <div
        className={
          align === "center"
            ? "absolute inset-0 bg-ink-900/70"
            : "absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/30"
        }
        aria-hidden="true"
      />

      <Container
        className={`relative z-10 py-20 md:py-28 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className={align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}
        >
          {eyebrow && (
            <p
              className={`text-label uppercase tracking-wide text-paper-0/70 mb-4 flex items-center gap-3 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              <span className="inline-block h-px w-10 bg-accent-500" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h2 className="text-h2 font-display text-balance">{title}</h2>
          {body && <p className="mt-4 text-body-lg text-paper-0/80">{body}</p>}
          {cta && (
            <div className="mt-8">
              <Button asChild size="lg" className="btn-sheen">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
