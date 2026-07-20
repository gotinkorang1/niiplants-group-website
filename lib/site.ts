/**
 * Site-wide constants. NEXT_PUBLIC_SITE_URL should be set to the real
 * production domain before launch — confirm the group's domain with the
 * client (placeholder below is assumed, not registered/verified).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://niiplantsgroup.com";

export const siteName = "Niiplants Group";

export const siteDescription =
  "Niiplants Group is a diversified Ghanaian business group — eight companies across car rentals, vehicle leasing, automotive, logistics, serviced apartments, travel, food, and office supplies.";

/**
 * WhatsApp number in international format, no "+" or spaces.
 * 059 383 5941 — the mobile line published on niiplantsghana.com.
 * Confirm with the client that this line is WhatsApp-enabled.
 */
export const whatsappNumber = "233593835941";

/** Official social profiles — sourced from niiplantsghana.com and the YouTube channel. */
export const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/niiplants/" },
  { name: "Instagram", href: "https://www.instagram.com/p/CaSio08s5w7/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/nii-plants-car-rental/" },
  { name: "YouTube", href: "https://www.youtube.com/@niiplantscarrental867" },
];
