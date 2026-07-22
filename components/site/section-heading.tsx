import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

/**
 * Shared section heading — eyebrow with gold rule, display title, optional
 * lede. Keeps the typographic rhythm identical across every section
 * instead of each one re-inventing spacing.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  /** "light" = on paper backgrounds, "dark" = on ink backgrounds. */
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-label uppercase tracking-[0.24em] mb-5 flex items-center gap-3",
            centered && "justify-center",
            tone === "dark" ? "text-paper-0/70" : "text-accent-700",
          )}
        >
          <span
            className={cn("inline-block h-px w-10", tone === "dark" ? "bg-accent-500" : "bg-accent-700")}
            aria-hidden="true"
          />
          {eyebrow}
          {centered && (
            <span
              className={cn("inline-block h-px w-10", tone === "dark" ? "bg-accent-500" : "bg-accent-700")}
              aria-hidden="true"
            />
          )}
        </p>
      )}
      <h2
        className={cn(
          "text-h2 font-display text-balance tracking-tight",
          tone === "dark" ? "text-paper-0" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-body-lg",
            tone === "dark" ? "text-paper-0/80" : "text-ink-500",
          )}
        >
          {lede}
        </p>
      )}
      {children}
    </Reveal>
  );
}
