import { ImageResponse } from "next/og";
import { getAllSlugs, getInvestigationBySlug } from "@/lib/data";
import { STATUS_META } from "@/lib/types";

export const alt = "Promise vs. reality share card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const STATUS_HEX: Record<string, string> = {
  convicted: "#f87171",
  "confirmed-unresolved": "#fb923c",
  "under-trial": "#fbbf24",
  "acquitted-or-closed": "#9c9c98",
  disputed: "#e879f9",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inv = getInvestigationBySlug(slug);

  if (!inv) {
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
            color: "#f4f3ef",
            fontSize: 64,
          }}
        >
          KNOWBASE
        </div>
      ),
      { ...size }
    );
  }

  const statusColor = STATUS_HEX[inv.status];
  const statusLabel = STATUS_META[inv.status].label;

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
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            KNOWBASE
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: statusColor,
              border: `2px solid ${statusColor}`,
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            {statusLabel.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", fontSize: 42, fontWeight: 600, lineHeight: 1.15, maxWidth: 1000 }}>
            {inv.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16, maxWidth: 1040 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 16, color: "#a8a7a3", textTransform: "uppercase", letterSpacing: 2 }}>
                Promise
              </div>
              <div style={{ display: "flex", fontSize: 26, marginTop: 4, color: "#f4f3ef", lineHeight: 1.3 }}>
                {inv.gap.targetDisplay ?? `${inv.gap.targetValue} ${inv.gap.unit}`}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 16, color: "#a8a7a3", textTransform: "uppercase", letterSpacing: 2 }}>
                Reality
              </div>
              <div style={{ display: "flex", fontSize: 26, marginTop: 4, color: "#ff5a3c", fontWeight: 700, lineHeight: 1.3 }}>
                {inv.gap.actualDisplay ?? `${inv.gap.actualValue} ${inv.gap.unit}`}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#6f6e6a",
            borderTop: "1px solid #232327",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>{inv.category}</div>
          <div style={{ display: "flex" }}>{inv.id}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
