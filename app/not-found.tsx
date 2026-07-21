import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { companies } from "@/lib/companies";

const destinations = [
  { href: "/companies", label: "Our companies", description: "All eight businesses in the group" },
  { href: "/about", label: "About the Group", description: "Story, leadership, and awards" },
  { href: "/gallery", label: "Gallery", description: "The group at work, in pictures" },
  { href: "/contact", label: "Contact", description: "Reach the right team directly" },
];

/** Global 404 — renders in the root layout, so it brings its own site chrome. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pb-20 pt-40 md:pb-28 md:pt-48">
          <Container className="max-w-3xl text-center">
            <p className="text-label uppercase tracking-[0.3em] text-accent-700 mb-4">
              Error 404
            </p>
            <h1 className="text-h1 font-display text-ink-900 text-balance">
              This page doesn&apos;t exist.
            </h1>
            <p className="mt-4 text-body-lg text-ink-500">
              The page may have moved or the address may be mistyped. Here are
              the places most visitors are looking for.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </Container>

          <Container className="mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {destinations.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card-lift group flex items-center justify-between gap-4 rounded-md border border-line-200 bg-paper-0 p-6"
                >
                  <span>
                    <span className="block font-medium text-ink-900">{item.label}</span>
                    <span className="mt-1 block text-sm text-ink-500">{item.description}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-ink-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-700"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-label uppercase tracking-wide text-ink-500 mb-4">
                Looking for a specific company?
              </p>
              <ul className="flex flex-wrap gap-2">
                {companies.map((company) => (
                  <li key={company.slug}>
                    <Link
                      href={`/companies/${company.slug}`}
                      className="inline-block rounded-full border border-line-200 px-4 py-2 text-sm text-ink-700 transition-colors duration-200 hover:border-accent-700 hover:text-accent-700"
                    >
                      {company.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
