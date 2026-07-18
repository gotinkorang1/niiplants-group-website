import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { RouteNetworkArt } from "@/components/site/brand-art";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "News, announcements, and updates from Niiplants Group and its eight companies.",
  alternates: { canonical: "/newsroom" },
};

export default function NewsroomPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News from across the group."
        lede="Announcements, milestones, and updates from Niiplants Group and its companies."
      />

      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="max-w-2xl lg:col-span-7">
            {/* Empty state until first articles are published — no placeholder
                "lorem" articles, per the content principle in docs/04-content.md. */}
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              First stories publishing soon.
            </h2>
            <p className="mt-4 text-body-lg text-ink-500">
              We&apos;re preparing our first group announcements. For press and
              media enquiries in the meantime, reach us directly — we respond
              to journalists promptly.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">Media enquiries</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="hidden lg:col-span-5 lg:block">
            <RouteNetworkArt mode="light" className="mx-auto max-w-sm" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
