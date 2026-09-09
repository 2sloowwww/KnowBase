import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#0b0b0d",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#ff5a3c",
            fontSize: 42,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: -2,
          }}
        >
          K
        </div>
      </div>
    ),
    { ...size }
  );
}
