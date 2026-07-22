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
  /** Full-bleed hero background photo for the company page. */
  heroImage?: { src: string; alt: string };
  /** Frequently asked questions — also emitted as FAQPage schema for rich results. */
  faqs?: { question: string; answer: string }[];
  /** Slugs of 1–2 naturally adjacent sibling companies (docs/04-content.md). */
  crossLinks: string[];
}

export const companyDetails: Record<string, CompanyDetail> = {
  "car-rentals": {
    slug: "car-rentals",
    intro:
      "Nii Plants and Car Rentals puts a professionally maintained fleet at your disposal — by the day, the week, or the month. From airport pickups to ongoing corporate transportation, every vehicle is professionally maintained and every booking is handled by people who run fleets for a living.",
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
    phones: ["030 232 9755", "+233 59 388 5264"],
    email: "info@niiplantsghana.com",
    heroImage: {
      src: "/photos/rentals-key-handover.jpg",
      alt: "Chauffeur handing over vehicle keys to a client",
    },
    // Answers as published on niiplantsghana.com — client-confirmed, not invented.
    faqs: [
      {
        question: "What types of vehicles do you offer for rental?",
        answer:
          "A diverse fleet to suit different needs — compact cars, sedans, SUVs, 4x4s, and spacious vans and coaster buses for group travel.",
      },
      {
        question: "What documents are required to rent a car?",
        answer:
          "A valid driver's licence, a valid identification document (passport or national ID), and a credit or debit card for the reservation and security deposit.",
      },
      {
        question: "Can I rent a car if I am under 25 years old?",
        answer:
          "We rent to drivers who are 25 years or older and hold a valid driver's licence.",
      },
      {
        question: "Is insurance included in the rental price?",
        answer:
          "Yes — basic insurance cover is included in the rental price, and optional additional cover is available for extra peace of mind.",
      },
      {
        question: "Are there any hidden fees or charges?",
        answer:
          "No. The total cost is stated clearly in your reservation, with no hidden fees or charges in the rental agreement.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellations are free up to 48 hours before the scheduled pick-up time. A cancellation fee may apply within 48 hours of pick-up.",
      },
      {
        question: "Do you offer airport pick-up and drop-off?",
        answer:
          "Yes. Share your flight details when reserving and we will arrange airport pick-up and drop-off.",
      },
      {
        question: "Can I travel outside Ghana with a rental car?",
        answer:
          "Our rental vehicles are for use within Ghana; crossing international borders is not permitted.",
      },
    ],
    ctaLabel: "Visit Nii Plants and Car Rentals",
    youtubePlaylist: "UUgqE5Gwju32f7Quf6P0-DFg",
    youtubeChannelUrl: "https://www.youtube.com/@niiplantscarrental867",
    crossLinks: ["vehicle-leasing", "logistics"],
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
      "Maintenance support arranged as part of every lease",
      "Part of a group that operates its own fleets every day",
    ],
    heroImage: {
      src: "/photos/rentals-journey.jpg",
      alt: "Clients travelling together in a leased vehicle",
    },
    gallery: [
      {
        src: "/photos/rentals-keys.jpg",
        alt: "Client holding the keys to a leased vehicle",
        caption: "Long-term leases, handled end to end.",
      },
      {
        src: "/photos/office-work.jpg",
        alt: "Lease agreement being reviewed at a desk",
        caption: "Corporate fleets, managed end to end.",
      },
    ],
    faqs: [
      {
        question: "How long are your lease terms?",
        answer:
          "Leases are structured long-term rather than by the day — terms are agreed to suit your operating needs and budget.",
      },
      {
        question: "What is included in a lease?",
        answer:
          "The vehicle plus the administration around it — maintenance support and fleet management are arranged as part of the agreement.",
      },
      {
        question: "Can you manage a fleet we already own?",
        answer:
          "Yes. Fleet management is available as a service for organisations that own their vehicles but want the day-to-day running handled.",
      },
      {
        question: "Do you lease to individuals as well as companies?",
        answer:
          "Yes — leases are available to both individuals and corporate clients.",
      },
    ],
    ctaLabel: "Visit Plants Greene Leasing",
    crossLinks: ["car-rentals", "logistics"],
  },
  logistics: {
    slug: "logistics",
    intro:
      "Nii Plants Logistics moves goods reliably across Ghana — from same-city deliveries to nationwide distribution. Corporate clients get a single accountable partner for transport, warehousing, and distribution, running on a professionally maintained fleet.",
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
      "Professionally maintained fleet",
      "Serves corporations, institutions, and SMEs",
    ],
    heroImage: {
      src: "/photos/logistics-truck-port.jpg",
      alt: "Freight truck at a container port at sunset",
    },
    gallery: [
      {
        src: "/photos/logistics-warehouse-manager.jpg",
        alt: "Warehouse supervisor coordinating parcels for dispatch",
        caption: "Warehousing and distribution.",
      },
      {
        src: "/photos/logistics-courier-van.jpg",
        alt: "Courier checking packages at a delivery van",
        caption: "Local delivery and corporate logistics.",
      },
      {
        src: "/photos/logistics-driver.jpg",
        alt: "Professional driver at the wheel of a haulage truck",
        caption: "Fleet transport across Ghana.",
      },
      {
        src: "/photos/logistics-port.jpg",
        alt: "Cargo port with trucks and freight aircraft at sunset",
        caption: "Connected to air and sea freight.",
      },
    ],
    faqs: [
      {
        question: "What kinds of goods do you move?",
        answer:
          "General cargo for businesses and institutions — palletised goods, cartons, equipment, and distribution stock. Contact us with your load type and route and we will confirm suitability.",
      },
      {
        question: "Do you deliver outside Accra?",
        answer:
          "Yes. We operate nationwide across Ghana, from same-city deliveries in Accra to regional distribution runs.",
      },
      {
        question: "Can you handle regular, scheduled distribution?",
        answer:
          "Yes. Corporate clients can set up recurring routes and schedules so deliveries run on a fixed cycle rather than being booked each time.",
      },
      {
        question: "Do you offer storage as well as transport?",
        answer:
          "Yes — warehousing is available alongside transport, so goods can be stored and dispatched as needed rather than moved in one trip.",
      },
      {
        question: "How do I get a quote?",
        answer:
          "Send us your pickup and delivery points, the type and volume of goods, and how often you need the service. We will come back with pricing.",
      },
    ],
    ctaLabel: "Visit Nii Plants Logistics",
    crossLinks: ["car-rentals", "office-supplies"],
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
    heroImage: {
      src: "/photos/travel-harbour.jpg",
      alt: "Traveller with a map at a harbour",
    },
    faqs: [
      {
        question: "Do you book international as well as domestic flights?",
        answer:
          "Yes. We ticket both domestic routes within Ghana and international departures, and can hold or amend bookings as your plans firm up.",
      },
      {
        question: "Can you help with visa applications?",
        answer:
          "Yes. We advise on requirements, help assemble supporting documents, and guide you through the application process for your destination.",
      },
      {
        question: "Do you arrange tours and group experiences?",
        answer:
          "Yes — guided tours, biking and hiking experiences, and group itineraries for companies, families, and private groups.",
      },
      {
        question: "Can you arrange airport transfers and vehicles?",
        answer:
          "Yes. Because Trivoxo is part of Nii Plants Group, airport pickup and vehicle hire can be arranged alongside your booking.",
      },
      {
        question: "Do you offer travel insurance?",
        answer:
          "Yes. Travel insurance can be added to any booking — tell us your destination and trip length and we will advise on cover.",
      },
    ],
    ctaLabel: "Visit Trivoxo",
    crossLinks: ["travel", "car-rentals"],
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
    heroImage: {
      src: "/photos/food-spread.jpg",
      alt: "Freshly prepared dishes laid out on a table",
    },
    gallery: [
      {
        src: "/photos/food-service.jpg",
        alt: "Server presenting a prepared meal at the bistro",
        caption: "Restaurant service and catering.",
      },
      {
        src: "/photos/food-cafe.jpg",
        alt: "Guest enjoying a drink at the cafe",
        caption: "A relaxed place to eat and meet.",
      },
    ],
    faqs: [
      {
        question: "Do you cater for corporate events?",
        answer:
          "Yes. We cater meetings, conferences, and company functions, with menus and quantities agreed in advance.",
      },
      {
        question: "How far in advance should I book catering?",
        answer:
          "The earlier the better, especially for large events. Get in touch with your date, guest numbers, and menu preferences and we will confirm availability.",
      },
      {
        question: "Do you deliver?",
        answer:
          "Yes — delivery is available alongside dine-in service.",
      },
    ],
    ctaLabel: "Visit Puffs Ghana",
    crossLinks: ["travel", "car-rentals"],
  },
  "office-supplies": {
    slug: "office-supplies",
    intro:
      "Papersource keeps offices, schools, and institutions stocked — stationery, printing consumables, filing systems, and equipment — with the procurement discipline corporate buyers expect. One supplier instead of five, consolidated invoicing instead of scattered receipts, and delivery backed by our own logistics network.",
    servicesLabel: "Services",
    services: [
      "Office stationery",
      "Printing supplies",
      "Corporate procurement",
      "School supplies",
      "Office equipment",
    ],
    highlights: [
      "One accountable supplier for stationery, print consumables, and equipment",
      "Recurring supply schedules so stock arrives before you run out",
      "Delivery across Accra and nationwide via Nii Plants Logistics",
    ],
    heroImage: {
      src: "/photos/supplies-notebooks.jpg",
      alt: "Stacked notebooks and stationery supplies",
    },
    gallery: [
      {
        src: "/photos/supplies-binders.jpg",
        alt: "Ring binders used for document storage",
        caption: "Filing, stationery, and office consumables.",
      },
      {
        src: "/photos/office-desk.jpg",
        alt: "Organised modern office desk",
        caption: "Equipping offices end to end.",
      },
    ],
    faqs: [
      {
        question: "Do you supply businesses on account?",
        answer:
          "Yes. Corporate and institutional clients can order on agreed terms with consolidated invoicing rather than paying per order.",
      },
      {
        question: "What do you supply?",
        answer:
          "Office stationery, printing consumables, filing and document storage, school supplies, and office equipment. If you need something not listed, ask — we source to order.",
      },
      {
        question: "Can you deliver to our offices?",
        answer:
          "Yes. Delivery across Accra and nationwide is supported by Nii Plants Logistics, part of the same group.",
      },
      {
        question: "Do you handle bulk or recurring orders?",
        answer:
          "Yes. Recurring supply schedules can be set up so stock arrives on a regular cycle without re-ordering each time.",
      },
      {
        question: "How do I request a quote?",
        answer:
          "Send us your item list and quantities through the contact form and we will return a written quotation.",
      },
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
