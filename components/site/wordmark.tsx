import { cn } from "@/lib/utils";

/**
 * Typographic brand wordmark — used until an official group logo exists.
 * "NIIPLANTS" inherits the surrounding text color (so the header can switch
 * it white↔ink on scroll); "GROUP" is always the brand gold, letter-spaced.
 */
export function Wordmark({
  stacked = false,
  className,
}: {
  /** Stacked lockup for the footer; inline for the header. */
  stacked?: boolean;
  className?: string;
}) {
  if (stacked) {
    return (
      <span className={cn("block leading-none", className)}>
        <span className="block font-display text-[1.75rem] font-semibold tracking-tight">
          NIIPLANTS
        </span>
        <span className="mt-2 flex items-center gap-2.5" aria-hidden="false">
          <span className="h-px w-6 bg-accent-500/70" aria-hidden="true" />
          <span className="text-[0.8rem] font-medium uppercase tracking-[0.42em] text-accent-500">
            Group
          </span>
          <span className="h-px flex-1 bg-accent-500/70" aria-hidden="true" />
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-2 leading-none", className)}>
      <span className="font-display text-[1.35rem] font-semibold tracking-tight md:text-2xl">
        NIIPLANTS
      </span>
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-accent-500 md:text-xs">
        Group
      </span>
    </span>
  );
}
