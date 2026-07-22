import Image from "next/image";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Testimonials } from "@/components/site/testimonials";

/** Real client logos from public/clients — names per client-supplied files. */
const clients = [
  { src: "/clients/mtn.jpg", name: "MTN" },
  { src: "/clients/usaid.jpg", name: "USAID" },
  { src: "/clients/fao.jpg", name: "FAO" },
  { src: "/clients/abb.jpg", name: "ABB" },
  { src: "/clients/bosch.jpg", name: "Bosch" },
  { src: "/clients/vitol.jpg", name: "Vitol" },
  { src: "/clients/zenith.jpg", name: "Zenith" },
  { src: "/clients/university-of-ghana.jpg", name: "University of Ghana" },
  { src: "/clients/promasidor.jpg", name: "Promasidor" },
  { src: "/clients/deme.jpg", name: "DEME" },
  { src: "/clients/saladin-ghana.jpg", name: "Saladin Ghana" },
  { src: "/clients/oloam.jpg", name: "OLOAM" },
];

export function Clients() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our clients"
          title="Trusted by leading organisations."
          lede="Multinationals, institutions, and agencies rely on Nii Plants Group companies every day."
        />

        <ul className="mt-14 grid grid-cols-3 items-center gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
          {clients.map((client, index) => (
            <li key={client.src} className="flex justify-center">
              <Reveal delay={index * 0.04}>
                <Image
                  src={client.src}
                  alt={client.name}
                  width={120}
                  height={120}
                  className="size-16 rounded-md object-contain opacity-75 grayscale transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0 md:size-20"
                />
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Client voice — real testimonials from the car rentals site. */}
        <Reveal className="mt-20">
          <Testimonials />
        </Reveal>
      </Container>
    </section>
  );
}
