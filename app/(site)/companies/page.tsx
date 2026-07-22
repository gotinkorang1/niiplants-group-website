import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { CompanyCard } from "@/components/site/company-card";
import { companies, companiesByGroup, companyGroups } from "@/lib/companies";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Companies",
  description:
    "All 6 Nii Plants Group companies — car rentals, vehicle leasing, logistics, travel, food, and office supplies.",
  alternates: { canonical: "/companies" },
};

export default function CompaniesPage() {
  // ItemList tells Google this page is a directory of the group's companies.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Nii Plants Group companies",
      numberOfItems: companies.length,
      itemListElement: companies.map((company, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: company.name,
        description: company.descriptor,
        url: `${siteUrl}/companies/${company.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Companies", item: `${siteUrl}/companies` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Our companies"
        title="One group, six specialist businesses."
        lede="Our portfolio is built on natural adjacency — rentals feed leasing, logistics keeps goods moving, and every company holds the same group standard of reliability."
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {companiesByGroup(group.id).map((company, index) => (
                  <Reveal key={company.slug} delay={index * 0.07} className="h-full">
                    <CompanyCard company={company} size="large" />
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
