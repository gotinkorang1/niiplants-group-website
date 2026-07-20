"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category: string;
  categoryLabel: string;
}

/**
 * Filterable gallery with a focus-trapping lightbox (Escape to close,
 * arrow keys to move between photos) — docs/06-components.md, Proof block
 * variant B.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = React.useState("all");
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const categories = React.useMemo(() => {
    const seen = new Map<string, string>();
    for (const item of items) {
      if (!seen.has(item.category)) seen.set(item.category, item.categoryLabel);
    }
    return [{ value: "all", label: "All" }, ...[...seen].map(([value, label]) => ({ value, label }))];
  }, [items]);

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const next = React.useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length],
  );
  const prev = React.useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length],
  );

  React.useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  const active = openIndex === null ? null : visible[openIndex];

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
        {categories.map((c) => (
          <button
            key={c.value}
            type="button"
            aria-pressed={filter === c.value}
            onClick={() => {
              setFilter(c.value);
              setOpenIndex(null);
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
              filter === c.value
                ? "border-ink-900 bg-ink-900 text-paper-0"
                : "border-line-200 text-ink-700 hover:border-ink-500",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Masonry-style columns keep mixed portrait/landscape photos tidy. */}
      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.button
              key={item.src}
              layout
              type="button"
              onClick={() => setOpenIndex(index)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="card-lift group relative block w-full break-inside-avoid overflow-hidden rounded-md border border-line-200 bg-paper-0 text-left"
              aria-label={`View photo: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent px-4 pb-3 pt-10 text-sm text-paper-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.caption}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-paper-0/30 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-900"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 flex size-11 items-center justify-center rounded-full border border-paper-0/30 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-900 md:left-8"
            >
              <ChevronLeft className="size-5" />
            </button>

            <motion.figure
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="max-h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={1600}
                height={1200}
                sizes="(min-width: 1024px) 900px, 100vw"
                className="mx-auto max-h-[78vh] w-auto rounded-lg object-contain"
              />
              <figcaption className="mt-4 text-center text-sm text-paper-0/80">
                {active.caption}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-3 flex size-11 items-center justify-center rounded-full border border-paper-0/30 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-900 md:right-8"
            >
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
