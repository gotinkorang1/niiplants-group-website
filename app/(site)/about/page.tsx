import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { RouteNetworkArt } from "@/components/site/brand-art";
import { ImageBand } from "@/components/site/image-band";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { companyGroups, companiesByGroup } from "@/lib/companies";

export const metadata: Metadata = {
  title: "About the Group",
  description:
    "Niiplants Group is a diversified Ghanaian business group — six companies across mobility, travel, and business services, one standard of reliability.",
  alternates: { canonical: "/about" },
};

// Draft values pending client confirmation — see docs/04-content.md.
const values = [
  {
    name: "Reliability",
    description:
      "Fleets that run, rooms that are ready, deliveries that arrive. We build businesses people can depend on daily.",
  },
  {
    name: "Integrity",
    description:
      "We do what we agree to — with customers, partners, institutions, and each other.",
  },
  {
    name: "Service excellence",
    description:
      "Professional standards in every interaction, from a single car rental to a nationwide corporate contract.",
  },
  {
    name: "Local commitment",
    description:
      "Ghanaian-founded and Ghana-focused — we grow by serving the communities and institutions around us.",
  },
  {
    name: "Continuous improvement",
    description:
      "Every company in the group learns from the others, and each year's standard becomes next year's baseline.",
  },
];

/** Top management — names and roles per client-supplied photo files. */
const leadership = [
  { src: "/management/theo-ayitey-adjin.jpg", name: "Theo Ayitey-Adjin", role: "Chief Executive Officer" },
  { src: "/management/emmanuel-nelson.jpg", name: "Emmanuel Nelson", role: "Operations Manager" },
  { src: "/management/daniel-awotwe-pratt.jpg", name: "Daniel Awotwe-Pratt", role: "Finance Manager" },
  { src: "/management/kingdom-kededor-avisseh.jpg", name: "Kingdom Kededor Avisseh", role: "Executive Assistant" },
];

const awards = [
  {
    src: "/awards/ceo-receiving-award.jpg",
    alt: "Niiplants representative receiving an award on stage at the National Tourism Awards",
    caption: "On stage at the National Tourism Awards.",
    wide: true,
  },
  {
    src: "/awards/tourism-awards-2024-a.jpg",
    alt: "Certificate of Excellence — Car Rental Service Provider of the Year 2024, Greater Accra Regional Tourism Awards",
    caption: "Car Rental Service Provider of the Year 2024 — Ghana Tourism Authority.",
    wide: false,
  },
  {
    src: "/awards/award-trophy-1.jpg",
    alt: "Niiplants team holding a trophy at the National Tourism Awards",
    caption: "Receiving honours at the National Tourism Awards.",
    wide: false,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Group"
        title="Built in Ghana. Built to be depended on."
        lede="Founded in Ghana, Niiplants Group has grown into a diversified group of six companies delivering reliable services across mobility, travel, and business services — for individuals, corporations, and government institutions."
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">Our story</p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              Breadth without dilution.
            </h2>
            <RouteNetworkArt mode="light" className="mt-10 hidden max-w-xs lg:block" />
          </Reveal>
          <Reveal className="lg:col-span-7 flex flex-col gap-6 text-body-lg text-ink-500" delay={0.08}>
            <p>
              Niiplants Group did not set out to be a conglomerate of unrelated
              businesses. Each company was built to answer a need the group saw
              up close — vehicles that companies could rent rather than buy,
              fleets that needed leasing and maintenance, goods that needed
              moving, travellers who needed somewhere dependable to stay.
            </p>
            <p>
              That is why the portfolio holds together: rentals feed leasing,
              logistics keeps goods moving, and travel connects the journeys in
              between. Six specialist companies, one standard of reliability.
            </p>
            <p>
              Today the group serves individuals, corporations, and government
              institutions across Ghana through innovation, professionalism,
              and customer satisfaction.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="border-y border-line-200 bg-paper-50 py-20 md:py-24">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal>
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">Mission</p>
            <p className="text-h3 font-display text-ink-900 text-balance">
              To deliver dependable, professionally-run services — across
              mobility, travel, and business supply — that organisations
              and travellers in Ghana can build on.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">Vision</p>
            <p className="text-h3 font-display text-ink-900 text-balance">
              To be West Africa&apos;s most trusted diversified services group.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">Core values</p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              The standard every company keeps.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.name} delay={index * 0.05}>
                <p className="text-display font-display text-accent-700" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-h3 text-ink-900">{value.name}</h3>
                <p className="mt-2 text-ink-500">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ImageBand
        src="/photos/logistics-truck-port.jpg"
        alt="Freight truck at a container port at sunset"
        eyebrow="Our reach"
        title="Six companies. One operating standard."
        body="From vehicles and freight to residences and supplies, every Niiplants company is run to the same standard of reliability."
        cta={{ href: "/companies", label: "Explore our companies" }}
      />

      {/* Leadership */}
      <section className="border-y border-line-200 bg-paper-50 py-20 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">Leadership</p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              The people accountable for the standard.
            </h2>
          </Reveal>
          <ul className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {leadership.map((person, index) => (
              <li key={person.name}>
                <Reveal delay={index * 0.07} className="card-lift group h-full overflow-hidden rounded-md border border-line-200 bg-paper-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={person.src}
                      alt={`${person.name}, ${person.role}, Niiplants Group`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-medium text-ink-900">{person.name}</p>
                    <p className="mt-1 text-sm text-ink-500">{person.role}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Awards & recognition */}
      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">
              Awards &amp; recognition
            </p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              Recognised by Ghana&apos;s tourism industry.
            </h2>
            <p className="mt-4 text-body-lg text-ink-500">
              At the Ghana Tourism Authority&apos;s Greater Accra Regional
              Tourism Awards 2024, Nii Plants Car Rentals was named{" "}
              <strong className="font-medium text-ink-900">
                Car Rental Service Provider of the Year
              </strong>{" "}
              — recognition of the service standard the whole group is run to.
            </p>
            <p className="mt-4 text-ink-500">
              The group has also represented Ghana&apos;s private sector at the
              National Tourism Awards across multiple years.
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {awards.map((award, index) => (
                <Reveal
                  key={award.src}
                  delay={index * 0.07}
                  className={award.wide ? "col-span-2" : ""}
                >
                  <figure className="card-lift group overflow-hidden rounded-md border border-line-200 bg-paper-0">
                    <div className={`relative overflow-hidden ${award.wide ? "aspect-[2/1]" : "aspect-[4/3]"}`}>
                      <Image
                        src={award.src}
                        alt={award.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm text-ink-500">
                      {award.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Group structure */}
      <section className="border-y border-line-200 bg-paper-50 py-20 md:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">
              How the group is organised
            </p>
            <h2 className="text-h2 font-display text-ink-900 text-balance">
              Three clusters, six companies.
            </h2>
            <p className="mt-4 text-body-lg text-ink-500">
              Our companies are organised by how they work together — not as a
              flat list of unrelated ventures.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {companyGroups.map((group, index) => (
              <Reveal key={group.id} delay={index * 0.06}>
                <div className="card-lift h-full rounded-md border border-line-200 bg-paper-0 p-8">
                  <h3 className="text-h3 font-display text-ink-900">{group.label}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {companiesByGroup(group.id).map((company) => (
                      <li key={company.slug}>
                        <Link
                          href={`/companies/${company.slug}`}
                          className="group flex items-center gap-1 text-ink-700 hover:text-accent-700"
                        >
                          {company.name}
                          <ArrowUpRight
                            className="size-3.5 text-ink-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Button asChild variant="secondary">
              <Link href="/companies">Explore all companies</Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
