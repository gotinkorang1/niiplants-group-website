import type { MetadataRoute } from "next";

import { companies } from "@/lib/companies";
import { getPosts } from "@/lib/sanity";
import { siteUrl } from "@/lib/site";

/** Refresh hourly so newly published newsroom articles join the sitemap without a redeploy. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "monthly", lastModified },
    { url: `${siteUrl}/companies`, priority: 0.9, changeFrequency: "monthly", lastModified },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: "yearly", lastModified },
    { url: `${siteUrl}/gallery`, priority: 0.7, changeFrequency: "monthly", lastModified },
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

  // Newsroom articles — dated by their publish time.
  const posts = await getPosts();
  const articleRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/newsroom/${post.slug}`,
    priority: 0.6,
    changeFrequency: "yearly",
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...companyRoutes, ...articleRoutes];
}
