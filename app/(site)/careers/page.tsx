import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { ImageBand } from "@/components/site/image-band";
import { SectionHeading } from "@/components/site/section-heading";
import { JobList, type JobCard } from "@/components/site/job-list";
import { companies, companyGroups, companiesByGroup } from "@/lib/companies";
import { getJobs } from "@/lib/sanity";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career across Nii Plants Group's six companies — from logistics and vehicle leasing to travel, food, and corporate services in Ghana.",
  alternates: { canonical: "/careers" },
};

const reasons = [
  {
    title: "Six businesses, one employer",
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

export const revalidate = 60;

const employmentLabels: Record<string, string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACTOR: "Contract",
  TEMPORARY: "Temporary",
  INTERN: "Internship",
  OTHER: "National service",
};

function companyLabel(value: string) {
  if (value === "group") return "Nii Plants Group";
  return companies.find((c) => c.slug === value)?.name ?? "Nii Plants Group";
}

export default async function CareersPage() {
  const jobs = await getJobs();

  const jobCards: JobCard[] = jobs.map((job) => ({
    id: job._id,
    slug: job.slug,
    title: job.title,
    companyLabel: companyLabel(job.company),
    location: job.location,
    employmentLabel: employmentLabels[job.employmentType] ?? "Full time",
    closingDate: job.closingDate
      ? new Date(job.closingDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : undefined,
    summary: job.summary,
    description: job.description,
  }));

  // JobPosting schema — makes open roles eligible for Google Jobs.
  const jobsJsonLd = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.publishedAt,
    ...(job.closingDate ? { validThrough: job.closingDate } : {}),
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: companyLabel(job.company),
      sameAs: siteUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "GH",
      },
    },
    directApply: true,
  }));

  return (
    <>
      {jobsJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }}
        />
      )}
      <PageHero
        eyebrow="Careers"
        title="Do work that keeps Ghana moving."
        lede="Across mobility, travel, and business services, Nii Plants Group hires people who take service seriously — and gives them room to grow across six companies."
      />

      {/* Why work here */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Why work with us" title="A group career, not just a job." />
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
        title="Careers built across six companies."
        body="Grow with a group that promotes from within and gives people real responsibility early."
        align="center"
      />

      {/* Where you could work */}
      <section className="border-y border-line-200 bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Where you could work" title="Opportunities across the group." />
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

      {/* Open roles */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title={jobCards.length > 0 ? "Current vacancies." : "No vacancies right now."}
            lede={
              jobCards.length > 0
                ? "Roles across the group, updated as they open."
                : "We advertise roles here as they arise. In the meantime, you can register your interest below and we will keep your CV on file."
            }
          />
          {jobCards.length > 0 && (
            <div className="mt-12">
              <JobList jobs={jobCards} />
            </div>
          )}
        </Container>
      </section>

      {/* Register interest */}
      <section className="border-t border-line-200 bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Speculative applications"
            title="Not seeing your role?"
            lede="Send your CV with a short note about the company or role you're interested in — including internships and national service placements — and we'll keep it on file for when something opens."
          />
          <Reveal className="mt-8 flex justify-center">
            <Button asChild size="lg" className="btn-sheen">
              <Link href="/contact?subject=careers">Send your CV</Link>
            </Button>
          </Reveal>
        </Container>
      </section>

    </>
  );
}
