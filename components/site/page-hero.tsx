import { Container } from "@/components/site/container";
import { DarkSurfaceDecor } from "@/components/site/dark-surface";
import { Reveal } from "@/components/site/reveal";

/**
 * Interior-page hero — shorter dark band (docs/06-components.md,
 * "Subsidiary hero"): eyebrow label, display headline, optional lede.
 * Optionally tinted with a sector accent glow.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  tint,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Sector tint token suffix for a subtle brand-colored glow. */
  tint?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-noise relative overflow-hidden bg-gradient-to-br from-ink-900 via-[#101b30] to-ink-700 text-paper-0">
      <DarkSurfaceDecor tint={tint} />
      <Container className="relative z-10 pb-12 pt-32 md:pb-20 md:pt-44">
        <Reveal>
          {eyebrow && (
            <p className="text-label uppercase tracking-wide text-paper-0/70 mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-accent-500" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-h1 font-display max-w-3xl text-balance">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-body-lg text-paper-0/80">{lede}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
