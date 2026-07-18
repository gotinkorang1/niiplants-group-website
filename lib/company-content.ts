import type { Company } from "@/lib/companies";
import { companies } from "@/lib/companies";

/**
 * Per-company page content for /companies/[slug].
 * Facts sourced from the client brief and docs/04-content.md — services
 * lists are client-confirmed; no invented statistics.
 */
export interface CompanyDetail {
  slug: string;
  /** 2–3 sentence "What we do" overview, written distinctly from any existing site copy. */
  intro: string;
  /** Heading for the offering grid, e.g. "Services" or "Facilities". */
  servicesLabel: string;
  services: string[];
  /** 3–4 concrete facts (type A pages) or proof points (type B pages). */
  highlights?: string[];
  /** Confirmed location, if any. */
  location?: string;
  /** Confirmed direct contact, if any. */
  phones?: string[];
  email?: string;
  /** CTA label. Type A pages link out; type B pages link to /contact. */
  ctaLabel: string;
  /** YouTube uploads-playlist ID for an embedded video section, if the company has a channel. */
  youtubePlaylist?: string;
  /** Public YouTube channel URL, shown alongside the embed. */
  youtubeChannelUrl?: string;
  /** Real photos for a gallery strip on the page. */
  gallery?: { src: string; alt: string; caption?: string }[];
  /** Slugs of 1–2 naturally adjacent sibling companies (docs/04-content.md). */
  crossLinks: string[];
}

