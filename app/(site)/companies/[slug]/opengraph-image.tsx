import { ImageResponse } from "next/og";

import { companies } from "@/lib/companies";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Company overview — Niiplants Group";

/** Sector tint hexes mirrored from app/globals.css (CSS vars are unavailable in edge OG rendering). */
const tintHex: Record<string, string> = {
  "car-rentals": "#2f5d8a",
  logistics: "#5b7fb9",
  hospitality: "#b8912b",
  travel: "#f2431e",
  automotive: "#d9202b",
  food: "#c8102e",
  leasing: "#c8102e",
  office: "#8a8a80",
};

/**
 * Per-company link-preview card: sector-tinted accent on the shared
 * dark brand canvas, so each company page previews distinctly in
 * WhatsApp/LinkedIn/X while staying on-brand.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);
  const name = company?.name ?? "Niiplants Group";
  const sector = company?.sector ?? "Diversified services";
  const descriptor = company?.descriptor ?? "";
  const tint = tintHex[company?.tint ?? ""] ?? "#b79452";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(135deg, #0b1220 0%, #101b30 55%, #1e293b 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${tint}66, transparent 65%)`,
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <div style={{ width: 56, height: 3, background: tint, display: "flex" }} />
          Part of Niiplants Group · {sector}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            lineHeight: 1.1,
            fontWeight: 600,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {name}
        </div>
        {descriptor && (
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {descriptor}
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
