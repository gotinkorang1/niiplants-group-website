import type { MetadataRoute } from "next";

import { companies } from "@/lib/companies";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/companies`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${siteUrl}/careers`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/newsroom`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${siteUrl}/contact`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${siteUrl}/privacy-policy`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${siteUrl}/terms-of-use`, priority: 0.2, changeFrequency: "yearly" },
  ];

  const companyRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${siteUrl}/companies/${company.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...companyRoutes];
}
