import { ImageResponse } from "next/og";

// Social share card: matches the November 2026 "proof sheet" direction
// (paper, ink, cobalt). No client artwork, same rule as the site header.
export const alt = "Vaugn Almeida, Senior Brand & Web Designer";
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
          backgroundColor: "#F2F1EC",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #D6D4CB",
            paddingBottom: 22,
            color: "#46453F",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>Senior Brand &amp; Web Designer</span>
          <span>Greater Manila Area · Remote</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#111110",
              fontSize: 150,
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: -6,
            }}
          >
            Vaugn Almeida
            <span style={{ color: "#2A3BD6" }}>.</span>
          </div>
          <div style={{ marginTop: 34, color: "#46453F", fontSize: 36 }}>
            Campaigns, brand guides and websites.
          </div>
        </div>
        <div style={{ display: "flex", color: "#2A3BD6", fontSize: 26 }}>
          vaugn-portfolio.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
