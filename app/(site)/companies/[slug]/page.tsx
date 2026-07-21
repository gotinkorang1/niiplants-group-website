import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { DarkSurfaceDecor } from "@/components/site/dark-surface";
import { LiteYouTube } from "@/components/site/lite-youtube";
import { Faq } from "@/components/site/faq";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal } from "@/components/site/reveal";
import { companies } from "@/lib/companies";
import { getCompanyWithDetail } from "@/lib/company-content";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getCompanyWithDetail(slug);
  if (!data) return {};
  return {
    title: `${data.company.name} — ${data.company.sector}`,
    description: data.company.descriptor,
    keywords: [
      data.company.name,
      `${data.company.sector} Ghana`,
      `${data.company.sector} Accra`,
      "Niiplants Group",
      ...data.detail.services.slice(0, 4).map((s) => `${s} Ghana`),
    ],
    alternates: { canonical: `/companies/${slug}` },
    openGraph: {
      title: `${data.company.name} | Niiplants Group`,
      description: data.company.descriptor,
      url: `/companies/${slug}`,
      type: "website",
    },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCompanyWithDetail(slug);
  if (!data) notFound();

  const { company, detail } = data;
  const isExternal = company.pageType === "external" && company.externalUrl;
  const siblings = detail.crossLinks
    .map((crossSlug) => companies.find((c) => c.slug === crossSlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Companies", item: `${siteUrl}/companies` },
        {
          "@type": "ListItem",
          position: 3,
          name: company.name,
          item: `${siteUrl}/companies/${company.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: company.name,
      description: company.descriptor,
      url: company.externalUrl ?? `${siteUrl}/companies/${company.slug}`,
      parentOrganization: { "@type": "Organization", name: "Niiplants Group", url: siteUrl },
      ...(detail.location
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: detail.location,
              addressLocality: "Accra",
              addressCountry: "GH",
            },
          }
        : {}),
      ...(detail.phones ? { telephone: detail.phones[0] } : {}),
      ...(detail.email ? { email: detail.email } : {}),
    },
    // Service catalogue — surfaces the company's actual offerings to search.
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${company.sector} — ${company.name}`,
      description: detail.intro,
      provider: { "@type": "Organization", name: company.name },
      areaServed: { "@type": "Country", name: "Ghana" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: detail.servicesLabel,
        itemListElement: detail.services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service },
        })),
      },
    },
    // FAQ rich results — eligible for expandable answers in Google.
    ...(detail.faqs
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: detail.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Subsidiary hero — photo-backed band with group endorsement lockup. */}
      <section className="bg-noise relative overflow-hidden bg-gradient-to-br from-ink-900 via-[#101b30] to-ink-700 text-paper-0">
        {detail.heroImage ? (
          <>
            <Image
              src={detail.heroImage.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Scrim — guarantees text contrast over any photo. */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/45"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/40"
              aria-hidden="true"
            />
          </>
        ) : (
          <DarkSurfaceDecor tint={company.tint} />
        )}
        <Container className="relative z-10 pb-12 pt-32 md:pb-20 md:pt-44">
          <Reveal>
            <p className="text-label uppercase tracking-wide text-paper-0/70 mb-4 flex items-center gap-3">
              <span
                className="inline-block h-px w-10"
                style={{ backgroundColor: `var(--color-sector-${company.tint})` }}
                aria-hidden="true"
              />
              Part of Niiplants Group
            </p>
            <h1 className="text-h1 font-display max-w-3xl text-balance">{company.name}</h1>
            <p className="mt-5 max-w-2xl text-body-lg text-paper-0/80">{company.descriptor}</p>
            <div className="mt-8">
              {isExternal ? (
                <Button asChild size="lg" className="btn-sheen">
                  <a href={company.externalUrl} target="_blank" rel="noopener">
                    {detail.ctaLabel}
                    <ArrowUpRight aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" className="btn-sheen">
                  <Link href={`/contact?company=${company.slug}`}>{detail.ctaLabel}</Link>
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/companies", label: "Companies" },
          { label: company.sector },
        ]}
      />

      {/* What we do */}
      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-label uppercase tracking-wide text-accent-700 mb-4">What we do</p>
            <p className="text-h3 font-display text-ink-900 text-balance">{detail.intro}</p>
            {detail.location && (
              <p className="mt-6 text-ink-500">
                <span className="font-medium text-ink-700">Location: </span>
                {detail.location}
              </p>
            )}
            {(detail.phones || detail.email) && (
              <div className="mt-4 flex flex-col gap-1 text-ink-500">
                {detail.phones && (
                  <p>
                    <span className="font-medium text-ink-700">Phone: </span>
                    {detail.phones.join(" / ")}
                  </p>
                )}
                {detail.email && (
                  <p>
                    <span className="font-medium text-ink-700">Email: </span>
                    <a href={`mailto:${detail.email}`} className="hover:text-accent-700">
                      {detail.email}
                    </a>
                  </p>
                )}
              </div>
            )}
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-label uppercase tracking-wide text-ink-500 mb-6">
                {detail.servicesLabel}
              </h2>
            </Reveal>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {detail.services.map((service, index) => (
                <li key={service}>
                  <Reveal
                    delay={index * 0.04}
                    className="flex h-full items-center gap-3 rounded-md border border-line-200 px-5 py-4"
                  >
                    <span
                      className="flex size-6 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `var(--color-sector-${company.tint})` }}
                      aria-hidden="true"
                    >
                      <Check className="size-3.5 text-paper-0" />
                    </span>
                    <span className="text-ink-700">{service}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Video — companies with a YouTube channel. */}
      {detail.youtubePlaylist && (
        <section className="pb-20 md:pb-28">
          <Container>
            <Reveal className="max-w-2xl">
              <h2 className="text-label uppercase tracking-wide text-ink-500 mb-6">
                {company.name} on video
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <LiteYouTube
                playlistId={detail.youtubePlaylist}
                title={`${company.name} — latest videos`}
                className="mx-auto max-w-4xl"
              />
            </Reveal>
            {detail.youtubeChannelUrl && (
              <Reveal delay={0.12} className="mt-5 text-center">
                <a
                  href={detail.youtubeChannelUrl}
                  target="_blank"
                  rel="noopener"
                  className="link-underline inline-flex items-center gap-1 text-sm font-medium text-accent-700"
                >
                  Visit the YouTube channel
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {/* Gallery — real photography where available. */}
      {detail.gallery && (
        <section className="pb-20 md:pb-28">
          <Container>
            <Reveal className="max-w-2xl">
              <h2 className="text-label uppercase tracking-wide text-ink-500 mb-6">In pictures</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {detail.gallery.map((photo, index) => (
                <Reveal key={photo.src} delay={index * 0.08}>
                  <figure className="card-lift group overflow-hidden rounded-md border border-line-200 bg-paper-0">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    {photo.caption && (
                      <figcaption className="px-4 py-3 text-sm text-ink-500">
                        {photo.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Highlights */}
      {detail.highlights && (
        <section className="border-y border-line-200 bg-paper-50 py-16 md:py-20">
          <Container>
            <Reveal>
              <h2 className="text-label uppercase tracking-wide text-ink-500 mb-8">Why {company.name}</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {detail.highlights.map((highlight, index) => (
                <Reveal key={highlight} delay={index * 0.06}>
                  <p className="text-display font-display text-accent-700" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-ink-700">{highlight}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQs */}
      {detail.faqs && (
        <section className="py-20 md:py-28">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-label uppercase tracking-wide text-accent-700 mb-4">
                Frequently asked
              </p>
              <h2 className="text-h2 font-display text-ink-900 text-balance">
                Questions, answered.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <Faq items={detail.faqs} />
            </div>
          </Container>
        </section>
      )}

      {/* Engagement CTA band */}
      <section className="bg-noise relative overflow-hidden bg-gradient-to-br from-ink-900 via-[#101b30] to-ink-700 text-paper-0">
        <DarkSurfaceDecor tint={company.tint} />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-h2 font-display text-balance">
                {isExternal
                  ? `Ready to work with ${company.name}?`
                  : `Get in touch with ${company.name}.`}
              </h2>
              <p className="mt-3 max-w-lg text-paper-0/80">
                {isExternal
                  ? `Bookings and full details live on the ${company.name} website.`
                  : "Send an enquiry through the group and the right person will get back to you."}
              </p>
            </div>
            {isExternal ? (
              <Button asChild size="lg">
                <a href={company.externalUrl} target="_blank" rel="noopener">
                  {detail.ctaLabel}
                  <ArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link href={`/contact?company=${company.slug}`}>{detail.ctaLabel}</Link>
              </Button>
            )}
          </Reveal>
        </Container>
      </section>

      {/* Cross-links to adjacent companies */}
      {siblings.length > 0 && (
        <section className="py-20 md:py-24">
          <Container>
            <Reveal>
              <h2 className="text-label uppercase tracking-wide text-ink-500 mb-8">
                Related companies in the group
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {siblings.map((sibling, index) => (
                <Reveal key={sibling.slug} delay={index * 0.06}>
                  <Link
                    href={`/companies/${sibling.slug}`}
                    className="card-lift group flex h-full flex-col justify-between rounded-md border border-line-200 bg-paper-0 p-6"
                  >
                    <div>
                      <span
                        className="inline-block h-1 w-8 rounded-full"
                        style={{ backgroundColor: `var(--color-sector-${sibling.tint})` }}
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-h3 text-ink-900">{sibling.name}</p>
                      <p className="mt-2 text-sm text-ink-500">{sibling.descriptor}</p>
                    </div>
                    <span className="mt-6 flex items-center gap-1 text-sm font-medium text-accent-700">
                      Learn more
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
