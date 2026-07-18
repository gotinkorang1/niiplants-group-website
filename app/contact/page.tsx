import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { companies } from "@/lib/companies";
import { companyDetails } from "@/lib/company-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Niiplants Group or reach any of its eight companies directly — car rentals, leasing, automotive, logistics, residences, travel, food, and office supplies.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the group — or the right company directly."
        lede="Send an enquiry below and the right team will pick it up, or use a company's own contact details where listed."
      />

      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <h2 className="text-h2 font-display text-ink-900">Send us a message</h2>
            <p className="mt-3 mb-8 text-ink-500">
              Tell us which company your enquiry concerns and we&apos;ll route
              it to the right people.
            </p>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>

          {/* Directory */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-h2 font-display text-ink-900">Company directory</h2>
              <p className="mt-3 text-ink-500">
                Direct contact details and websites, where available.
              </p>
            </Reveal>
            <ul className="mt-8 flex flex-col divide-y divide-line-200 border-y border-line-200">
              {companies.map((company, index) => {
                const detail = companyDetails[company.slug];
                return (
                  <li key={company.slug}>
                    <Reveal delay={index * 0.03} className="py-5">
                      <p className="font-medium text-ink-900">{company.name}</p>
                      <p className="text-label uppercase tracking-wide text-ink-500 mt-0.5">
                        {company.sector}
                      </p>
                      <div className="mt-2 flex flex-col gap-1 text-sm text-ink-500">
                        {detail?.location && <p>{detail.location}</p>}
                        {detail?.phones && <p>{detail.phones.join(" / ")}</p>}
                        {detail?.email && (
                          <a href={`mailto:${detail.email}`} className="hover:text-accent-700">
                            {detail.email}
                          </a>
                        )}
                        {company.externalUrl && (
                          <a
                            href={company.externalUrl}
                            target="_blank"
                            rel="noopener"
                            className="flex items-center gap-1 text-accent-700 hover:underline"
                          >
                            {company.externalUrl.replace("https://", "")}
                            <ArrowUpRight className="size-3.5" aria-hidden="true" />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
            <Reveal className="mt-8">
              <div className="rounded-md border border-line-200 bg-paper-50 p-6 text-sm text-ink-500">
                <p className="font-medium text-ink-900">Working hours</p>
                <p className="mt-1">Monday – Saturday, 9:00 – 17:00 (GMT) · Sunday closed</p>
                <p className="mt-3 font-medium text-ink-900">Location</p>
                <p className="mt-1">Dansoman, Accra, Ghana</p>
              </div>
            </Reveal>
            <Reveal className="mt-6">
              <div className="overflow-hidden rounded-md border border-line-200 shadow-floating">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1180.5898873160777!2d-0.2624915272573497!3d5.56476143642904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf983bc1942dc3%3A0xd526a3152ec39f42!2sNii%20Plants%20%26%20Car%20Rentals!5e0!3m2!1sen!2sgh!4v1784357811376!5m2!1sen!2sgh"
                  title="Map — Nii Plants & Car Rentals, Dansoman, Accra"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-72 w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
