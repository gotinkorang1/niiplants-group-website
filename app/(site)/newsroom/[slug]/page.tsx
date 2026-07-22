import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { ShareButtons } from "@/components/site/news/share-buttons";
import { ReadingProgress } from "@/components/site/news/reading-progress";
import { companies } from "@/lib/companies";
import { getPost, getPosts, urlForImage, type NewsPost } from "@/lib/sanity";
import { siteUrl } from "@/lib/site";

export const revalidate = 60;

function companyLabel(value: string) {
  if (value === "group") return "Nii Plants Group";
  return companies.find((c) => c.slug === value)?.name ?? "Nii Plants Group";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** ~200 wpm over the plain text of the article body. */
function readingTime(post: NewsPost): number {
  const words = (post.body ?? [])
    .flatMap((block) =>
      "children" in block && Array.isArray(block.children)
        ? block.children.map((child) =>
            typeof child === "object" && child !== null && "text" in child
              ? String((child as { text?: unknown }).text ?? "")
              : "",
          )
        : [],
    )
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
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
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element -- dimensions unknown for editor-uploaded images */}
          <img
            src={url}
            alt={value.alt ?? ""}
            loading="lazy"
            className="w-full rounded-lg border border-line-200 shadow-floating"
          />
          {value.alt && (
            <figcaption className="mt-3 text-center text-sm text-ink-500">{value.alt}</figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 text-h2 font-display text-ink-900">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-9 text-h3 text-ink-900">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-accent-500 pl-6 font-display text-h3 text-ink-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-body-lg leading-relaxed text-ink-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-body-lg text-ink-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-body-lg text-ink-700">{children}</ol>
    ),
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
  const articleUrl = `${siteUrl}/newsroom/${post.slug}`;
  const minutes = readingTime(post);

  // Related: same company first, then latest others — up to 3.
  const all = (await getPosts()).filter((p) => p.slug !== post.slug);
  const related = [
    ...all.filter((p) => p.company === post.company),
    ...all.filter((p) => p.company !== post.company),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    publisher: { "@type": "Organization", name: "Nii Plants Group", url: siteUrl },
    mainEntityOfPage: articleUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />

      <PageHero eyebrow={companyLabel(post.company)} title={post.title}>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-paper-0/70">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{minutes} min read</span>
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
            <Reveal>
              <div className="relative mb-12 aspect-[2/1] overflow-hidden rounded-lg border border-line-200 shadow-floating">
                <Image
                  src={cover}
                  alt={post.coverImage?.alt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}

          <div>
            {post.body && <PortableText value={post.body} components={portableComponents} />}
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-line-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <ShareButtons url={articleUrl} title={post.title} />
            <Button asChild variant="secondary">
              <Link href="/newsroom">← All news</Link>
            </Button>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line-200 bg-paper-50 py-16 md:py-20">
          <Container>
            <Reveal>
              <h2 className="text-label uppercase tracking-wide text-ink-500 mb-8">
                More from the newsroom
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, index) => {
                const image = rel.coverImage
                  ? urlForImage(rel.coverImage)?.width(640).height(400).fit("crop").url()
                  : null;
                return (
                  <Reveal key={rel._id} delay={index * 0.06} className="h-full">
                    <Link
                      href={`/newsroom/${rel.slug}`}
                      className="card-lift group flex h-full flex-col overflow-hidden rounded-md border border-line-200 bg-paper-0"
                    >
                      <div className="relative aspect-[8/5] overflow-hidden bg-paper-50">
                        {image ? (
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-ink-900 to-ink-700" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-label uppercase tracking-wide text-accent-700">
                          {companyLabel(rel.company)}
                        </p>
                        <h3 className="mt-2 text-base font-medium leading-snug text-ink-900">
                          {rel.title}
                        </h3>
                        <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-accent-700">
                          Read
                          <ArrowUpRight
                            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
