# 07 — SEO

## Strategic context

This site needs to rank for two very different query types simultaneously:
1. **Group/brand queries** — "Nii Plants Group," "Niiplants Ghana."
2. **Category + local queries** per subsidiary — "car rental Accra," "logistics
   company Ghana," "office supplies Accra," etc. — where the site is
   competing against category specialists, not other conglomerates.

The URL structure in [05-pages.md](05-pages.md)
(`/companies/[sector]/`) is chosen specifically so each subsidiary page can
independently rank for its category query while still inheriting domain
authority from the group site — a single strong domain beats 8 fragmented
microsites.

## Technical SEO checklist

- **Meta titles**: `{Subsidiary Name} | Nii Plants Group` pattern for
  subsidiary pages (e.g. "Car Rentals | Nii Plants Group"); group pages use
  `{Page} | Nii Plants Group`. Keep under 60 characters.
- **Meta descriptions**: unique per page, derived from the one-sentence
  descriptors in [04-content.md](04-content.md), under 155 characters,
  written to be clicked (include the category + location), not just
  descriptive.
- **Canonical URLs** on every page (self-referencing by default).
- **Open Graph / Twitter Card** tags on every page: title, description,
  a real photo (not the logo) as `og:image`, sized 1200×630.
- **XML sitemap** (`/sitemap.xml`) auto-generated, submitted to Google
  Search Console and Bing Webmaster Tools at launch.
- **robots.txt** allowing full crawl; disallow only genuinely private
  routes (none currently planned).
- **Heading hierarchy**: exactly one `<h1>` per page (the hero headline);
  logical `h2`/`h3` nesting for sections — never skip levels or use
  headings for visual styling alone.
- **Alt text**: descriptive, specific alt text on every content image
  ("Niiplants fleet vehicle at Accra depot," not "car"); `alt=""` for
  purely decorative images.
- **Internal linking**: every subsidiary page links to at least one
  sibling (per cross-linking logic in
  [04-content.md](04-content.md)) and back to `/companies/` — avoids
  orphaned pages and spreads link equity across the group.

## Structured data (schema.org / JSON-LD)

- **Organization** schema on the homepage — group name, logo, URL,
  `sameAs` social links, `subOrganization` entries pointing to each
  subsidiary if modeled as separate legal entities (confirm with client).
- **LocalBusiness** (or the more specific subtype — `AutoRental`,
  `LodgingBusiness`, `TravelAgency`, `AutomotiveBusiness`,
  `FoodEstablishment` where applicable) on each subsidiary page, with
  address, phone, and `parentOrganization` referencing the group.
- **BreadcrumbList** matching the visible breadcrumb component on
  subsidiary and article pages.
- **Article** schema on Newsroom posts (headline, datePublished, author,
  image).
- Validate every template with Google's Rich Results Test before launch.

## Local SEO (Ghana-specific)

- **Google Business Profile** for the group and, where they have distinct
  physical locations, for individual subsidiaries (e.g. a hotel property,
  a car rental depot) — out of scope for this site build but the site
  should link out to/embed these once created.
- Ensure NAP (Name, Address, Phone) consistency between the site's Contact
  page, footer, and any Business Profile listings — inconsistent NAP data
  is one of the most common local-SEO failures for multi-location
  businesses.
- Location-aware copy on subsidiary pages ("serving Accra and Kumasi," or
  whichever cities actually apply — **[TBD — client input]** on exact
  service areas per subsidiary).

## Keyword direction (to validate with real keyword research before launch)

| Company | Example target queries |
|---|---|
| Nii Plants and Car Rentals | "car rental Accra," "corporate car hire Ghana," "rent a car Ghana daily/weekly" |
| Plantsville Residences | "serviced apartment Dansoman," "short stay apartment Accra" |
| Nii Plants Logistics | "logistics company Ghana," "freight haulage Accra" |
| Trivoxo Limited Company | "travel agency Ghana," "flight ticketing Accra," "tour operator Ghana" |
| NPL Automobile | "car servicing Accra," "vehicle repair Ghana" |
| Puffs Ghana | "restaurant [city/area] Ghana" — needs the actual cuisine/location once the site is verified |
| Plants Greene Leasing | "corporate fleet leasing Ghana," "long-term car lease Accra" |
| Papersource | "office supplies Accra," "stationery supplier Ghana" |

This table is a starting hypothesis, not final keyword strategy — validate
against actual search volume/competition data before content is finalized.

## Duplicate-content risk (hub-and-spoke architecture)

Because 5 companies already have live sites, the group site's overview
pages for them will inevitably cover similar ground (same company, same
services). To avoid Google treating the group page and the existing site
as duplicate/thin content:

- Write each group-site overview distinctly — a summary in the group's own
  voice, not copy-pasted from the existing site.
- Keep the existing site as the canonical source for full service detail,
  pricing, and booking — the group page should feel like a trustworthy
  "front door," not a competing copy.
- Do **not** `rel="canonical"` the group overview page to the external
  domain (they're different sites, that tag is same-site only) — instead
  rely on distinct content plus a clear, crawlable external link so search
  engines understand the relationship contextually.
- The external link on type-A pages (see
  [06-components.md](06-components.md)) should be a normal followed link
  (no `nofollow`) since these are the client's own properties — this
  passes authority from the strong group domain to the existing sites,
  which is a net SEO benefit for all of them.

## Pre-launch cleanup item

[niiplantslogistics.com](https://niiplantslogistics.com/) is currently
injected with unrelated spam links (gambling/"slot" sites) — a sign of a
compromised WordPress install. Before the group site links to it:
1. The hosting/CMS owner should clean the infection and update WordPress
   core/plugins/themes.
2. Request re-indexing in Google Search Console once cleaned, since spam
   injection commonly triggers a manual action or ranking penalty that
   won't lift on its own after cleanup.
3. Hold off adding the outbound link from the group site's Logistics
   overview page until this is confirmed resolved, so the group domain's
   own SEO reputation isn't linked to an actively spammed site.

## Performance targets (Core Web Vitals)

Premium photography and Core Web Vitals are in tension by default — this
must be solved with image pipeline discipline, not by using worse imagery:

- **LCP** (Largest Contentful Paint): < 2.5s — hero images served via a
  modern format (AVIF/WebP with fallback), responsive `srcset`, and
  priority/preload hints on the hero image only.
- **CLS** (Cumulative Layout Shift): < 0.1 — explicit width/height (or
  `aspect-ratio`) on every image and embed so nothing reflows on load.
- **INP** (Interaction to Next Paint): < 200ms.
- Hero background video (if used) must be short, muted, `playsinline`,
  compressed aggressively, and lazy-loaded behind a poster image — never
  autoplay a large uncompressed video file.
- Fonts: self-hosted, `font-display: swap`, no more than 2 families ×
  2–3 weights loaded (see [02-brand-guidelines.md](02-brand-guidelines.md)).

## Content/SEO ongoing

- Newsroom functions as the primary ongoing SEO content engine — regular
  posts tagged by subsidiary keep both group and category pages fresh in
  search.
- Re-audit meta titles/descriptions and structured data any time page
  content changes materially.
