# 03 — Design System

This defines the design tokens and baseline rules implementation should
follow. Treat this as the single source of truth for values used in code —
components should reference these tokens rather than hard-coding colors,
spacing, or type sizes.

> **[TBD — client input]**: final brand colors and logo. The palette below
> is a placeholder built to satisfy the "premium corporate group" brief and
> AA/AAA contrast — swap the hue, keep the structure (one deep neutral base,
> one restrained accent, functional grays) once real brand color is supplied.

## Color

### Core palette

| Token | Value | Use |
|---|---|---|
| `color-ink-900` | `#0B1220` (near-black navy) | Primary text, dark backgrounds |
| `color-ink-700` | `#1E293B` | Secondary text on light backgrounds |
| `color-ink-500` | `#475569` | Tertiary/muted text |
| `color-paper-0` | `#FFFFFF` | Primary background |
| `color-paper-50` | `#F7F7F5` (warm off-white) | Section alternation background |
| `color-line-200` | `#E2E2DE` | Hairline borders/dividers |
| `color-accent-700` | `#8A6D2F` (muted brass/gold) | Primary accent — CTAs, active nav, key numerals |
| `color-accent-500` | `#B79452` | Accent hover/lighter variant |

### Sector accent tints (optional, subtle use only)

Used only as a thin identifying tint (a tag, a hairline, a small icon) on
each company's own page — never as a full background wash, and never
competing with the primary accent for CTAs.

**Update**: the client shared real logos for 6 companies (Trivoxo, Niiplants
Logistics, Plants Greene Leasing, Plantsville Residences, NPL Automobile,
Puffs Ghana). Those arrived as pasted images in chat, not files, so the hex
values below are eyeballed from the artwork — close enough to plan with, but
**not pixel-exact**. Get the actual logo files (see open item in
[roadmap.md](roadmap.md)) and re-sample before this goes to production. The
placeholder colors for Niiplants and Car Rentals and Papersource remain
invented pending their logos.

| Sector | Company | Tint | Source |
|---|---|---|---|
| Car Rentals | Niiplants and Car Rentals | `#2F5D8A` (steel blue) | placeholder — no logo yet |
| Logistics | Niiplants Logistics | `#12213F` (navy) + `#F0742C` (orange) accent | real logo, eyeballed |
| Hospitality / Real Estate | Plantsville Residences | `#B8912B` (antique gold) + `#1B1B2F` (near-black) | real logo, eyeballed — close to our own placeholder primary accent |
| Travel | Trivoxo Limited Company | `#F2431E` (orange-red) + `#FBB03B` (yellow-orange, the checkmark) | real logo, eyeballed |
| Automotive | NPL Automobile | `#D9202B` (red) | real logo, eyeballed |
| Food | Puffs Ghana | `#C8102E` (red) | real logo, eyeballed |
| Vehicle Leasing | Plants Greene Leasing | `#C8102E` (red) | real logo, eyeballed |
| Office Supplies | Papersource | `#5A5A52` (warm gray) | placeholder — no logo yet |

**Finding worth flagging to the client**: NPL Automobile, Puffs Ghana, and
Plants Greene Leasing all land on nearly the same red. A thin color tint
won't visually distinguish those three from each other — lean on each
company's actual logo mark (once we have files) to differentiate them
instead of color alone, per the endorsed-brand approach in
[02-brand-guidelines.md](02-brand-guidelines.md).

### Contrast rule

All text/background pairings must meet **WCAG AA** (4.5:1 for body text,
3:1 for large text ≥24px/19px-bold). Verify `color-accent-700` on
`color-paper-0` for CTA text — if a CTA uses accent as a background, text on
it must be white/near-white, not `color-ink-900`.

## Typography scale

Base: 1rem = 16px. Fluid scale using `clamp()` so headline sizes shrink
gracefully on small viewports without a separate mobile scale.

| Token | Size (desktop → mobile) | Weight | Use |
|---|---|---|---|
| `type-display` | 64px → 36px | 600 | Homepage hero only |
| `type-h1` | 48px → 30px | 600 | Page titles |
| `type-h2` | 34px → 24px | 600 | Section titles |
| `type-h3` | 24px → 20px | 600 | Card/subsection titles |
| `type-body-lg` | 19px → 17px | 400 | Intro paragraphs |
| `type-body` | 16px | 400 | Default body |
| `type-small` | 14px | 400 | Captions, meta, legal |
| `type-label` | 13px, uppercase, +0.04em tracking | 600 | Eyebrows, nav labels, tags |

Line-height: 1.1–1.2 for display/H1/H2, 1.5–1.6 for body copy. Max
measure (line length) for body text: ~68–75 characters (`max-width: 38rem`
–`42rem` on paragraph containers).

## Spacing

8px base grid. Named tokens, not arbitrary pixel values in components:

`space-1` 4px · `space-2` 8px · `space-3` 12px · `space-4` 16px ·
`space-6` 24px · `space-8` 32px · `space-12` 48px · `space-16` 64px ·
`space-24` 96px · `space-32` 128px

Section vertical padding on desktop: `space-24`–`space-32`. On mobile:
`space-12`–`space-16`. Generous section spacing is a core part of the
"premium" feel per [CLAUDE.md](../CLAUDE.md) — never compress sections to
fit more content above the fold.

## Layout

- **Container max-width**: 1280px, with fluid gutters (`min 20px mobile,
  5vw tablet, up to 80px desktop`).
- **Grid**: 12-column on desktop (≥1024px), 8-column tablet (768–1023px),
  4-column mobile (<768px). 24px gutters desktop, 16px mobile.
- **Breakpoints**: `sm` 480px · `md` 768px · `lg` 1024px · `xl` 1280px ·
  `2xl` 1536px. Mobile-first: base styles target `sm`, then progressively
  enhance upward.

## Elevation & surface

Avoid heavy drop shadows (they read as "template UI," not "premium
corporate"). Prefer:
- Hairline borders (`color-line-200`, 1px) over shadows for card
  separation.
- One subtle shadow token for floating elements only (sticky nav on
  scroll, modals): `0 8px 24px rgba(11,18,32,0.08)`.
- Border radius: `radius-sm` 4px (buttons, inputs), `radius-md` 8px
  (cards), `radius-lg` 16px (large media containers). No fully-rounded
  "pill" buttons except tags/badges.

## Component states

Every interactive element must define, at minimum:
- **Default**
- **Hover** (desktop only — do not rely on hover for mobile-critical info)
- **Focus-visible** — a clearly visible 2px outline in `color-accent-700`
  offset 2px from the element, never `outline: none` without a replacement
- **Active/pressed**
- **Disabled** — reduced opacity (0.5) plus `cursor: not-allowed`, never
  color alone (see accessibility below)

## Accessibility baseline (WCAG 2.1 AA)

- Color is never the only signal (pair with icon/underline/text for
  links, errors, status).
- Minimum touch target: 44×44px on mobile for any tappable control.
- All images have meaningful `alt` text; decorative images use `alt=""`.
- Full keyboard operability: every interactive element reachable and
  operable via Tab/Enter/Space, visible focus state at every step.
- Respect `prefers-reduced-motion` — see [08-animation.md](08-animation.md).
- Semantic HTML first (`nav`, `main`, `header`, `footer`, `button` vs
  `div` with an onClick) — ARIA only to fill real gaps, not by default.
- Form fields always have a visible, associated `<label>` — placeholder
  text is never a substitute for a label.
