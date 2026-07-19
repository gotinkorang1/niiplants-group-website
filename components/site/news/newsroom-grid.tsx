"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/** Plain, pre-resolved view model — image URLs are built server-side. */
export interface NewsCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  company: string;
  companyLabel: string;
  /** CSS color for the company accent chip. */
  tintColor: string;
  date: string;
  dateISO: string;
  imageUrl: string | null;
  featuredImageUrl: string | null;
}

function CompanyChip({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-200 bg-paper-0/90 px-3 py-1 text-xs font-medium text-ink-700 backdrop-blur-sm">
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      {label}
    </span>
  );
}

function CardImage({ url, alt, className }: { url: string | null; alt: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-paper-50", className)}>
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 to-ink-700" />
      )}
    </div>
  );
}

export function NewsroomGrid({ posts }: { posts: NewsCard[] }) {
  const [filter, setFilter] = React.useState("all");

  const filters = React.useMemo(() => {
    const seen = new Map<string, string>();
    for (const post of posts) {
      if (!seen.has(post.company)) seen.set(post.company, post.companyLabel);
    }
    return [{ value: "all", label: "All news" }, ...[...seen].map(([value, label]) => ({ value, label }))];
  }, [posts]);

  const visible = filter === "all" ? posts : posts.filter((p) => p.company === filter);
  const [featured, ...rest] = filter === "all" ? visible : [null, ...visible];

  return (
    <div>
      {/* Filter chips — only shown once more than one company has news. */}
      {filters.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter news by company">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                filter === f.value
                  ? "border-ink-900 bg-ink-900 text-paper-0"
                  : "border-line-200 text-ink-700 hover:border-ink-500",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Featured — latest story, editorial split card. */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12"
        >
          <Link
            href={`/newsroom/${featured.slug}`}
            className="card-lift group grid overflow-hidden rounded-lg border border-line-200 bg-paper-0 md:grid-cols-2"
          >
            <CardImage
              url={featured.featuredImageUrl}
              alt=""
              className="aspect-[16/10] md:aspect-auto md:min-h-[320px]"
            />
            <div className="flex flex-col justify-center p-7 md:p-10">
              <div className="flex items-center gap-3">
                <CompanyChip label={featured.companyLabel} color={featured.tintColor} />
                <time dateTime={featured.dateISO} className="text-sm text-ink-500">
                  {featured.date}
                </time>
              </div>
              <h2 className="mt-4 text-h2 font-display text-ink-900 text-balance">
                {featured.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-body-lg text-ink-500">{featured.excerpt}</p>
              <span className="mt-6 flex items-center gap-1 text-sm font-medium text-accent-700">
                Read the story
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid — layout-animated on filter change. */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {rest
            .filter((p): p is NewsCard => p !== null)
            .map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="h-full"
              >
                <Link
                  href={`/newsroom/${post.slug}`}
                  className="card-lift group flex h-full flex-col overflow-hidden rounded-md border border-line-200 bg-paper-0"
                >
                  <div className="relative">
                    <CardImage url={post.imageUrl} alt="" className="aspect-[8/5]" />
                    <div className="absolute left-3 top-3">
                      <CompanyChip label={post.companyLabel} color={post.tintColor} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={post.dateISO} className="text-sm text-ink-500">
                      {post.date}
                    </time>
                    <h3 className="mt-2 text-h3 leading-snug text-ink-900">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-ink-500">{post.excerpt}</p>
                    <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-accent-700">
                      Read
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
