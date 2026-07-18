import Image from "next/image";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";

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
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-label uppercase tracking-wide text-accent-700 mb-4 flex items-center justify-center gap-3">
            <span className="inline-block h-px w-10 bg-accent-700" aria-hidden="true" />
            Our clients
            <span className="inline-block h-px w-10 bg-accent-700" aria-hidden="true" />
          </p>
          <h2 className="text-h2 font-display text-ink-900 text-balance">
            Trusted by leading organisations.
          </h2>
          <p className="mt-4 text-body-lg text-ink-500">
            Multinationals, institutions, and agencies rely on Niiplants Group
            companies every day.
          </p>
        </Reveal>

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

        {/* Client voice — real testimonial from the car rentals site. */}
        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <span
            className="mx-auto block font-display text-[4rem] leading-none text-accent-500/50"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="text-h3 font-display text-ink-900 text-balance">
            Booking a car with Nii Plants &amp; Car Rentals is reasonably quick
            and straight forward. I particularly enjoyed the professionalism
            of the driver.
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="inline-block h-px w-8 bg-accent-500" aria-hidden="true" />
            <p className="text-sm text-ink-500">
              Gershon Navada · Client, Niiplants and Car Rentals
            </p>
            <span className="inline-block h-px w-8 bg-accent-500" aria-hidden="true" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
