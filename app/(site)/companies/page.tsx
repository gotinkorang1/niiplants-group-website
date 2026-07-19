import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { companiesByGroup, companyGroups } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Our Companies",
  description:
    "All 8 Niiplants Group companies — car rentals, vehicle leasing, automotive, logistics, serviced apartments, travel, food, and office supplies.",
  alternates: { canonical: "/companies" },
};

export default function CompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our companies"
        title="One group, eight specialist businesses."
        lede="Our portfolio is built on natural adjacency — mobility feeds hospitality, logistics keeps fleets moving, and every company holds the same group standard of reliability."
      >
        {/* Cluster jump-links */}
        <nav aria-label="Company clusters" className="mt-8 flex flex-wrap gap-2">
          {companyGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-paper-0/30 px-4 py-2 text-sm text-paper-0/90 transition-colors duration-200 hover:border-accent-500 hover:bg-accent-700/20"
            >
              {group.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col gap-20">
          {companyGroups.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-28">
              <Reveal>
                <h2 className="text-label uppercase tracking-wide text-ink-500 mb-8">
                  {group.label}
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {companiesByGroup(group.id).map((company, index) => (
                  <Reveal key={company.slug} delay={index * 0.06}>
                    <Link
                      href={`/companies/${company.slug}`}
                      className="card-lift group flex h-full flex-col justify-between rounded-md border border-line-200 bg-paper-0 p-8"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className="mt-3 inline-block h-1 w-8 rounded-full"
                            style={{ backgroundColor: `var(--color-sector-${company.tint})` }}
                            aria-hidden="true"
                          />
                          {company.logo && (
                            <span className="flex h-14 w-24 items-center justify-end">
                              <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                width={96}
                                height={56}
                                className="max-h-14 w-auto max-w-24 object-contain transition-transform duration-300 group-hover:scale-105"
                              />
                            </span>
                          )}
                        </div>
                        <p className="mt-4 text-h3 font-display text-ink-900">{company.name}</p>
                        <p className="text-label uppercase tracking-wide text-ink-500 mt-1">
                          {company.sector}
                        </p>
                        <p className="mt-4 text-ink-500">{company.descriptor}</p>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-sm font-medium text-accent-700">
                          Learn more
                          <ArrowUpRight
                            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-label uppercase tracking-wide text-ink-500">
                          {company.pageType === "external" ? "Links to company site" : "On this site"}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
