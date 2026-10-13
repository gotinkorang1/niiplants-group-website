"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { managementTeam, type ManagementProfile } from "@/lib/leadership";

const HASH_PREFIX = "#manager-";

/**
 * Management team: a founder spread, the rest of the team as portrait cards,
 * and full profiles in a native modal dialog. Each profile has a shareable
 * #manager-<slug> link that opens it directly.
 */
export function ManagementTeam() {
  const founder = managementTeam.find((person) => person.featured);
  const team = managementTeam.filter((person) => person !== founder);

  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
  const active = managementTeam.find((person) => person.slug === activeSlug) ?? null;

  const open = React.useCallback((slug: string) => {
    setActiveSlug(slug);
    history.replaceState(null, "", `${HASH_PREFIX}${slug}`);
  }, []);

  const close = React.useCallback(() => {
    setActiveSlug(null);
    if (location.hash.startsWith(HASH_PREFIX)) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }, []);

  // Deep links: /about#manager-<slug> opens that profile.
  React.useEffect(() => {
    const fromHash = () => {
      if (!location.hash.startsWith(HASH_PREFIX)) return;
      const slug = location.hash.slice(HASH_PREFIX.length);
      if (managementTeam.some((person) => person.slug === slug)) setActiveSlug(slug);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <>
      {founder && <FounderSpread person={founder} onOpen={() => open(founder.slug)} />}

      <ul className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {team.map((person, index) => (
          <li key={person.slug} id={`manager-${person.slug}`} className="scroll-mt-28">
            <Reveal delay={index * 0.07} className="h-full">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => open(person.slug)}
                className="card-lift group flex h-full w-full flex-col overflow-hidden rounded-lg border border-line-200 bg-paper-0 text-left"
              >
                <Portrait
                  person={person}
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="aspect-[4/5] w-full"
                  zoom
                />
                <span className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="font-display text-base leading-snug text-ink-900 sm:text-lg">
                    {person.name}
                  </span>
                  <span className="mt-1 text-sm leading-snug text-ink-500">{person.role}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-accent-700">
                    View profile
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <ProfileDialog person={active} onClose={close} />
    </>
  );
}

function FounderSpread({ person, onOpen }: { person: ManagementProfile; onOpen: () => void }) {
  return (
    <div
      id={`manager-${person.slug}`}
      className="mt-14 grid scroll-mt-28 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
        {/* Offset gold frame — a quiet mark of the founder's place. */}
        <div
          className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border border-accent-500/60 sm:translate-x-4 sm:translate-y-4"
          aria-hidden="true"
        />
        <Portrait
          person={person}
          sizes="(min-width: 1024px) 460px, (min-width: 480px) 448px, 100vw"
          className="relative aspect-[4/5] rounded-lg shadow-floating"
        />
      </Reveal>

      <Reveal className="lg:col-span-7" delay={0.08}>
        <p className="text-label uppercase tracking-wide text-accent-700">Founder</p>
        <h3 className="mt-3 text-h1 font-display text-ink-900">{person.name}</h3>
        <p className="mt-2 text-body-lg text-ink-500">{person.role}</p>

        <div className="mt-8 border-l-2 border-accent-500 pl-6">
          <p className="text-body-lg leading-relaxed text-ink-700">{person.bio[1] ?? person.bio[0]}</p>
        </div>

        {person.credentials && (
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-ink-700 sm:grid-cols-2">
            {person.credentials.map((credential) => (
              <CredentialItem key={credential}>{credential}</CredentialItem>
            ))}
          </ul>
        )}

        <Button type="button" variant="secondary" className="mt-10" aria-haspopup="dialog" onClick={onOpen}>
          Read full profile
        </Button>
      </Reveal>
    </div>
  );
}

function ProfileDialog({
  person,
  onClose,
}: {
  person: ManagementProfile | null;
  onClose: () => void;
}) {
  const ref = React.useRef<HTMLDialogElement>(null);

  // Native <dialog> gives us focus trapping, Escape, and focus return for free.
  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (person && !dialog.open) dialog.showModal();
    if (!person && dialog.open) dialog.close();
  }, [person]);

  // Lock page scroll behind the open dialog.
  React.useEffect(() => {
    if (!person) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [person]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="profile-dialog-name"
      onClose={onClose}
      // Clicks on the ::backdrop land on the dialog element itself.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="profile-dialog m-auto w-[min(60rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-hidden rounded-lg bg-paper-0 p-0 text-ink-700 shadow-floating backdrop:bg-ink-900/70 backdrop:backdrop-blur-sm"
    >
      {person && (
        <div className="grid max-h-[calc(100dvh-2rem)] grid-cols-1 md:grid-cols-[2fr_3fr]">
          <Portrait
            person={person}
            sizes="(min-width: 768px) 384px, 100vw"
            className="aspect-[16/11] md:aspect-auto md:h-full"
          />

          <div className="overflow-y-auto p-6 sm:p-10">
            <p className="text-label uppercase tracking-wide text-accent-700">
              {person.featured ? "Founder" : "Management team"}
            </p>
            <h2 id="profile-dialog-name" className="mt-3 text-h2 font-display text-ink-900">
              {person.name}
            </h2>
            <p className="mt-1.5 text-ink-500">{person.role}</p>

            <div className="mt-8 space-y-4 leading-relaxed text-ink-500">
              {person.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {person.credentials && (
              <div className="mt-8 border-t border-line-200 pt-6">
                <p className="text-label uppercase tracking-wide text-ink-500">
                  Credentials &amp; experience
                </p>
                <ul className="mt-4 space-y-3 text-sm text-ink-700">
                  {person.credentials.map((credential) => (
                    <CredentialItem key={credential}>{credential}</CredentialItem>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close profile"
        className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-paper-0/90 text-ink-900 shadow-floating backdrop-blur-sm transition-colors hover:bg-paper-0 hover:text-accent-700"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
    </dialog>
  );
}

function CredentialItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-4 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-accent-500">
      {children}
    </li>
  );
}

/** Portrait photo, or a studio-toned monogram plate that sits naturally beside real photos. */
function Portrait({
  person,
  sizes,
  className,
  zoom,
}: {
  person: ManagementProfile;
  sizes: string;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <span className={cn("relative block overflow-hidden bg-paper-50", className)}>
      {person.image ? (
        <Image
          src={person.image}
          alt={`${person.name}, ${person.role}, Nii Plants Group`}
          fill
          sizes={sizes}
          className={cn(
            "object-cover object-top",
            zoom && "transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]",
          )}
        />
      ) : (
        <span
          role="img"
          aria-label={`${person.name} — portrait coming soon`}
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-paper-0 via-paper-50 to-line-200"
        >
          <span className="font-display text-5xl text-ink-900/80 sm:text-6xl">{person.initials}</span>
          <span className="mt-4 h-px w-10 bg-accent-500" aria-hidden="true" />
        </span>
      )}
    </span>
  );
}
