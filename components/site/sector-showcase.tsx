import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CompanyCard } from "@/components/site/company-card";
import { companiesByGroup, companyGroups } from "@/lib/companies";

export function SectorShowcase() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our companies"
          title="One group, six specialist businesses."
          lede="Our companies work together naturally — rentals feed leasing, logistics keeps goods moving, and travel connects the journeys between."
        />

        <div className="mt-16 flex flex-col gap-14">
          {companyGroups.map((group) => (
            <div key={group.id}>
              <Reveal className="mb-7 flex items-center gap-4">
                <h3 className="text-label uppercase tracking-[0.24em] text-ink-500">
                  {group.label}
                </h3>
                <span className="h-px flex-1 bg-line-200" aria-hidden="true" />
              </Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {companiesByGroup(group.id).map((company, index) => (
                  <Reveal key={company.slug} delay={index * 0.07} className="h-full">
                    <CompanyCard company={company} />
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
