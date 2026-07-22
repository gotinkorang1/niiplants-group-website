import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { LiteYouTube } from "@/components/site/lite-youtube";
import { RouteNetworkArt } from "@/components/site/brand-art";

/** Uploads playlist of the Nii Plants Car Rentals YouTube channel. */
export const NIIPLANTS_UPLOADS_PLAYLIST = "UUgqE5Gwju32f7Quf6P0-DFg";

export function MediaShowcase() {
  return (
    <section className="border-y border-line-200 bg-paper-50 py-24 md:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-label uppercase tracking-wide text-accent-700 mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent-700" aria-hidden="true" />
            Inside the group
          </p>
          <h2 className="text-h2 font-display text-ink-900 text-balance">
            See our companies at work.
          </h2>
          <p className="mt-4 text-body-lg text-ink-500">
            Real vehicles, real journeys, real service — straight from the
            Nii Plants Car Rentals channel.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <LiteYouTube
              playlistId={NIIPLANTS_UPLOADS_PLAYLIST}
              title="Nii Plants Car Rentals — latest from the fleet"
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative">
              <RouteNetworkArt mode="light" className="mx-auto max-w-sm" />
            </div>
            <p className="mt-6 text-ink-500">
              From Accra outward — our fleets, residences, and logistics
              network keep people and goods moving across Ghana every day.
            </p>
            <a
              href="https://www.youtube.com/@niiplantscarrental867"
              target="_blank"
              rel="noopener"
              className="link-underline mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-700"
            >
              Visit our YouTube channel
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
