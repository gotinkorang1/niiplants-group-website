import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { ImageBand } from "@/components/site/image-band";
import { companyGroups, companiesByGroup } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career across Niiplants Group's eight companies — from automotive and logistics to hospitality, travel, and corporate services in Ghana.",
  alternates: { canonical: "/careers" },
};

const reasons = [
  {
    title: "Eight businesses, one employer",
    description:
      "Careers here can cross industries — a start in car rentals can grow into fleet leasing, logistics, or group operations.",
  },
  {
    title: "Real responsibility, early",
    description:
      "Our companies are lean and operational. People who deliver are given more to run — not more meetings to attend.",
  },
  {
    title: "A standard worth keeping",
    description:
      "We serve corporations, institutions, and government. Working here means learning to operate at that standard.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do work that keeps Ghana moving."
        lede="Across mobility, hospitality, and business services, Niiplants Group hires people who take service seriously — and gives them room to grow across eight companies."
      />

      {/* Why work here */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">
              Why work with us
            </p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              A group career, not just a job.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 0.06}>
                <p className="text-display font-display text-accent-700" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-h3 text-ink-900">{reason.title}</h3>
                <p className="mt-2 text-ink-500">{reason.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ImageBand
        src="/photos/office-team.jpg"
        alt="Colleagues collaborating in the office"
        eyebrow="Our people"
        title="Careers built across eight companies."
        body="Grow with a group that promotes from within and gives people real responsibility early."
        align="center"
      />

      {/* Where you could work */}
      <section className="border-y border-line-200 bg-paper-50 py-20 md:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">
              Where you could work
            </p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              Opportunities across the group.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {companyGroups.map((group, index) => (
              <Reveal key={group.id} delay={index * 0.06}>
                <div className="card-lift h-full rounded-md border border-line-200 bg-paper-0 p-8">
                  <h3 className="text-h3 font-display text-ink-900">{group.label}</h3>
                  <ul className="mt-4 flex flex-col gap-2 text-ink-500">
                    {companiesByGroup(group.id).map((company) => (
                      <li key={company.slug}>{company.name}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How to apply */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">How to apply</p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              Vacancies and internships.
            </h2>
            <p className="mt-4 text-body-lg text-ink-500">
              Open roles are advertised as they arise. To apply — or to
              register interest in an internship or national service placement
              — send your CV and a short note about the company or role
              you&apos;re interested in through our contact page.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact?subject=careers">Apply now</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
