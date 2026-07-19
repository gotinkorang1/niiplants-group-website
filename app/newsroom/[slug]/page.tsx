import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { companies } from "@/lib/companies";
import { getPost, urlForImage } from "@/lib/sanity";
import { siteUrl } from "@/lib/site";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const ogImage = post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).height(630).fit("crop").url()
    : null;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/newsroom/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/newsroom/${slug}`,
      publishedTime: post.publishedAt,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1400).fit("max").url();
      if (!url) return null;
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element -- dimensions unknown for editor-uploaded images */}
          <img
            src={url}
            alt={value.alt ?? ""}
            loading="lazy"
            className="w-full rounded-md border border-line-200"
          />
          {value.alt && (
            <figcaption className="mt-2 text-sm text-ink-500">{value.alt}</figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-h2 font-display text-ink-900">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 text-h3 text-ink-900">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-accent-500 pl-5 text-body-lg text-ink-500">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mt-5 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener"
        className="text-accent-700 underline underline-offset-2 hover:text-accent-500"
      >
        {children}
      </a>
    ),
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cover = post.coverImage
    ? urlForImage(post.coverImage)?.width(1600).height(800).fit("crop").url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    publisher: { "@type": "Organization", name: "Niiplants Group", url: siteUrl },
    mainEntityOfPage: `${siteUrl}/newsroom/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero eyebrow={companyLabel(post.company)} title={post.title}>
        <p className="mt-5 text-paper-0/70">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
      </PageHero>

      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/newsroom", label: "Newsroom" },
          { label: post.title },
        ]}
      />

      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          {cover && (
            <div className="relative mb-10 aspect-[2/1] overflow-hidden rounded-lg border border-line-200 shadow-floating">
              <Image
                src={cover}
                alt={post.coverImage?.alt ?? ""}
                fill
                priority
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="text-ink-700">
            {post.body && <PortableText value={post.body} components={portableComponents} />}
          </div>

          <div className="mt-12 border-t border-line-200 pt-8">
            <Button asChild variant="secondary">
              <Link href="/newsroom">← All news</Link>
            </Button>
          </div>
        </Container>
      </article>

      <CtaBand />
    </>
  );
}
