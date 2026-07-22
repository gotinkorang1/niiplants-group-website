import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/container";
import { DarkSurfaceDecor } from "@/components/site/dark-surface";

export function CtaBand() {
  return (
    <section className="bg-noise relative overflow-hidden bg-gradient-to-br from-ink-900 via-[#101b30] to-ink-700 text-paper-0">
      <DarkSurfaceDecor />
      <Container className="relative z-10 py-20 md:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-h2 font-display text-balance">Work with Nii Plants Group</h2>
            <p className="mt-3 max-w-lg text-paper-0/80">
              Reach the right company directly, or get in touch with the
              group for partnership and career enquiries.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="btn-sheen">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-paper-0/70 text-paper-0 hover:bg-paper-0 hover:text-ink-900"
            >
              <Link href="/careers">Careers</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
