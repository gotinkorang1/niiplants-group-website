import Image from "next/image";

import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/container";
import { companies } from "@/lib/companies";

/**
 * Real subsidiary logos, taken from the companies list so new logos appear
 * here automatically — static grid, grayscale by default, color on hover
 * (docs/06-components.md: no auto-scrolling marquee). Papersource's logo is
 * still pending from the client.
 */
const logos = companies.flatMap((company) =>
  company.logo ? [{ src: company.logo, alt: company.name }] : [],
);

export function LogoStrip() {
  return (
    <section className="border-b border-line-200 py-14 md:py-16">
      <Container>
        <Reveal>
          <p className="text-label uppercase tracking-wide text-ink-500 text-center mb-10">
            The companies of Nii Plants Group
          </p>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10">
          {logos.map((logo, index) => (
            <Reveal key={logo.src} delay={index * 0.05} className="flex justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={72}
                className="h-14 w-auto object-contain opacity-70 grayscale transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
