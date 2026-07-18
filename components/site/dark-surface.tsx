import { cn } from "@/lib/utils";

/**
 * Shared decorative backdrop for dark surfaces (hero, page heroes, CTA
 * bands): deep ink gradient + fine grid + drifting aurora glows + grain.
 * Pure CSS/SVG — no image weight, honors prefers-reduced-motion globally.
 */
export function DarkSurfaceDecor({
  tint,
  className,
}: {
  /** Optional sector tint token suffix — adds a subtle brand-colored glow. */
  tint?: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="aurora aurora-gold -top-32 -right-24 size-[480px]" />
      <div className="aurora aurora-blue -bottom-48 -left-32 size-[560px]" />
      {tint && (
        <div
          className="aurora -bottom-24 right-1/4 size-[420px] opacity-60"
          style={{
            background: `radial-gradient(circle, color-mix(in srgb, var(--color-sector-${tint}) 55%, transparent), transparent 65%)`,
            animation: "aurora-drift 20s ease-in-out infinite alternate",
          }}
        />
      )}
      {/* Bottom scrim so foreground text always clears contrast. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/60 to-transparent" />
    </div>
  );
}
