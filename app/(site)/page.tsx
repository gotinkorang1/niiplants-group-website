import { Hero } from "@/components/site/hero";
import { StatsStrip } from "@/components/site/stats-strip";
import { LogoStrip } from "@/components/site/logo-strip";
import { SectorShowcase } from "@/components/site/sector-showcase";
import { Industries } from "@/components/site/industries";
import { PillarCallouts } from "@/components/site/pillar-callouts";
import { MediaShowcase } from "@/components/site/media-showcase";
import { Clients } from "@/components/site/clients";
import { CtaBand } from "@/components/site/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <LogoStrip />
      <SectorShowcase />
      <Industries />
      <PillarCallouts />
      <MediaShowcase />
      <Clients />
      <CtaBand />
    </>
  );
}
