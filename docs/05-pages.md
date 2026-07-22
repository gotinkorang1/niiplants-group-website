# 05 — Sitemap & Pages

## Architecture: hub-and-spoke (confirmed)

Five of the eight companies already have their own live websites. Rather
than duplicating their content and booking flows on the group domain, the
group site hosts a shorter **overview page** for each of those five that
sends visitors to the existing site to book/transact. The three companies
with no existing web presence get a **complete, self-contained page** on
the group site instead, since they have nowhere else to send anyone.

| Company | Page type on group site |
|---|---|
| Nii Plants and Car Rentals | Overview → links out to [niiplantsghana.com](https://niiplantsghana.com) |
| Plantsville Residences | Full page (no existing site) |
| Nii Plants Logistics | Overview → links out to [niiplantslogistics.com](https://niiplantslogistics.com/) *(hold this link until the spam-injection issue flagged in [01-project-overview.md](01-project-overview.md) is resolved)* |
| Trivoxo Limited Company | Overview → links out to [trivoxogh.com](https://trivoxogh.com/) |
| NPL Automobile | Full page (no existing site) |
| Puffs Ghana | Overview → links out to [puffghana.com](https://puffghana.com/) *(confirm the domain is currently live before launch — it didn't load during my check)* |
| Plants Greene Leasing | Overview → links out to [plantsgreeneleasing.com](https://plantsgreeneleasing.com/) |
| Papersource | Full page (no existing site) |

## Top-level sitemap

```
/
├── about/                      (Group overview, mission/vision/values, governance)
│   ├── leadership/             (optional, if bios available)
│   └── sustainability/         (optional — common on peer/reference sites)
├── companies/                  (Index — grid of all 8 companies)
│   ├── car-rentals/            (overview + link out — Nii Plants and Car Rentals)
│   ├── plantsville-residences/ (full page)
│   ├── logistics/              (overview + link out — Nii Plants Logistics)
│   ├── travel/                 (overview + link out — Trivoxo Limited Company)
│   ├── automotive/              (full page — NPL Automobile)
│   ├── food/                    (overview + link out — Puffs Ghana)
│   ├── vehicle-leasing/         (overview + link out — Plants Greene Leasing)
│   └── office-supplies/         (full page — Papersource)
├── newsroom/                   (Group news, press, announcements)
│   └── [slug]/                 (individual article)
├── careers/                    (Group-wide careers, culture, open roles if any)
├── contact/                    (Group contact + directory of company contacts)
├── privacy-policy/
└── terms-of-use/
```

Subsidiary pages live under `/companies/[sector]/` (a category slug, not the
literal company name) rather than as top-level routes, so the URL
structure itself communicates "part of the group" and stays stable even if
a company is later rebranded (also better for SEO — see
[07-seo.md](07-seo.md)). The visible company name and branding on the page
is the real one (e.g. "Nii Plants and Car Rentals," "Plants Greene
Leasing") — only the URL slug is generic.

## Page specs

### Home (`/`)
- **Purpose**: Establish the group's credibility in one scroll; route
  visitors fast to the subsidiary or section they need.
- **Sections**: see full outline in [04-content.md](04-content.md#homepage-content-outline).
- **Primary CTA**: "Explore our companies" → `/companies/`
- **Secondary CTA**: "About the Group" → `/about/`

### About the Group (`/about/`)
- **Purpose**: Trust and stability signals for institutional/investor/
  regulator audience.
- **Sections**: Group history/timeline, mission/vision/values, governance
  structure, leadership (if bios approved), group-wide certifications or
  registrations, link to Sustainability if built.
- **CTA**: Contact / Careers.

### Companies index (`/companies/`)
- **Purpose**: Single hub listing all 8 companies with enough context to
  route a visitor to the right one in one click.
- **Sections**: Intro line on the portfolio logic (mobility/hospitality/
  business services), then 8-card grid using the one-sentence descriptors
  from [04-content.md](04-content.md), grouped visually by natural
  adjacency rather than a flat unordered grid:
  - **Mobility**: Nii Plants and Car Rentals, Plants Greene Leasing,
    NPL Automobile, Nii Plants Logistics
  - **Hospitality & Travel**: Plantsville Residences, Trivoxo Limited
    Company
  - **Business Services**: Puffs Ghana, Papersource
  Each card carries a small "opens on this site" vs. "visits partner
  site" indicator so visitors know what to expect before clicking (type A
  vs. type B pages, see below).

### Subsidiary page, type A — overview + link out (`/companies/[sector]/`)
Applies to: Nii Plants and Car Rentals, Nii Plants Logistics, Trivoxo,
Puffs Ghana, Plants Greene Leasing.
- **Purpose**: Establish group endorsement and give enough real
  information to be useful and to rank on its own for category+local
  search, then hand the visitor off to the existing site for booking/
  ordering/detail — without duplicating that site's content wholesale
  (see the duplicate-content note in [07-seo.md](07-seo.md)).
- **Sections**:
  1. Hero — company name, "Part of Nii Plants Group" endorsement,
     one-line descriptor, photography specific to that company.
  2. What we do — 2–3 sentence overview, written distinctly from the
     existing site's own copy.
  3. Highlights — 3–4 concrete facts (e.g. Nii Plants and Car Rentals'
     actual fleet categories: sedans, SUVs, 4x4s, coaster buses) — not a
     full service catalogue, since that lives on the existing site.
  4. Proof — a testimonial or stat if available (Niiplants and Car
     Rentals already has real client testimonials on-site to reuse).
  5. **Primary CTA — external link**: prominent "Visit [Company] →"
     button/link to the existing domain, opening in a new tab, using the
     external-link CTA component (see
     [06-components.md](06-components.md)) so it's visually clear the
     visitor is leaving the group site.
  6. Cross-links — 1–2 adjacent companies (see
     [04-content.md](04-content.md)).
  7. Footer (shared global component).

### Subsidiary page, type B — full page (`/companies/[sector]/`)
Applies to: Plantsville Residences, NPL Automobile, Papersource — none of
these have an existing site, so this page is their real, complete
destination.
- **Purpose**: Be the actual sales/info page for a company with no other
  web presence.
- **Sections**:
  1. Hero — company name, "Part of Nii Plants Group" endorsement,
     one-line descriptor, hero photography.
  2. What we do — 2–3 sentence overview.
  3. Services/offering grid — e.g. Plantsville Residences: the 5 units
     with their confirmed amenities (see
     [04-content.md](04-content.md#plantsville-residences--confirmed-detail));
     NPL Automobile: repair/maintenance service categories; Papersource:
     product/procurement categories.
  4. Proof — stats, gallery, or testimonial specific to this company.
  5. How to engage — for these three, this must be a real in-page contact
     path (form, phone, email) since there's no external site to send
     anyone to.
  6. Cross-links — 1–2 adjacent companies.
  7. Footer (shared global component).
- **CTA**: "Enquire," "Book a stay" (Plantsville), "Request service" (NPL
  Automobile), or "Request a quote" (Papersource).

> **[TBD — client input]**: for the three full-page companies, what's the
> actual enquiry mechanism — a contact form emailing a specific inbox, a
> WhatsApp/phone number, or something else? This determines the Phase 2
> build scope in [roadmap.md](roadmap.md).

### Newsroom (`/newsroom/`)
- **Purpose**: Ongoing credibility/freshness signal + SEO content engine.
- **Sections**: Filterable list (by subsidiary/category), each item with
  date, subsidiary tag, excerpt.
- Individual article (`/newsroom/[slug]/`): standard article template —
  title, date, author/attribution if applicable, body, related articles.

### Careers (`/careers/`)
- **Purpose**: Signal group scale as an employer; route candidates.
- **Sections**: Why work here (culture/values reused from About), open
  roles (list or link to external ATS if the client uses one), how to
  apply.
- **[TBD]**: does the group have an existing applicant tracking system to
  link/embed, or should this be a simple "send your CV to X" contact
  pattern for v1?

### Contact (`/contact/`)
- **Purpose**: Single directory for every way to reach the group and each
  company — reduces "which number do I call" friction.
- **Sections**: Group HQ contact, map/location, then a per-company contact
  table (phone/email/location if distinct). Nii Plants and Car Rentals'
  confirmed numbers/email (`0302441805 / 0593835941`,
  `rental@niiplantsghana.com`) can seed this table now; the rest need
  confirming with the client.

### Legal (`/privacy-policy/`, `/terms-of-use/`)
- Standard legal templates — populate with client-provided or
  counsel-reviewed text; not to be drafted speculatively.

## Navigation structure

- **Primary nav**: Home · Companies (mega-menu listing all 8 companies
  grouped by adjacency) · About · Newsroom · Careers · Contact.
- **Mega-menu** rationale: with 8 companies, a flat dropdown becomes a
  wall of text — group them under the same 3 adjacency clusters used on
  the Companies index page for consistency (Mobility · Hospitality &
  Travel · Business Services).
- **Footer**: full sitemap link list + company directory (all 8, by real
  name) + legal links + social + group registration/legal info line.
