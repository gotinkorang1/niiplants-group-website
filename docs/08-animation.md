# 08 — Animation & Motion

## Principle

Motion here should read as **confidence**, not **decoration**. Every
animation must have a functional reason (draw attention to a state change,
communicate spatial relationship, confirm an action) — if removing an
animation doesn't lose any information, cut it. This is the opposite
instinct from a startup landing page, where motion is often used to
manufacture excitement.

## Duration & easing tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-instant` | 100ms | `ease-out` | Hover color/opacity changes, button states |
| `motion-fast` | 200ms | `ease-out` | Menu open/close, tooltip |
| `motion-base` | 300ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Section reveals, card entrances |
| `motion-slow` | 500ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Hero entrance, page-level transitions |

No animation on this site should exceed ~600ms — anything slower starts to
feel sluggish rather than deliberate. Avoid bounce/elastic/spring easings
entirely; they read as playful/consumer, not corporate.

## Scroll-triggered reveals

- Sections fade + translate up subtly on entering viewport: opacity 0→1,
  `translateY(16px)→0`, `motion-base`, triggered once (never re-animate on
  scroll back up).
- Stagger children (e.g. cards in the sector showcase grid) by ~60–80ms
  each, capped at a 4–5 item stagger group so a long grid doesn't take
  seconds to finish revealing.
- Numeral count-ups (stats strip) run once on first viewport entry over
  ~1.2s, easing out — never loop or re-trigger.

## Hover micro-interactions

- Buttons: background/opacity shift only (`motion-instant`) — no scale
  transforms on buttons (scale-on-hover reads as a mobile-app pattern, not
  corporate web).
- Cards: subtle elevation via border-color shift (`color-line-200` →
  `color-ink-500`) rather than a shadow pop, plus image scale of no more
  than 1.03–1.05 over `motion-base` inside an `overflow:hidden` container
  — restrained, not a dramatic zoom.
- Links: underline draws in from left on hover, `motion-fast`.

## Parallax

Use with restraint and only on the homepage hero at most: background image
moves at ~0.85–0.9x scroll speed relative to foreground text (subtle
depth, not a dramatic float). Never apply parallax to body copy sections —
it hurts readability and can trigger motion sensitivity.

## Page-level transitions

- Route changes: simple cross-fade (`motion-base`), no slide/wipe
  transitions that delay content availability.
- Sticky header transition (transparent → solid on scroll): opacity/
  background-color only, `motion-fast`, no layout shift.

## Reduced motion

Mandatory, not optional: wrap all non-essential motion in a
`prefers-reduced-motion: reduce` media query (or the JS equivalent) that:
- Disables scroll-triggered translate/stagger (content still appears, just
  without the animated entrance — opacity fade only, or instant).
- Disables parallax entirely.
- Keeps essential state-change feedback (focus rings, button press states)
  since those communicate function, not decoration.

## What to avoid

- Auto-playing carousels/sliders of any kind.
- Looping background animations that never settle (distracting, hurts
  perceived performance).
- Scroll-jacking (hijacking native scroll behavior for custom effects).
- Text that animates character-by-character or types itself in — reads as
  gimmicky, not premium.
- Cursor-follow effects or custom cursors — accessibility risk and not in
  keeping with the reference brands in
  [01-project-overview.md](01-project-overview.md).
