import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Nii Plants Group — a diversified Ghanaian business group across mobility, hospitality, and business services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded Open Graph card, generated at build time — no static asset needed. */
export default function OpengraphImage() {
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
            background: "radial-gradient(circle, rgba(183,148,82,0.45), transparent 65%)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <div style={{ width: 56, height: 2, background: "#b79452", display: "flex" }} />
          Nii Plants Group · Ghana
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            lineHeight: 1.1,
            fontWeight: 600,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Building businesses that move Africa forward.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
            display: "flex",
          }}
        >
          Mobility · Hospitality · Business Services — 8 companies, one standard.
        </div>
      </div>
    ),
    { ...size },
  );
}
