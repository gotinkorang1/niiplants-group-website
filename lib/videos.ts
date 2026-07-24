import { siteUrl } from "@/lib/site";

/**
 * Video registry — single source of truth for every video on the site.
 * Each entry produces VideoObject structured data and a video-sitemap
 * entry, which is what actually makes a video eligible to appear in
 * Google video search and rich results (the filename alone does nothing).
 *
 * ISO 8601 durations: PT#M#S. uploadDate is ISO 8601 (YYYY-MM-DD).
 */
export interface SiteVideo {
  /** Stable id, also used as the sitemap key. */
  id: string;
  name: string;
  description: string;
  /** Page the video is embedded on (absolute path). */
  pagePath: string;
  /** Poster image (absolute path under /public). */
  thumbnail: string;
  uploadDate: string;
  duration: string;
  /** Self-hosted file path, if hosted here. */
  contentPath?: string;
  /** External embed URL (e.g. YouTube), if applicable. */
  embedUrl?: string;
}

export const siteVideos: SiteVideo[] = [
  {
    id: "growing-the-nii-plants-fleet",
    name: "Growing the Nii Plants fleet",
    description:
      "Behind the scenes as Nii Plants Group takes delivery of new coaster buses — investing in the fleet that moves clients across Ghana every day, with the team at the dealership handover.",
    pagePath: "/",
    thumbnail: "/video/fleet-story-poster.jpg",
    uploadDate: "2026-07-21",
    duration: "PT2M30S",
    contentPath: "/video/fleet-story.mp4",
  },
  {
    id: "nii-plants-car-rentals-channel",
    name: "Nii Plants Car Rentals — from the fleet",
    description:
      "Vehicle walkarounds, client journeys, and updates from the road on the Nii Plants Car Rentals YouTube channel.",
    pagePath: "/",
    thumbnail: "/video/fleet-story-poster.jpg",
    uploadDate: "2024-09-15",
    duration: "PT1M",
    embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=UUgqE5Gwju32f7Quf6P0-DFg",
  },
];

/** VideoObject JSON-LD for one video. */
export function videoJsonLd(video: SiteVideo) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: [`${siteUrl}${video.thumbnail}`],
    uploadDate: video.uploadDate,
    duration: video.duration,
    ...(video.contentPath ? { contentUrl: `${siteUrl}${video.contentPath}` } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    publisher: {
      "@type": "Organization",
      name: "Nii Plants Group",
      url: siteUrl,
    },
  };
}

/** VideoObjects for every video embedded on a given page path. */
export function videosForPage(pagePath: string) {
  return siteVideos.filter((v) => v.pagePath === pagePath);
}
