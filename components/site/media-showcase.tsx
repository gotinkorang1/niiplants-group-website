import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { LiteYouTube } from "@/components/site/lite-youtube";
import { VideoPlayer } from "@/components/site/video-player";

/** Uploads playlist of the Nii Plants Car Rentals YouTube channel. */
export const NIIPLANTS_UPLOADS_PLAYLIST = "UUgqE5Gwju32f7Quf6P0-DFg";

export function MediaShowcase() {
  return (
    <section className="border-y border-line-200 bg-paper-50 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Inside the group"
          title="See our companies at work."
          lede="Real vehicles, real journeys, real service — from our fleet expansion to the teams who keep it running."
        />

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Feature film — self-hosted group video (metadata in lib/videos.ts). */}
          <Reveal className="lg:col-span-7">
            <VideoPlayer
              src="/video/fleet-story.mp4"
              poster="/video/fleet-story-poster.jpg"
              title="Growing the Nii Plants fleet — new coaster buses"
              caption="Our team at the handover of new coaster buses — investing in the fleet that moves our clients every day."
            />
          </Reveal>

          {/* Channel */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <LiteYouTube
              playlistId={NIIPLANTS_UPLOADS_PLAYLIST}
              title="Nii Plants Car Rentals — latest from the fleet"
            />
            <p className="mt-5 text-ink-500">
              More from the road: vehicle walkarounds, client journeys, and
              updates from across the group.
            </p>
            <a
              href="https://www.youtube.com/@niiplantscarrental867"
              target="_blank"
              rel="noopener"
              className="link-underline mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-700"
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
