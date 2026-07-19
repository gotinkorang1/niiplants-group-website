import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { companies } from "@/lib/companies";
import { getPosts, urlForImage } from "@/lib/sanity";

function companyLabel(value: string) {
  if (value === "group") return "Niiplants Group";
  return companies.find((c) => c.slug === value)?.name ?? "Niiplants Group";
}

/** Homepage teaser — latest 3 stories; renders nothing until news exists. */
export async function NewsTeaser() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line-200 py-24 md:py-32">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-accent-700" aria-hidden="true" />
              From the newsroom
            </p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              The latest across the group.
            </h2>
          </div>
          <Button asChild variant="secondary">
            <Link href="/newsroom">All news</Link>
          </Button>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const image = post.coverImage
              ? urlForImage(post.coverImage)?.width(640).height(400).fit("crop").url()
              : null;
            return (
              <Reveal key={post._id} delay={index * 0.06} className="h-full">
                <Link
                  href={`/newsroom/${post.slug}`}
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
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-label uppercase tracking-wide text-accent-700">
                      {companyLabel(post.company)}
                    </p>
                    <h3 className="mt-2 text-h3 leading-snug text-ink-900">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-500">{post.excerpt}</p>
                    <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-accent-700">
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
  );
}
