import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { RouteNetworkArt } from "@/components/site/brand-art";
import { companies } from "@/lib/companies";
import { getPosts, urlForImage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "News, announcements, and updates from Niiplants Group and its eight companies.",
  alternates: { canonical: "/newsroom" },
};

export const revalidate = 60;

function companyLabel(value: string) {
  if (value === "group") return "Niiplants Group";
  return companies.find((c) => c.slug === value)?.name ?? "Niiplants Group";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
        <section className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => {
                const image = post.coverImage
                  ? urlForImage(post.coverImage)?.width(800).height(500).fit("crop").url()
                  : null;
                return (
                  <Reveal key={post._id} delay={(index % 3) * 0.06} className="h-full">
                    <Link
                      href={`/newsroom/${post.slug}`}
                      className="card-lift group flex h-full flex-col overflow-hidden rounded-md border border-line-200 bg-paper-0"
                    >
                      <div className="relative aspect-[8/5] overflow-hidden bg-paper-50">
                        {image ? (
                          <Image
                            src={image}
                            alt={post.coverImage?.alt ?? ""}
                            fill
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-ink-900 to-ink-700" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-label uppercase tracking-wide text-accent-700">
                          {companyLabel(post.company)}
                        </p>
                        <h2 className="mt-2 text-h3 text-ink-900">{post.title}</h2>
                        <p className="mt-2 line-clamp-3 text-sm text-ink-500">{post.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between pt-5">
                          <time dateTime={post.publishedAt} className="text-sm text-ink-500">
                            {formatDate(post.publishedAt)}
                          </time>
                          <span className="flex items-center gap-1 text-sm font-medium text-accent-700">
                            Read
                            <ArrowUpRight
                              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
