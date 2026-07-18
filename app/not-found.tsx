import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

export default function NotFound() {
  return (
    <section className="py-40 md:py-48">
      <Container className="max-w-2xl text-center">
        <p className="text-label uppercase tracking-wide text-accent-700 mb-4">404</p>
        <h1 className="text-h1 font-display text-ink-900 text-balance">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-body-lg text-ink-500">
          The page you&apos;re looking for may have moved. Try the companies
          directory, or start again from the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/companies">Our companies</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
