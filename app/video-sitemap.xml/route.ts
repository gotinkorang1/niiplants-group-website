import { siteVideos } from "@/lib/videos";
import { siteUrl } from "@/lib/site";

/**
 * Google video sitemap extension — the standard sitemap format can't carry
 * video metadata, so videos get their own sitemap using the
 * <video:video> namespace. Referenced from robots.ts.
 */
export const revalidate = 3600;

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const byPage = new Map<string, typeof siteVideos>();
  for (const video of siteVideos) {
    const list = byPage.get(video.pagePath) ?? [];
    list.push(video);
    byPage.set(video.pagePath, list);
  }

  const urls = [...byPage.entries()]
    .map(([pagePath, videos]) => {
      const loc = `${siteUrl}${pagePath === "/" ? "" : pagePath}`;
      const entries = videos
        .map((v) => {
          const player = v.embedUrl
            ? `      <video:player_loc>${esc(v.embedUrl)}</video:player_loc>`
            : v.contentPath
              ? `      <video:content_loc>${esc(`${siteUrl}${v.contentPath}`)}</video:content_loc>`
              : "";
          return `    <video:video>
      <video:thumbnail_loc>${esc(`${siteUrl}${v.thumbnail}`)}</video:thumbnail_loc>
      <video:title>${esc(v.name)}</video:title>
      <video:description>${esc(v.description)}</video:description>
${player}
      <video:publication_date>${v.uploadDate}T00:00:00+00:00</video:publication_date>
    </video:video>`;
        })
        .join("\n");
      return `  <url>\n    <loc>${esc(loc || `${siteUrl}/`)}</loc>\n${entries}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
