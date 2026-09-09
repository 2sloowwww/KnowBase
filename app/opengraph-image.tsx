import { ImageResponse } from "next/og";
import { getAllInvestigations } from "@/lib/data";

export const alt = "KNOWBASE — India's biggest frauds, ranked and sourced.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const total = getAllInvestigations().length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0b0b0d",
          color: "#f4f3ef",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          KNOW<span style={{ color: "#ff5a3c" }}>BASE</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: 22,
          }}
        >
          <div style={{ display: "flex", fontSize: 60, fontWeight: 600, lineHeight: 1.15, maxWidth: 1000 }}>
            What was promised. What happened.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a8a7a3", maxWidth: 900, lineHeight: 1.4 }}>
            A sourced record of India&apos;s biggest financial frauds and governance failures —
            ranked, dated, and linked to CAG reports, court records, and independent reporting.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#ff5a3c",
            borderTop: "1px solid #232327",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>{total} CASES · 1948–2026</div>
          <div style={{ display: "flex", color: "#6f6e6a" }}>knowbase.xyz</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
