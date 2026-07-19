"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { companiesByGroup, companyGroups } from "@/lib/companies";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/careers", label: "Careers" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [companiesOpen, setCompaniesOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!mobileOpen && !companiesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      setCompaniesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, companiesOpen]);

  const solid = scrolled || mobileOpen || companiesOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        solid
          ? "bg-paper-0/85 backdrop-blur-md border-b border-line-200 shadow-[0_1px_16px_rgba(11,18,32,0.05)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logo/niiplants-group-emblem.png"
            alt=""
            width={106}
            height={44}
            priority
            className="h-10 w-auto md:h-11"
          />
          <span
            className={cn(
              "text-h3 font-display transition-colors duration-300",
              solid ? "text-ink-900" : "text-paper-0",
            )}
          >
            Niiplants Group
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setCompaniesOpen(true)}
            onMouseLeave={() => setCompaniesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 text-base py-8 transition-colors duration-300",
                solid ? "text-ink-900" : "text-paper-0",
              )}
              aria-expanded={companiesOpen}
              aria-haspopup="true"
              onClick={() => setCompaniesOpen((open) => !open)}
            >
              Companies
              <ChevronDown className="size-4" aria-hidden="true" />
            </button>

            <AnimatePresence>
            {companiesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 6, x: "-50%" }}
                transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute left-1/2 top-full w-[640px] rounded-md border border-line-200 bg-paper-0 p-8 shadow-floating"
              >
                <div className="grid grid-cols-3 gap-8">
                  {companyGroups.map((group) => (
                    <div key={group.id}>
                      <p className="text-label uppercase tracking-wide text-ink-500 mb-3">
                        {group.label}
                      </p>
                      <ul className="flex flex-col gap-3">
                        {companiesByGroup(group.id).map((company) => (
                          <li key={company.slug}>
                            <Link
                              href={`/companies/${company.slug}`}
                              className="group block"
                              onClick={() => setCompaniesOpen(false)}
                            >
                              <span className="block text-sm text-ink-700 group-hover:text-accent-700">
                                {company.name}
                              </span>
                              <span className="mt-0.5 block text-xs text-ink-500">
                                {company.sector}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-line-200 pt-4">
                  <Link
                    href="/companies"
                    className="text-sm font-medium text-accent-700 hover:underline"
                    onClick={() => setCompaniesOpen(false)}
                  >
                    View all companies →
                  </Link>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "link-underline text-base transition-colors duration-300",
                solid ? "text-ink-900" : "text-paper-0",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "lg:hidden flex size-11 items-center justify-center transition-colors duration-300",
            solid ? "text-ink-900" : "text-paper-0",
          )}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <Container className="pb-8 max-h-[calc(100dvh-5rem)] overflow-y-auto">
              <MobileCompaniesAccordion onNavigate={() => setMobileOpen(false)} />
              <div className="mt-2 flex flex-col">
                {primaryLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.08 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex min-h-12 items-center border-t border-line-200 text-base text-ink-900"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Button asChild className="btn-sheen mt-6 w-full">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Contact
                </Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileCompaniesAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-t border-line-200">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-base text-ink-900"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        Companies
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="pb-4 flex flex-col gap-6">
          {companyGroups.map((group) => (
            <div key={group.id}>
              <p className="text-label uppercase tracking-wide text-ink-500 mb-2">
                {group.label}
              </p>
              <ul className="flex flex-col gap-2">
                {companiesByGroup(group.id).map((company) => (
                  <li key={company.slug}>
                    <Link
                      href={`/companies/${company.slug}`}
                      className="flex min-h-10 items-center gap-1 text-sm text-ink-700"
                      onClick={onNavigate}
                    >
                      {company.name}
                      {company.pageType === "external" && (
                        <ArrowUpRight className="size-3.5 text-ink-500" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
