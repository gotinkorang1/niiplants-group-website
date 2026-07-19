"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

/** Branded runtime-error boundary — shown instead of a blank crash screen. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="py-40 md:py-48">
      <Container className="max-w-2xl text-center">
        <p className="text-label uppercase tracking-wide text-accent-700 mb-4">
          Something went wrong
        </p>
        <h1 className="text-h1 font-display text-ink-900 text-balance">
          We hit an unexpected problem.
        </h1>
        <p className="mt-4 text-body-lg text-ink-500">
          It&apos;s not you — something on our side didn&apos;t load properly.
          Try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
