import { ImageResponse } from "next/og";

// Default social-share card for every page (Phase 5: Meta tags and OG image).
export const alt = "Vaugn Almeida — Brand & Web Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0D0D",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#2E6FD9",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Brand &amp; Web Designer
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 960,
            letterSpacing: -1,
          }}
        >
          Visual systems that build credibility and convert.
        </div>
        <div style={{ color: "#888888", fontSize: 30 }}>
          Vaugn Almeida · Agency-trained · Healthcare-fluent
        </div>
      </div>
    ),
    { ...size },
  );
}
