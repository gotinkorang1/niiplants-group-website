import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/react";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** True once the Sanity project ID env var is set — pages fall back gracefully until then. */
export const sanityConfigured = Boolean(sanityProjectId);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: "2025-01-01",
      useCdn: true,
    })
  : null;

const builder = sanityConfigured && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource) {
  return builder ? builder.image(source) : null;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  company: string;
  excerpt: string;
  coverImage?: SanityImageSource & { alt?: string };
  body?: PortableTextBlock[];
}

const postFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  company,
  excerpt,
  coverImage,
`;

export async function getPosts(): Promise<NewsPost[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postFields} }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<NewsPost | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0] { ${postFields} body }`,
      { slug },
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}
