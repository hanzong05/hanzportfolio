import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${SITE.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated social-share card. Uses only system fonts so it builds without network access.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f5f2ea",
          color: "#0b1224",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 700 }}>
          {SITE.name}
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#2456e8", marginLeft: 12 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Digital products that solve real business problems.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#2456e8", fontWeight: 600 }}>
            {SITE.jobTitle} · WordPress · GoHighLevel · Next.js
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#4b5565" }}>
          hanzpillerva.dev · Open to freelance and remote work
        </div>
      </div>
    ),
    size,
  );
}
