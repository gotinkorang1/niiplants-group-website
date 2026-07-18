export type CompanyGroup = "mobility" | "hospitality-travel" | "business-services";

export interface Company {
  /** URL slug under /companies/[slug] — a stable category slug, not the literal company name. */
  slug: string;
  /** Real, registered company name. */
  name: string;
  /** Sector label shown alongside the name. */
  sector: string;
  group: CompanyGroup;
  /** One-sentence descriptor — see docs/04-content.md for sourcing notes. */
  descriptor: string;
  /** "external" = overview page links out to an existing live site (hub-and-spoke). "internal" = full page lives on this site. */
  pageType: "external" | "internal";
  externalUrl?: string;
  /** Tailwind color token suffix, e.g. `bg-sector-${tint}` — see app/globals.css. */
  tint: string;
  /** Path to the company logo in /public/logo (normalized filename), if supplied. */
  logo?: string;
}

export const companies: Company[] = [
  {
    slug: "car-rentals",
    name: "Niiplants and Car Rentals",
    sector: "Car Rentals",
    group: "mobility",
    descriptor:
      "Short-term vehicle rental — by the day, week, or month — from a fleet spanning sedans, SUVs, 4x4s, and coaster buses.",
    pageType: "external",
    externalUrl: "https://niiplantsghana.com",
    tint: "car-rentals",
    logo: "/logo/niiplants-car-rentals.png",
  },
  {
    slug: "vehicle-leasing",
    name: "Plants Greene Leasing",
    sector: "Vehicle Leasing",
    group: "mobility",
    descriptor:
      "Long-term vehicle leasing and fleet management, for individuals and companies who need reliable mobility without the burden of ownership.",
    pageType: "external",
    externalUrl: "https://plantsgreeneleasing.com",
    tint: "leasing",
    logo: "/logo/plants-greene.png",
  },
  {
    slug: "automotive",
    name: "NPL Automobile",
    sector: "Automotive",
    group: "mobility",
    descriptor:
      "Vehicle repair and maintenance, backed by a group that runs its own fleets day to day.",
    pageType: "internal",
    tint: "automotive",
    logo: "/logo/npl-automobile.png",
  },
  {
    slug: "logistics",
    name: "Niiplants Logistics",
    sector: "Logistics",
    group: "mobility",
    descriptor: "Freight and haulage services that keep goods moving reliably across Ghana.",
    pageType: "external",
    externalUrl: "https://niiplantslogistics.com",
    tint: "logistics",
    logo: "/logo/niiplants-logistics.png",
  },
  {
    slug: "plantsville-residences",
    name: "Plantsville Residences",
    sector: "Hospitality",
    group: "hospitality-travel",
    descriptor:
      "Serviced apartments in Dansoman, Accra, with 24-hour security, uninterrupted power and water, and free Wi-Fi in every room.",
    pageType: "internal",
    tint: "hospitality",
    logo: "/logo/plantsville-residences.jpg",
  },
  {
    slug: "travel",
    name: "Trivoxo Limited Company",
    sector: "Travel",
    group: "hospitality-travel",
    descriptor: "Travel, tour, and ticketing services for business and leisure journeys.",
    pageType: "external",
    externalUrl: "https://trivoxogh.com",
    tint: "travel",
    logo: "/logo/trivoxo.png",
  },
  {
    slug: "food",
    name: "Puffs Ghana",
    sector: "Food",
    group: "business-services",
    descriptor: "A Ghanaian restaurant serving guests with the same reliability as the rest of the group.",
    pageType: "external",
    externalUrl: "https://puffghana.com",
    tint: "food",
    logo: "/logo/puffs-ghana.png",
  },
  {
    slug: "office-supplies",
    name: "Papersource",
    sector: "Office Supplies",
    group: "business-services",
    descriptor: "Procurement of office equipment and stationery for businesses and institutions.",
    pageType: "internal",
    tint: "office",
  },
];

export const companyGroups: { id: CompanyGroup; label: string }[] = [
  { id: "mobility", label: "Mobility" },
  { id: "hospitality-travel", label: "Hospitality & Travel" },
  { id: "business-services", label: "Business Services" },
];

export function companiesByGroup(group: CompanyGroup) {
  return companies.filter((company) => company.group === group);
}