export const companyDetails: Record<string, CompanyDetail> = {
  "car-rentals": {
    slug: "car-rentals",
    intro:
      "Niiplants and Car Rentals puts a professionally maintained fleet at your disposal — by the day, the week, or the month. From airport pickups to ongoing corporate transportation, every vehicle is serviced in-house and every booking is handled by people who run fleets for a living.",
    servicesLabel: "Services",
    services: [
      "Daily rentals",
      "Weekly rentals",
      "Monthly rentals",
      "Airport pickup",
      "Corporate transportation",
    ],
    highlights: [
      "Car Rental Service Provider of the Year 2024 — Ghana Tourism Authority, Greater Accra Regional Tourism Awards",
      "Fleet spanning sedans, SUVs, 4x4s, and coaster buses",
      "Serves individuals, corporations, and government institutions",
    ],
    gallery: [
      {
        src: "/awards/tourism-awards-2024-a.jpg",
        alt: "Certificate of Excellence — Car Rental Service Provider of the Year 2024, Greater Accra Regional Tourism Awards",
        caption: "Car Rental Service Provider of the Year 2024 — Ghana Tourism Authority.",
      },
      {
        src: "/awards/ceo-receiving-award.jpg",
        alt: "Receiving an award on stage at the National Tourism Awards",
        caption: "On stage at the National Tourism Awards.",
      },
    ],
    phones: ["030 244 1805", "059 383 5941"],
    email: "rental@niiplantsghana.com",
    ctaLabel: "Visit Niiplants and Car Rentals",
    youtubePlaylist: "UUgqE5Gwju32f7Quf6P0-DFg",
    youtubeChannelUrl: "https://www.youtube.com/@niiplantscarrental867",
    crossLinks: ["vehicle-leasing", "automotive"],
  },
  "vehicle-leasing": {
    slug: "vehicle-leasing",
    intro:
      "Plants Greene Leasing takes the complexity out of vehicle ownership. Long-term leases and full fleet management give companies and individuals dependable mobility — vehicles, maintenance, and administration handled — without tying up capital in depreciating assets.",
    servicesLabel: "Services",
    services: [
      "Long-term leasing",
      "Fleet management",
      "Corporate vehicles",
      "Maintenance support",
    ],
    highlights: [
      "Structured leases for individuals and corporate fleets",
      "Maintenance support backed by the group's own workshop, NPL Automobile",
      "Part of a group that operates its own fleets every day",
    ],
    ctaLabel: "Visit Plants Greene Leasing",
    crossLinks: ["car-rentals", "automotive"],
  },
  automotive: {
    slug: "automotive",
    intro:
      "NPL Automobile is the workshop behind the group's own fleets — and it brings that same standard to yours. From routine servicing and diagnostics to engine, suspension, and electrical work, vehicles are repaired by the team that keeps hundreds of group trips on the road.",
    servicesLabel: "Services",
    services: [
      "Vehicle servicing",
      "Diagnostics",
      "Repairs",
      "Engine works",
      "Suspension",
      "Electrical repairs",
      "Fleet maintenance",
    ],
    highlights: [
      "Maintains the fleets of Niiplants and Car Rentals and Niiplants Logistics",
      "Fleet maintenance programmes for corporate clients",
      "Diagnostics-led repairs — fix the cause, not just the symptom",
    ],
    ctaLabel: "Request service",
    crossLinks: ["car-rentals", "logistics"],
  },
  logistics: {
    slug: "logistics",
    intro:
      "Niiplants Logistics moves goods reliably across Ghana — from same-city deliveries to nationwide distribution. Corporate clients get a single accountable partner for transport, warehousing, and distribution, running on a fleet the group maintains itself.",
    servicesLabel: "Services",
    services: [
      "Local delivery",
      "Corporate logistics",
      "Fleet transport",
      "Warehousing",
      "Distribution",
    ],
    highlights: [
      "Nationwide operations across Ghana",
      "Fleet maintained in-house by NPL Automobile",
      "Serves corporations, institutions, and SMEs",
    ],
    ctaLabel: "Visit Niiplants Logistics",
    crossLinks: ["automotive", "office-supplies"],
  },
  "plantsville-residences": {
    slug: "plantsville-residences",
    intro:
      "Plantsville Residences offers premium serviced apartments in Dansoman, Accra — comfort, security, and convenience under one roof. Every room comes with air conditioning and free Wi-Fi, and the essentials city guests worry about — power, water, security — simply never lapse.",
    servicesLabel: "Facilities",
    services: [
      "One-bedroom apartments",
      "Standard rooms",
      "24-hour security",
      "Free Wi-Fi",
      "Air conditioning",
      "Laundry service",
      "Free parking",
      "Constant electricity",
      "Uninterrupted clean water",
    ],
    highlights: [
      "24-hour security on the premises",
      "Constant power and uninterrupted clean water",
      "Air conditioning and free Wi-Fi in every room",
    ],
    location: "Poultry Farm Avenue, Dansoman, Accra, Ghana",
    ctaLabel: "Book a stay",
    crossLinks: ["travel", "car-rentals"],
  },
  travel: {
    slug: "travel",
    intro:
      "Trivoxo Limited Company handles the whole journey — flights, visas, hotels, tours, and travel insurance — for business and leisure travellers alike. One point of contact plans the trip, so you spend your time travelling, not arranging.",
    servicesLabel: "Services",
    services: [
      "Flight booking",
      "Visa assistance",
      "Tours",
      "Hotel reservations",
      "Travel insurance",
    ],
    highlights: [
      "End-to-end trip planning for business and leisure",
      "Visa assistance alongside ticketing — one accountable partner",
      "Group adventure experiences — guided biking and hiking tours",
    ],
    gallery: [
      {
        src: "/trivoxo/event-biking.webp",
        alt: "Trivoxo group biking tour — riders posing on a ridge overlooking the valley",
        caption: "Trivoxo group biking tour.",
      },
      {
        src: "/trivoxo/event-hiking.webp",
        alt: "Trivoxo adventure event — group celebrating on a hillside trail",
        caption: "Adventure hiking experience with Trivoxo.",
      },
    ],
    ctaLabel: "Visit Trivoxo",
    crossLinks: ["plantsville-residences", "car-rentals"],
  },
  food: {
    slug: "food",
    intro:
      "Puffs Ghana serves great food wherever it's needed — in the restaurant, delivered to your door, or catered at your event. The same group discipline that keeps fleets running keeps kitchens consistent.",
    servicesLabel: "Services",
    services: ["Restaurant", "Catering", "Delivery", "Event services"],
    highlights: [
      "Restaurant dining and delivery",
      "Catering and event services for private and corporate functions",
    ],
    ctaLabel: "Visit Puffs Ghana",
    crossLinks: ["plantsville-residences", "travel"],
  },
  "office-supplies": {
    slug: "office-supplies",
    intro:
      "Papersource supplies the things offices and schools run on — stationery, printing supplies, and equipment — with the procurement discipline corporate buyers expect. One supplier, consolidated invoicing, dependable delivery.",
    servicesLabel: "Services",
    services: [
      "Office stationery",
      "Printing supplies",
      "Corporate procurement",
      "School supplies",
      "Office equipment",
    ],
    highlights: [
      "Procurement for businesses, schools, and institutions",
      "Delivery supported by the group's own logistics operation",
    ],
    ctaLabel: "Request a quote",
    crossLinks: ["logistics", "travel"],
  },
};

export function getCompanyWithDetail(slug: string): { company: Company; detail: CompanyDetail } | null {
  const company = companies.find((c) => c.slug === slug);
  const detail = companyDetails[slug];
  if (!company || !detail) return null;
  return { company, detail };
}
