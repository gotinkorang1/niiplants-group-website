import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Company } from "@/lib/companies";
import { companyDetails } from "@/lib/company-content";

/** "Plantsville Residences" → "PR". */
function monogram(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

/**
 * Company card — photographic header with the company logo floated over it,
 * sector tint, and an arrow affordance. One component shared by the
 * homepage showcase and the companies index (docs/06-components.md).
 */
export function CompanyCard({
  company,
  size = "default",
  className,
}: {
  company: Company;
  /** "large" adds the sector label and more generous padding. */
  size?: "default" | "large";
  className?: string;
}) {
  const image = companyDetails[company.slug]?.heroImage;
  const large = size === "large";

  return (
    <Link
      href={`/companies/${company.slug}`}
      className={cn(
        "card-lift group relative flex h-full flex-col overflow-hidden rounded-lg border border-line-200 bg-paper-0",
        className,
      )}
    >
      {/* Photo header */}
      <div className={cn("relative overflow-hidden bg-ink-900", large ? "aspect-[16/9]" : "aspect-[16/10]")}>
        {image ? (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 370px"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          // No photography yet: a branded plate lit by the sector tint, never an empty box.
          <div className="absolute inset-0 bg-ink-900 bg-grid-dark" aria-hidden="true">
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background: `radial-gradient(110% 90% at 85% 10%, color-mix(in srgb, var(--color-sector-${company.tint}) 75%, transparent), transparent 70%)`,
              }}
            />
            <span className="absolute right-6 top-4 font-display text-[5.5rem] leading-none text-paper-0/25 transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]">
              {monogram(company.name)}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent"
          aria-hidden="true"
        />
        {/* Sector tint bar — grows on hover. */}
        <span
          className="absolute inset-x-0 bottom-0 h-1 origin-left transition-transform duration-500 ease-out group-hover:scale-y-[2]"
          style={{ backgroundColor: `var(--color-sector-${company.tint})` }}
          aria-hidden="true"
        />
        {/* Logo chip */}
        {company.logo && (
          <span className="absolute bottom-4 left-4 flex h-11 items-center rounded-md bg-paper-0/95 px-3 shadow-floating backdrop-blur-sm">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={88}
              height={36}
              className="max-h-8 w-auto max-w-[5.5rem] object-contain"
            />
          </span>
        )}
      </div>

      {/* Body */}
      <div className={cn("flex flex-1 flex-col", large ? "p-7" : "p-6")}>
        <p className="text-label uppercase tracking-wider text-ink-500">{company.sector}</p>
        <h3 className={cn("mt-2 font-display text-ink-900", large ? "text-h3" : "text-lg leading-snug")}>
          {company.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{company.descriptor}</p>

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-sm font-medium text-accent-700">
            {company.pageType === "external" ? "View company" : "Learn more"}
          </span>
          <span className="flex size-9 items-center justify-center rounded-full border border-line-200 text-ink-500 transition-all duration-300 group-hover:border-accent-700 group-hover:bg-accent-700 group-hover:text-paper-0">
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
