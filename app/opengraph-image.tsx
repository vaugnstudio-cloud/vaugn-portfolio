import { ImageResponse } from "next/og";

// Social-share card — matches the 2026 light/orange brand.
export const alt = "Vaugn Almeida — Brand & Marketing Designer";
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
          backgroundColor: "#ECEAE6",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#E85D1F",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Brand &amp; Marketing Designer
        </div>
        <div
          style={{
            color: "#15140F",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 980,
            letterSpacing: -1.5,
          }}
        >
          Design that makes small brands look like the ones people trust.
        </div>
        <div style={{ color: "#56524A", fontSize: 29 }}>
          Vaugn Almeida · Agency-trained · AI-enhanced · Remote
        </div>
      </div>
    ),
    { ...size },
  );
}
