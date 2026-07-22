import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { GalleryGrid, type GalleryItem } from "@/components/site/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from across Niiplants Group — fleets, logistics, travel, food, and our people.",
  alternates: { canonical: "/gallery" },
};

const items: GalleryItem[] = [
  // Mobility
  {
    src: "/photos/rentals-key-handover.jpg",
    alt: "Chauffeur handing vehicle keys to a client",
    caption: "Key handover — Niiplants and Car Rentals",
    category: "mobility",
    categoryLabel: "Mobility",
  },
  {
    src: "/photos/rentals-keys.jpg",
    alt: "Client holding up the keys to a vehicle",
    caption: "Ready to drive away",
    category: "mobility",
    categoryLabel: "Mobility",
  },
  {
    src: "/photos/rentals-journey.jpg",
    alt: "Group of friends travelling together in a vehicle",
    caption: "Journeys made easy",
    category: "mobility",
    categoryLabel: "Mobility",
  },
  {
    src: "/photos/automotive-repair.jpg",
    alt: "Technician working under the bonnet of a vehicle",
    caption: "Fleet servicing",
    category: "mobility",
    categoryLabel: "Mobility",
  },
  {
    src: "/photos/automotive-workshop.jpg",
    alt: "Mechanic carrying out diagnostics in the workshop",
    caption: "Diagnostics-led repairs",
    category: "mobility",
    categoryLabel: "Mobility",
  },

  // Logistics
  {
    src: "/photos/logistics-truck-port.jpg",
    alt: "Freight truck at a container port at sunset",
    caption: "Freight moving through the port",
    category: "logistics",
    categoryLabel: "Logistics",
  },
  {
    src: "/photos/logistics-driver.jpg",
    alt: "Professional driver at the wheel of a haulage truck",
    caption: "Professional drivers, nationwide routes",
    category: "logistics",
    categoryLabel: "Logistics",
  },
  {
    src: "/photos/logistics-warehouse-manager.jpg",
    alt: "Warehouse supervisor coordinating parcels for dispatch",
    caption: "Warehousing and dispatch",
    category: "logistics",
    categoryLabel: "Logistics",
  },
  {
    src: "/photos/logistics-courier-van.jpg",
    alt: "Courier checking packages at a delivery van",
    caption: "Last-mile delivery",
    category: "logistics",
    categoryLabel: "Logistics",
  },
  {
    src: "/photos/logistics-parcels.jpg",
    alt: "Delivery personnel handling parcels",
    caption: "Parcels, tracked and handled with care",
    category: "logistics",
    categoryLabel: "Logistics",
  },
  {
    src: "/photos/logistics-port.jpg",
    alt: "Cargo port at sunset with trucks and freight aircraft",
    caption: "Connected to air and sea freight",
    category: "logistics",
    categoryLabel: "Logistics",
  },

  // Travel & hospitality
  {
    src: "/trivoxo/event-biking.webp",
    alt: "Trivoxo group biking tour on a ridge",
    caption: "Group biking tour — Trivoxo",
    category: "travel",
    categoryLabel: "Travel & Hospitality",
  },
  {
    src: "/trivoxo/event-hiking.webp",
    alt: "Trivoxo hiking event on a hillside trail",
    caption: "Adventure hiking experience — Trivoxo",
    category: "travel",
    categoryLabel: "Travel & Hospitality",
  },
  {
    src: "/photos/travel-harbour.jpg",
    alt: "Traveller reading a map at a harbour",
    caption: "Trips planned end to end",
    category: "travel",
    categoryLabel: "Travel & Hospitality",
  },
  {
    src: "/photos/travel-adventure.jpg",
    alt: "Traveller wearing a helmet before an adventure activity",
    caption: "Tours and experiences",
    category: "travel",
    categoryLabel: "Travel & Hospitality",
  },
  {
    src: "/photos/travel-traveller.jpg",
    alt: "Guest relaxing with headphones during a stay",
    caption: "Travel and stays arranged by Trivoxo",
    category: "travel",
    categoryLabel: "Travel & Hospitality",
  },

  // Food
  {
    src: "/photos/food-spread.jpg",
    alt: "Freshly prepared dishes laid out on a table",
    caption: "On the menu at Puffs Ghana",
    category: "food",
    categoryLabel: "Food",
  },
  {
    src: "/photos/food-service.jpg",
    alt: "Server presenting a prepared meal",
    caption: "Restaurant service and catering",
    category: "food",
    categoryLabel: "Food",
  },
  {
    src: "/photos/food-cafe.jpg",
    alt: "Guest enjoying a drink at the cafe",
    caption: "A place to eat and meet",
    category: "food",
    categoryLabel: "Food",
  },

  // Business services
  {
    src: "/photos/supplies-notebooks.jpg",
    alt: "Stacked notebooks and stationery",
    caption: "Stationery and office supplies — Papersource",
    category: "business",
    categoryLabel: "Business Services",
  },
  {
    src: "/photos/supplies-binders.jpg",
    alt: "Ring binders used for document storage",
    caption: "Filing and document management",
    category: "business",
    categoryLabel: "Business Services",
  },
  {
    src: "/photos/office-desk.jpg",
    alt: "Organised modern office desk",
    caption: "Equipping offices end to end",
    category: "business",
    categoryLabel: "Business Services",
  },
  {
    src: "/photos/office-team.jpg",
    alt: "Colleagues collaborating in the office",
    caption: "Our people at work",
    category: "business",
    categoryLabel: "Business Services",
  },

  // Recognition
  {
    src: "/awards/ceo-receiving-award.jpg",
    alt: "Receiving an award on stage at the National Tourism Awards",
    caption: "On stage at the National Tourism Awards",
    category: "recognition",
    categoryLabel: "Recognition",
  },
  {
    src: "/awards/tourism-awards-2024-a.jpg",
    alt: "Certificate of Excellence — Car Rental Service Provider of the Year 2024",
    caption: "Car Rental Service Provider of the Year 2024",
    category: "recognition",
    categoryLabel: "Recognition",
  },
  {
    src: "/awards/award-trophy-1.jpg",
    alt: "Team holding a trophy at the National Tourism Awards",
    caption: "Recognised by the Ghana Tourism Authority",
    category: "recognition",
    categoryLabel: "Recognition",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The group at work."
        lede="Fleets, freight, travel, and the people behind them — a look across Niiplants Group."
      />

      <section className="py-16 md:py-24">
        <Container>
          <GalleryGrid items={items} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
