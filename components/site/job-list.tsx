"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { Briefcase, CalendarDays, MapPin, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface JobCard {
  id: string;
  slug: string;
  title: string;
  companyLabel: string;
  location: string;
  employmentLabel: string;
  closingDate?: string;
  summary: string;
  description?: PortableTextBlock[];
}

/** Vacancy list — each role expands in place with its full description. */
export function JobList({ jobs }: { jobs: JobCard[] }) {
  const [open, setOpen] = React.useState<string | null>(jobs[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job, index) => {
        const isOpen = open === job.id;
        return (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "overflow-hidden rounded-lg border bg-paper-0 transition-colors duration-300",
              isOpen ? "border-accent-700/40" : "border-line-200",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`job-${job.id}`}
              onClick={() => setOpen(isOpen ? null : job.id)}
              className="flex w-full items-start justify-between gap-6 p-6 text-left md:p-7"
            >
              <span className="min-w-0">
                <span className="block font-display text-h3 text-ink-900">{job.title}</span>
                <span className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="size-4 text-accent-700" aria-hidden="true" />
                    {job.companyLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-accent-700" aria-hidden="true" />
                    {job.location}
                  </span>
                  <span className="rounded-full border border-line-200 px-2.5 py-0.5 text-xs uppercase tracking-wider">
                    {job.employmentLabel}
                  </span>
                  {job.closingDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-accent-700" aria-hidden="true" />
                      Closes {job.closingDate}
                    </span>
                  )}
                </span>
                <span className="mt-3 block text-ink-500">{job.summary}</span>
              </span>
              <Plus
                className={cn(
                  "mt-1 size-5 shrink-0 text-ink-500 transition-transform duration-300",
                  isOpen && "rotate-45 text-accent-700",
                )}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`job-${job.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-line-200 px-6 py-6 md:px-7">
                    {job.description && (
                      <div className="prose-none flex flex-col gap-4 text-ink-700 [&_h3]:mt-4 [&_h3]:text-h3 [&_h3]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium">
                        <PortableText value={job.description} />
                      </div>
                    )}
                    <Button asChild className="btn-sheen mt-7">
                      <a
                        href={`mailto:info@niiplantsghana.com?subject=${encodeURIComponent(
                          `Application: ${job.title}`,
                        )}`}
                      >
                        Apply for this role
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
