import type { NextConfig } from "next";

/**
 * Content Security Policy. Allowlists exactly the third parties the site
 * uses — Sanity (newsroom images/API), YouTube (lite embeds), Google Maps
 * (contact), Cloudflare Turnstile (form), Vercel analytics — and blocks
 * everything else, so an injected <script src="evil"> cannot execute.
 *
 * 'unsafe-inline'/'unsafe-eval' are required by Next.js's inline runtime
 * and the Sanity Studio bundle; the value still prevents external script
 * injection, framing, and form exfiltration.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://challenges.cloudflare.com https://www.youtube-nocookie.com https://www.youtube.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://res.cloudinary.com https://i.ytimg.com https://*.googleapis.com https://*.gstatic.com",
  "font-src 'self' data:",
  "media-src 'self' https://cdn.sanity.io",
  "connect-src 'self' https://*.sanity.io wss://*.api.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://challenges.cloudflare.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Serve AVIF where supported (≈20–30% smaller than WebP), WebP otherwise.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Sanity-hosted newsroom images.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
