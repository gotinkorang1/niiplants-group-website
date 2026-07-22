/**
 * Canonical site URL — drives canonicals, sitemap, and (critically) the
 * absolute Open Graph image URLs that WhatsApp/LinkedIn/X fetch when a
 * link is shared. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this to the real domain before launch.
 *   2. Vercel's own deployment URL — so link previews work on preview and
 *      production deploys even before the domain is configured.
 *   3. Localhost, for development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Set automatically by Vercel; production domain when available.
  const vercelUrl =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl.replace(/\/$/, "")}`;

  return "http://localhost:3100";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Nii Plants Group";

export const siteDescription =
  "Nii Plants Group is a diversified Ghanaian business group — six companies across car rentals, vehicle leasing, logistics, travel, food, and office supplies.";

/**
 * WhatsApp number in international format, no "+" or spaces.
 * +233 59 388 5264 — the group's mobile line.
 * Confirm with the client that this line is WhatsApp-enabled.
 */
export const whatsappNumber = "233593885264";

/** Official social profiles — sourced from niiplantsghana.com and the YouTube channel. */
export const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/niiplants/" },
  { name: "Instagram", href: "https://www.instagram.com/p/CaSio08s5w7/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/nii-plants-car-rental/" },
  { name: "YouTube", href: "https://www.youtube.com/@niiplantscarrental867" },
];
