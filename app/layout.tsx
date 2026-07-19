import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { companies } from "@/lib/companies";
import { siteDescription, siteName, siteUrl, socialLinks } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Niiplants Group | Mobility, Hospitality & Business Services in Ghana",
    template: "%s | Niiplants Group",
  },
  description: siteDescription,
  keywords: [
    "Niiplants Group",
    "Ghana",
    "car rentals Ghana",
    "vehicle leasing Ghana",
    "logistics Ghana",
    "serviced apartments Accra",
    "travel agency Ghana",
    "fleet management",
  ],
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: "Niiplants Group | Mobility, Hospitality & Business Services in Ghana",
    description: siteDescription,
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niiplants Group",
    description: siteDescription,
  },
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  category: "business",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

/** Organization schema — group + subsidiaries (suborganizations). */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  // Logo powers Google's knowledge panel / rich results.
  logo: `${siteUrl}/icon.png`,
  award:
    "Car Rental Service Provider of the Year 2024 — Ghana Tourism Authority, Greater Accra Regional Tourism Awards",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dansoman, Accra",
    addressCountry: "GH",
  },
  sameAs: socialLinks.map((social) => social.href),
  subOrganization: companies.map((company) => ({
    "@type": "Organization",
    name: company.name,
    description: company.descriptor,
    url: company.externalUrl ?? `${siteUrl}/companies/${company.slug}`,
  })),
};

/** WebSite schema — names the site for Google's sitelinks treatment. */
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  publisher: { "@type": "Organization", name: siteName },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper-0 text-ink-700">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, webSiteJsonLd]) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-paper-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
