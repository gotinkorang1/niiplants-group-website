# Roadmap

## Confirmed stack

- **Framework**: Next.js 15 (App Router) — SSG/ISR for fast, SEO-friendly
  pages; per-company dynamic routing (`/companies/[sector]/`).
- **Styling**: Tailwind CSS, configured directly from the tokens in
  [03-design-system.md](03-design-system.md) (colors, spacing, type scale
  as theme extensions — not ad hoc utility values).
- **UI components**: shadcn/ui as the base primitive layer (button, card,
  form fields, accordion, dialog/lightbox), restyled to the design system
  rather than used with its default look.
- **Animations**: Framer Motion, implementing the tokens/rules in
  [08-animation.md](08-animation.md) (durations, easings, reduced-motion
  handling).
- **Icons**: Lucide — used sparingly per the "avoid icon-as-decoration"
  guidance in [02-brand-guidelines.md](02-brand-guidelines.md).
- **CMS**: Sanity or Strapi — optional, deferred. v1 ships with
  developer-maintained content (MDX/local data); revisit once the client
  confirms who maintains Newsroom/company content post-launch (open
  decision #3 below).
- **Hosting**: Vercel.
- **Forms**: React Hook Form + Resend, for Contact and the 3 full-page
  companies' enquiry forms (Plantsville, NPL Automobile, Papersource — see
  [05-pages.md](05-pages.md)).
- **Maps**: Google Maps, for location on Contact and Plantsville Residences.
- **Images**: Cloudinary for asset hosting/transforms, delivered through
  `next/image` for responsive/format optimization (feeds directly into the
  CWV targets in [07-seo.md](07-seo.md)).
- **SEO**: Next.js Metadata API for per-page metadata, Open Graph, and
  canonical tags (see [07-seo.md](07-seo.md)).

## Phase 0 — Discovery & content foundation (current phase)

- [x] Planning docs drafted (this folder).
- [ ] Client review of docs 01–08 — resolve all `[TBD]` markers (legal
  facts, figures, brand assets, exact service areas, CMS preference,
  booking-integration needs).
- [ ] Collect real photography or commission a shoot — no placeholder
  stock imagery should ship in the final build.
- [ ] Collect/confirm logo files and any existing brand color values.

## Phase 1 — Design system & homepage

- [ ] Scaffold Next.js 15 project (App Router, TypeScript, Tailwind,
  shadcn/ui, Framer Motion, Lucide).
- [ ] Implement design tokens (color, type, spacing) from
  [03-design-system.md](03-design-system.md) as Tailwind theme
  extensions — no ad hoc hex/pixel values in components.
- [ ] Build shared components: header/nav (incl. mega-menu), footer,
  button, card, hero, external-link CTA — per
  [06-components.md](06-components.md), on top of shadcn/ui primitives.
- [ ] Build the homepage end-to-end using real (or best-available
  interim) content from [04-content.md](04-content.md).
- [ ] Accessibility pass on Phase 1 components (keyboard, focus, contrast)
  before moving on — cheaper to fix in the shared components than to
  retrofit 8 company pages later.

## Phase 2 — Subsidiary pages

- [ ] Build the single subsidiary page template
  ([05-pages.md](05-pages.md)) driven by per-sector content/data.
- [ ] Populate all 8 subsidiary pages.
- [ ] Resolve booking/transaction integration question per subsidiary
  (link-out vs embed vs contact-form-only) before finalizing each page's
  CTA.

## Phase 3 — Remaining pages

- [ ] About, Companies index, Newsroom (+ article template), Careers,
  Contact, legal pages.

## Phase 4 — SEO, performance, accessibility QA

- [ ] Structured data implementation + validation
  ([07-seo.md](07-seo.md)).
- [ ] Sitemap/robots.txt, meta tags across all templates.
- [ ] Core Web Vitals audit on real hosting with real imagery.
- [ ] Full WCAG 2.1 AA pass across all page templates.
- [ ] Cross-browser/cross-device QA (mobile-first per
  [CLAUDE.md](../CLAUDE.md)).

## Phase 5 — Launch

- [ ] DNS/hosting cutover.
- [ ] Submit sitemap to Search Console/Bing Webmaster Tools.
- [ ] Set up/verify Google Business Profiles for group and physical
  subsidiary locations.
- [ ] Analytics + monitoring in place before traffic arrives.

## Open decisions blocking full plan confidence

**Resolved**: site architecture is **hub-and-spoke** — overview + link-out
pages for the 5 companies with existing sites (Nii Plants and Car Rentals,
Nii Plants Logistics, Trivoxo, Puffs Ghana, Plants Greene Leasing), full
self-contained pages for the 3 that don't (Plantsville Residences, NPL
Automobile, Papersource). See [05-pages.md](05-pages.md).

Still open — flagged inline in the relevant doc:
1. Legal/factual details of the group and remaining subsidiary facts (01)
   — e.g. group HQ address vs. Plantsville's address, founding year,
   headcount.
2. Brand assets — **partially resolved**: real logos have been seen (as
   pasted chat images) for Trivoxo, Nii Plants Logistics, Plants Greene
   Leasing, Plantsville Residences, NPL Automobile, and Puffs Ghana, and
   their colors are now reflected in [03-design-system.md](03-design-system.md)
   and `app/globals.css` — but only eyeballed, not pixel-sampled. **Still
   need**: (a) the actual image files at production resolution (SVG or
   transparent PNG), since pasted chat images can't be placed into the
   codebase directly; (b) logos for Nii Plants and Car Rentals and
   Papersource, not yet seen in any form; (c) the Nii Plants Group master
   logo itself — still undefined.
3. Placement of real logos in the built site depends on (2) landing as
   actual files — send them individually (e.g. via a shared drive link, or
   dropped straight into `public/logos/` on the machine running this
   session) rather than pasted into chat.
4. CMS vs. developer-maintained content (this file).
5. Enquiry mechanism for the 3 full-page companies — form, phone,
   WhatsApp? (05).
6. Careers: ATS integration vs. simple contact pattern (05).
7. Exact service areas/cities per subsidiary, for local SEO copy (07).
8. **Confirm [puffghana.com](https://puffghana.com/) is currently live**
   — it didn't load during my check.
9. **Confirm content on [trivoxogh.com](https://trivoxogh.com/)** — it's
   behind a Cloudflare bot-check that blocked automated review; someone
   should check it manually.
10. **Clean up [niiplantslogistics.com](https://niiplantslogistics.com/)**
    — currently injected with spam links, needs a WordPress security
    clean-up before the group site links to it (see
    [07-seo.md](07-seo.md)).
11. Plantsville Residences' exact 5-unit room mix — client input was
    ambiguous ("Two of the one bedroom, Two of the one bedroom and One
    Standard room"); confirm the real breakdown before publishing (04).
