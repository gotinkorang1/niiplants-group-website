import { Hero } from "@/components/site/hero";
import { LogoStrip } from "@/components/site/logo-strip";
import { SectorShowcase } from "@/components/site/sector-showcase";
import { Industries } from "@/components/site/industries";
import { ImageBand } from "@/components/site/image-band";
import { PillarCallouts } from "@/components/site/pillar-callouts";
import { MediaShowcase } from "@/components/site/media-showcase";
import { Clients } from "@/components/site/clients";
import { NewsTeaser } from "@/components/site/news/news-teaser";
import { CtaBand } from "@/components/site/cta-band";
import { videosForPage, videoJsonLd } from "@/lib/videos";

export default function Home() {
  const videoLd = videosForPage("/").map(videoJsonLd);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />
      <Hero />
      <LogoStrip />
      <SectorShowcase />
      <ImageBand
        src="/photos/logistics-port.jpg"
        alt="Cargo port at sunset with trucks and freight aircraft"
        eyebrow="Scale"
        title="Operating where Ghana's business moves."
        body="Fleets on the road, goods through the ports, guests in our residences — our companies keep organisations moving every day."
        cta={{ href: "/about", label: "About the Group" }}
      />
      <Industries />
      <PillarCallouts />
      <MediaShowcase />
      <Clients />
      <NewsTeaser />
      <CtaBand />
    </>
  );
}
