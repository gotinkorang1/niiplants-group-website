import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/container";
import { CountUp } from "@/components/site/count-up";

// Figures supplied in the client brief — see docs/04-content.md for the
// no-invented-statistics rule; these are client-provided.
const stats: Array<
  | { kind: "count"; value: number; suffix?: string; label: string }
  | { kind: "static"; value: string; label: string }
> = [
  { kind: "count", value: 8, suffix: "+", label: "Companies across mobility, hospitality & business services" },
  { kind: "count", value: 1000, suffix: "+", label: "Happy customers served across the group" },
  { kind: "static", value: "24/7", label: "Customer support across our companies" },
  { kind: "static", value: "Nationwide", label: "Operations across Ghana" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-line-200 bg-paper-50">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:h-[calc(100%-0.75rem)] before:w-0.5 before:rounded-full before:bg-accent-500/60"
            >
              <p className="font-display text-h1 text-ink-900 tabular-nums">
                {stat.kind === "count" ? (
                  <CountUp value={stat.value} suffix={stat.suffix ?? ""} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="mt-2 text-sm text-ink-500">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
