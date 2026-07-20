import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/site/container";
import { Wordmark } from "@/components/site/wordmark";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/site/social-icons";
import { companies } from "@/lib/companies";
import { socialLinks } from "@/lib/site";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
};

const groupLinks = [
  { href: "/about", label: "About the Group" },
  { href: "/companies", label: "Our Companies" },
  { href: "/gallery", label: "Gallery" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

export function Footer() {
  return (
    <footer className="relative bg-ink-900 text-paper-0">
      {/* Gold hairline divider. */}
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-accent-500/70 to-transparent"
        aria-hidden="true"
      />

      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-12 md:py-24">
        <div className="col-span-2 md:col-span-4">
          <Wordmark stacked className="max-w-[13rem] text-paper-0" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper-0/70">
            A diversified Ghanaian business group in mobility, hospitality,
            and business services — eight companies, one standard of
            reliability.
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-sm text-paper-0/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-500" aria-hidden="true" />
              Dansoman, Accra, Ghana
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent-500" aria-hidden="true" />
              030 244 1805 · 059 383 5941
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent-500" aria-hidden="true" />
              <a href="mailto:rental@niiplantsghana.com" className="hover:text-accent-500">
                rental@niiplantsghana.com
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.name];
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Niiplants Group on ${social.name} (opens in a new tab)`}
                    className="flex size-10 items-center justify-center rounded-full border border-paper-0/20 text-paper-0/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500 hover:bg-accent-700 hover:text-paper-0"
                  >
                    {Icon && <Icon className="size-4" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-label uppercase tracking-wide text-paper-0/60 mb-4">Group</p>
          <ul className="flex flex-col gap-3">
            {groupLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-paper-0/85 transition-colors hover:text-accent-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-label uppercase tracking-wide text-paper-0/60 mt-8 mb-4">Legal</p>
          <ul className="flex flex-col gap-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-paper-0/85 transition-colors hover:text-accent-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-6">
          <p className="text-label uppercase tracking-wide text-paper-0/60 mb-4">Companies</p>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {companies.map((company) => (
              <li key={company.slug}>
                <Link
                  href={`/companies/${company.slug}`}
                  className="group flex items-center gap-1 text-sm text-paper-0/85 transition-colors hover:text-accent-500"
                >
                  {company.name}
                  {company.pageType === "external" && (
                    <ArrowUpRight
                      className="size-3 text-paper-0/40 transition-colors group-hover:text-accent-500"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-paper-0/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-sm text-paper-0/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Niiplants Group. All rights reserved.</p>
          <p className="text-paper-0/40">Mobility · Hospitality · Business Services</p>
        </Container>
      </div>
    </footer>
  );
}
