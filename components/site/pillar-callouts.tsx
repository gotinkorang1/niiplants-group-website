import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/container";

const pillars = [
  {
    label: "Trust",
    copy:
      "Named Car Rental Service Provider of the Year 2024 by the Ghana Tourism Authority — and run with named leadership and direct accountability.",
  },
  {
    label: "Scale",
    copy:
      "Six companies spanning mobility, travel, and business services, run to one group standard.",
  },
  {
    label: "Stability",
    copy:
      "Fleet leasing, logistics, and daily services that keep running for clients who depend on them.",
  },
];

export function PillarCallouts() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-label uppercase tracking-wide text-accent-700 mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent-700" aria-hidden="true" />
            Why Nii Plants Group
          </p>
          <h2 className="text-h2 font-display text-ink-900 text-balance">
            Built to be depended on.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.label} delay={index * 0.08} className="h-full">
              <div className="card-lift group h-full rounded-md border border-line-200 bg-paper-0 p-8">
                <p
                  className="font-display text-display text-line-200 transition-colors duration-300 group-hover:text-accent-500/40"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-label uppercase tracking-wide text-accent-700">
                  {pillar.label}
                </p>
                <p className="mt-3 text-body-lg text-ink-700">{pillar.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
