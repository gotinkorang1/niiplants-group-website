import {
  Building2,
  Car,
  KeyRound,
  Package,
  Plane,
  Truck,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";

const industries = [
  { icon: Car, label: "Transportation", tint: "car-rentals" },
  { icon: Building2, label: "Hospitality & Real Estate", tint: "hospitality" },
  { icon: Truck, label: "Logistics", tint: "logistics" },
  { icon: Plane, label: "Travel", tint: "travel" },
  { icon: Wrench, label: "Automotive", tint: "automotive" },
  { icon: UtensilsCrossed, label: "Food", tint: "food" },
  { icon: KeyRound, label: "Leasing", tint: "leasing" },
  { icon: Package, label: "Procurement", tint: "office" },
];

export function Industries() {
  return (
    <section className="border-y border-line-200 bg-paper-50 py-24 md:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-label uppercase tracking-wide text-accent-700 mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent-700" aria-hidden="true" />
            Industries we serve
          </p>
          <h2 className="text-h2 font-display text-ink-900 text-balance">
            Eight sectors, one accountable partner.
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {industries.map((industry, index) => (
            <li key={industry.label}>
              <Reveal
                delay={index * 0.05}
                className="card-lift group flex h-full flex-col items-start gap-4 rounded-md border border-line-200 bg-paper-0 p-6"
              >
                <span
                  className="flex size-11 items-center justify-center rounded-md transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-sector-${industry.tint}) 12%, transparent)`,
                    color: `var(--color-sector-${industry.tint})`,
                  }}
                  aria-hidden="true"
                >
                  <industry.icon className="size-5" />
                </span>
                <span className="text-sm font-medium text-ink-900">{industry.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
