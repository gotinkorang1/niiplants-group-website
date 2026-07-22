# 06 — Components

Component inventory implementation should build against. Each should be
built as a reusable component reading from the design tokens in
[03-design-system.md](03-design-system.md), not one-off per page.

## Global

### Header / Navigation
- Logo (group mark) left, primary nav center/right, utility actions
  (search icon, "Contact" button) far right.
- Transitions from transparent-over-hero to solid `color-paper-0` with a
  hairline bottom border on scroll (subtle, see
  [08-animation.md](08-animation.md)).
- **Mega-menu** under "Companies": 3 adjacency-grouped columns (Mobility /
  Hospitality & Travel / Business Services), each subsidiary as a text
  link with a one-line descriptor beneath — not icon tiles.
- Mobile: full-screen overlay nav, accordion for the Companies group.
- States: default, scrolled, mobile-open. Focus-visible on every link.

### Footer
- 4–5 column layout: Group (About/Careers/Newsroom), Companies (all 8,
  flat list), Contact (address/phone/email), Legal (Privacy/Terms),
  Social icons.
- Bottom bar: copyright line + group registration/legal identifier.

### Breadcrumbs
- Used on subsidiary and newsroom article pages only (`Home / Companies /
  Car Rentals`). Not needed on top-level pages.

## Homepage-specific

### Hero (full-bleed)
- Full-viewport-height (or 80vh min) image/video background, gradient
  scrim at bottom third only (never full-image overlay) to guarantee text
  contrast per accessibility rules in
  [03-design-system.md](03-design-system.md).
- `type-display` headline, one supporting sentence, one primary + one
  secondary CTA button.
- No auto-rotating carousel — single static hero, optionally a silent
  looping background video (see performance note in
  [07-seo.md](07-seo.md) on video weight).

### Stats strip
- 3–4 numeral+label pairs in a row (stacks on mobile), numerals animate
  in with a restrained count-up on first scroll into view (respecting
  `prefers-reduced-motion`).

### Sector showcase grid
- Responsive grid: 4-up desktop / 2-up tablet / 1-up mobile.
- Card: image, sector name, one-line descriptor, arrow-link affordance.
  Whole card is the click target (not just a small "Learn more" link) —
  but must still render as a real link (`<a>`) for accessibility/SEO, not
  a `div` with a click handler.

### Pillar callout (Why Nii Plants Group)
- 3-up row: short label (e.g. "Trust"), one supporting sentence with a
  concrete proof point, no icon-in-a-circle cliché — a small numeral or
  understated line mark instead.

### Testimonial / partner logos
- Logos: grayscale by default, color on hover, in a static grid (not an
  auto-scrolling marquee, which reads as low-effort).
- Testimonial: large pull-quote typography, attribution with name/title/
  company.

## Subsidiary page-specific

### Subsidiary hero
- Same structural component as homepage hero but shorter (50–60vh),
  includes the "Part of Nii Plants Group" endorsement lockup above the
  headline.

### Services/offering grid
- Flexible 2–4 column grid depending on sector's number of offerings —
  built as one component with a `columns` prop, not rebuilt per sector.

### Proof block
- Variant A: numeral stats row (same component as homepage stats strip,
  reused).
- Variant B: photo gallery (lightbox on click, keyboard-navigable).
- Variant C: single testimonial (reuse testimonial component).

### Engagement CTA band
- Full-width band near page bottom: sector-specific CTA text + button.
  Supports either a link-out (to a booking system) or an in-page anchor
  to a contact/quote form.

### External-link CTA (hub-and-spoke pages only)
- Used on the 5 "type A" subsidiary pages (Nii Plants and Car Rentals,
  Nii Plants Logistics, Trivoxo, Puffs Ghana, Plants Greene Leasing — see
  [05-pages.md](05-pages.md)) as the primary action, since the real
  destination is an external domain, not this site.
- Visually a primary button, but always paired with a small external-link
  icon and `target="_blank" rel="noopener"`, plus a visually-hidden
  accessible suffix so screen reader users get the same signal sighted
  users get from the icon: `<a href="…" target="_blank" rel="noopener">
  Visit Nii Plants and Car Rentals<span class="sr-only"> (opens in a new
  tab)</span></a>`.
- Never disguise this as an internal link — no icon-less button copy like
  plain "Book now" that silently leaves the site. Label always names the
  destination ("Visit [Company Name]"), not a vague "Learn more."

## Shared UI primitives

- **Button** — primary (filled accent), secondary (outline), text-link
  variants; consistent padding/radius from design system; every variant
  has hover/focus/active/disabled states.
- **Card** — base card with hairline border (`color-line-200`), used by
  sector showcase, news teaser, and gallery items.
- **Tag/Badge** — small uppercase label, used for sector accent tints and
  news category tags.
- **Accordion** — used in mobile mega-menu and any FAQ content.
- **Form fields** — text input, select, textarea — all with visible
  labels, inline validation messaging (not color-only), used in Contact
  and quote-request forms.
- **Modal/Lightbox** — for gallery viewing; must trap focus and close on
  Escape.
- **Breadcrumb** (see above).

## Build note

Favor a small number of flexible, prop-driven components over one-off
components per page or per subsidiary — the 8 subsidiary pages should all
render from the same template component with different content/data, not
8 separate hand-built pages. This keeps the "systemic, premium" feel
consistent and makes future subsidiaries easy to add.
