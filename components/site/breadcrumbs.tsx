import Link from "next/link";

import { Container } from "@/components/site/container";

/** Breadcrumb trail — subsidiary and article pages only (docs/06-components.md). */
export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line-200 bg-paper-50">
      <Container>
        <ol className="flex flex-wrap items-center gap-2 py-3 text-sm text-ink-500">
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-accent-700">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink-700">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
