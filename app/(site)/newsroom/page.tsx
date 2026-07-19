import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { RouteNetworkArt } from "@/components/site/brand-art";
import { NewsroomGrid, type NewsCard } from "@/components/site/news/newsroom-grid";
import { companies } from "@/lib/companies";
import { getPosts, urlForImage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "News, announcements, and updates from Niiplants Group and its eight companies.",
  alternates: { canonical: "/newsroom" },
};

export const revalidate = 60;

function toCard(post: Awaited<ReturnType<typeof getPosts>>[number]): NewsCard {
  const company = companies.find((c) => c.slug === post.company);
  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    company: post.company,
    companyLabel: post.company === "group" ? "Niiplants Group" : company?.name ?? "Niiplants Group",
    tintColor: company ? `var(--color-sector-${company.tint})` : "var(--color-accent-500)",
    date: new Date(post.publishedAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    dateISO: post.publishedAt,
    imageUrl: post.coverImage
      ? urlForImage(post.coverImage)?.width(800).height(500).fit("crop").url() ?? null
      : null,
    featuredImageUrl: post.coverImage
      ? urlForImage(post.coverImage)?.width(1200).height(760).fit("crop").url() ?? null
      : null,
  };
}

export default async function NewsroomPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News from across the group."
        lede="Announcements, milestones, and updates from Niiplants Group and its companies."
      />

      {posts.length === 0 ? (
        <section className="py-20 md:py-28">
          <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <Reveal className="max-w-2xl lg:col-span-7">
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
      ) : (
        <section className="py-16 md:py-24">
          <Container>
            <NewsroomGrid posts={posts.map(toCard)} />
          </Container>
        </section>
      )}
    </>
  );
}
