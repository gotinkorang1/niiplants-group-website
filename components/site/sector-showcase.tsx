import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/container";
import { companiesByGroup, companyGroups } from "@/lib/companies";

export function SectorShowcase() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-label uppercase tracking-wide text-accent-700 mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent-700" aria-hidden="true" />
            Our companies
          </p>
          <h2 className="text-h2 font-display text-ink-900 text-balance">
            One group, six specialist businesses.
          </h2>
          <p className="mt-4 text-body-lg text-ink-500">
            Several of our companies work together naturally — rentals feed
            leasing, logistics keeps goods moving. Explore them below,
            grouped by how they relate.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {companyGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-label uppercase tracking-wide text-ink-500 mb-6">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {companiesByGroup(group.id).map((company, index) => (
                  <Reveal key={company.slug} delay={index * 0.06} className="h-full">
                    <Link
                      href={`/companies/${company.slug}`}
                      className="card-lift group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-line-200 bg-paper-0 p-6"
                    >
                      {/* Sector tint wash, revealed on hover. */}
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.14]"
                        style={{
                          background: `linear-gradient(to bottom, var(--color-sector-${company.tint}), transparent)`,
                        }}
                        aria-hidden="true"
                      />
                      <div className="relative">
                        <span
                          className="inline-block h-1 w-8 rounded-full transition-all duration-300 group-hover:w-14"
                          style={{ backgroundColor: `var(--color-sector-${company.tint})` }}
                          aria-hidden="true"
                        />
                        <p className="mt-4 text-h3 text-ink-900">{company.name}</p>
                        <p className="mt-2 text-sm text-ink-500">{company.descriptor}</p>
                      </div>
                      <div className="relative mt-6 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-sm font-medium text-accent-700">
                          {company.pageType === "external" ? "Visit site" : "Learn more"}
                        </span>
                        <span className="flex size-8 items-center justify-center rounded-full border border-line-200 text-ink-500 transition-all duration-300 group-hover:border-accent-700 group-hover:bg-accent-700 group-hover:text-paper-0">
                          <ArrowUpRight
                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
