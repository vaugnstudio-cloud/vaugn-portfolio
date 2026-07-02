import { ImageResponse } from "next/og";

// Social-share card — matches the 2026 dark-editorial brand.
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
          backgroundColor: "#0D0D0B",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#F0662A",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Brand &amp; Web Designer
        </div>
        <div
          style={{
            color: "#F2EFE7",
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.05,
            maxWidth: 1000,
            letterSpacing: -1.5,
          }}
        >
          Brand &amp; web design that makes people trust you at first glance.
        </div>
        <div style={{ color: "#B3AFA4", fontSize: 29 }}>
          Vaugn Almeida · Healthcare · Hospitality · Growth businesses
        </div>
      </div>
    ),
    { ...size },
  );
}
