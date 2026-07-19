import type { MetadataRoute } from "next";

import { companies } from "@/lib/companies";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Build date — accurate, since every deploy regenerates the sitemap.
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "monthly", lastModified },
    { url: `${siteUrl}/companies`, priority: 0.9, changeFrequency: "monthly", lastModified },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: "yearly", lastModified },
    { url: `${siteUrl}/careers`, priority: 0.6, changeFrequency: "monthly", lastModified },
    { url: `${siteUrl}/newsroom`, priority: 0.6, changeFrequency: "weekly", lastModified },
    { url: `${siteUrl}/contact`, priority: 0.7, changeFrequency: "yearly", lastModified },
    { url: `${siteUrl}/privacy-policy`, priority: 0.2, changeFrequency: "yearly", lastModified },
    { url: `${siteUrl}/terms-of-use`, priority: 0.2, changeFrequency: "yearly", lastModified },
  ];

  const companyRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${siteUrl}/companies/${company.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified,
  }));

  return [...staticRoutes, ...companyRoutes];
}
