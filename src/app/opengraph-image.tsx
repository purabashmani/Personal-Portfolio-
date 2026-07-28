import { ImageResponse } from "next/og";

export const alt = "Purab Ashmaniwala — Entrepreneur & Aspiring Investor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social preview card, generated at build/request time.
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
          padding: "80px",
          background:
            "linear-gradient(135deg, #6D28D9 0%, #9333EA 45%, #DB2777 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            opacity: 0.85,
          }}
        >
          PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 90, fontWeight: 800, lineHeight: 1.05 }}>
            Purab Ashmaniwala
          </div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 24, opacity: 0.92 }}>
            Entrepreneur · Aspiring VC / PE Investor
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, opacity: 0.85 }}>
          Northeastern University · Finance &amp; Entrepreneurship
        </div>
      </div>
    ),
    { ...size }
  );
}
