import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// "PA" monogram favicon on the brand gradient.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6D28D9, #DB2777)",
          color: "white",
          fontSize: 17,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 7,
        }}
      >
        PA
      </div>
    ),
    { ...size }
  );
}
