# 01 — Project Overview

## What this is

The corporate website for **Nii Plants Group**, a diversified Ghanaian business
group. This is not a marketing site for a single product — it is the group's
digital headquarters: the place investors, partners, regulators, job
candidates, and customers of any subsidiary go to understand who the group is,
what it operates, and why it can be trusted.

## The Group

Nii Plants Group is made up of eight companies:

| Sector | Company | Existing site | Status |
|---|---|---|---|
| Car Rentals | Nii Plants and Car Rentals | [niiplantsghana.com](https://niiplantsghana.com) | Live |
| Hospitality / Real Estate | Plantsville Residences | — (no site yet) | To build in full on group site |
| Logistics | Nii Plants Logistics | [niiplantslogistics.com](https://niiplantslogistics.com/) | Live — **currently compromised, see below** |
| Travel | Trivoxo Limited Company | [trivoxogh.com](https://trivoxogh.com/) | Live (behind a Cloudflare check I couldn't get past — verify content manually) |
| Automotive | NPL Automobile | — (no site yet) | To build in full on group site |
| Food | Puffs Ghana | [puffghana.com](https://puffghana.com/) | Did not load during my check — verify it's currently live |
| Vehicle Leasing | Plants Greene Leasing | [plantsgreeneleasing.com](https://plantsgreeneleasing.com/) | Live |
| Office Supplies | Papersource | — (no site yet) | To build in full on group site |

Several of these companies are naturally adjacent (Nii Plants and Car Rentals ↔
Plants Greene Leasing ↔ NPL Automobile; Trivoxo ↔ Plantsville Residences;
Nii Plants Logistics ↔ NPL Automobile fleet servicing), which gives the group a
coherent "mobility, hospitality, and commerce" story rather than a random
conglomerate of unrelated divisions. The site's narrative should lean into
these adjacencies rather than presenting eight disconnected businesses.

> **Urgent, unrelated to design**: [niiplantslogistics.com](https://niiplantslogistics.com/)
> is currently injected with spam links (online gambling/"slot" sites) —
> classic symptom of a hacked, outdated WordPress install. This should be
> cleaned up (and the CMS/plugins updated) by whoever manages that hosting
> account before it's linked from the new group site, and ideally before it
> accrues more search-engine penalty. Not something I can fix without
> hosting access.

> **[TBD — confirm with client]**: legal registration name of the parent
> ("Nii Plants Group" vs. a formal registered entity name — Trivoxo is
> confirmed as "Trivoxo Limited Company," implying each subsidiary may be
> its own registered entity), founding year of the group, headquarters
> address (Plantsville's address — Poultry Farm Avenue, Akokor Foto,
> Dansoman, Accra — is confirmed via the logistics site footer, but this may
> just be one property's address, not group HQ), number of employees,
> and years in operation. These facts drive real copy (e.g. "25 years,"
> "500+ vehicles") and must not be invented.

## Positioning statement

*Nii Plants Group is Ghana's diversified partner for mobility, hospitality,
and business services — bringing corporate-grade reliability to the
services that keep organisations and travellers moving.*

This is a working draft. It should be validated against the client's own
language once available, but it establishes the frame: **breadth without
dilution** — one trustworthy group, many specialist businesses.

## Reference brands and what we borrow from each

| Brand | What we take from it |
|---|---|
| Mercedes-Benz | Restraint — large imagery, minimal copy per screen, confidence over persuasion |
| Toyota | Global-local balance — a worldwide standard of quality applied to a local market story |
| Deloitte | Information architecture for a multi-service group — clean service/sector navigation, credibility signals (leadership, governance, insights) |
| Marriott | Portfolio-brand pattern — one group identity that "endorses" distinct sub-brands with their own personality |
| Hyundai | Approachable premium — corporate scale that doesn't feel cold or unreachable |
| Dangote Group | The direct comparable — an African diversified conglomerate site that balances scale/authority with regional relevance |

We explicitly avoid: SaaS-style landing page patterns (giant gradient hero
text, floating illustrations, pricing-card grids, emoji bullet lists),
generic stock photography, and marketing clichés ("synergy", "world-class
solutions", "one-stop-shop").

## Audiences (in priority order)

1. **Corporate & institutional clients** evaluating a subsidiary for a
   contract (e.g. a company sourcing office supplies or a corporate fleet
   lease) — need credibility, scale, and a clear path to a sales contact.
2. **Individual consumers** of a specific subsidiary (renting a car, booking
   a hotel, booking travel) — need to quickly reach that subsidiary's own
   experience without wading through group-level content.
3. **Prospective partners / government / regulators** assessing the group's
   legitimacy and standing — need governance, leadership, and compliance
   signals.
4. **Job candidates** — need a careers presence that reflects the group's
   scale and professionalism.
5. **Press / media** — need a newsroom or media contact point.

The homepage must serve audience 1–3 (the "group" reader) while giving
audience 2 a fast, low-friction route into the specific subsidiary they came
for. This tension — group gravitas vs. subsidiary speed — is the central
design problem of the site and should be solved primarily through navigation
and homepage IA, not by diluting either experience.

## Success criteria

- A visitor unfamiliar with Nii Plants Group understands, within one
  homepage scroll, what the group is and what it operates.
- A visitor looking for one specific subsidiary can reach that subsidiary's
  dedicated section in two clicks or fewer from any page.
- The site reads as a serious, established institution — nothing about the
  layout, copy, or imagery should feel like a template or a startup.
- Core Web Vitals pass in the "Good" band on real corporate photography
  (see [07-seo.md](07-seo.md) for targets).
- WCAG 2.1 AA compliance across all pages (see [03-design-system.md](03-design-system.md)).

## Explicit non-goals

- Not a single-product landing page.
- Not a template-driven "multi-purpose business theme" look.
- Not dependent on stock icon packs or generic illustration for storytelling
  — real photography and real facts carry the credibility.
- Not attempting to duplicate booking/transaction flows that already exist on
  a subsidiary's own site. Confirmed architecture: **hub-and-spoke** — the
  group site gives Nii Plants and Car Rentals, Nii Plants Logistics, Trivoxo,
  Puffs Ghana, and Plants Greene Leasing an overview section that links out
  to their existing live domains for full detail/booking. Plantsville
  Residences, NPL Automobile, and Papersource have no existing site, so they
  get complete, self-contained pages on the group site. See
  [05-pages.md](05-pages.md) for the page-level detail.
