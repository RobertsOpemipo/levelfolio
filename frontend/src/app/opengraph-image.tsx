import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Levelfolio — The Archive";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f6f4ef",
          padding: "64px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle Archival Border Grid */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "2px solid #e4e0d6",
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />

        {/* Top Header Row with Folder Tab Mark & Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <svg width="84" height="84" viewBox="0 0 64 64" fill="none">
            <path
              d="M6 14a4 4 0 0 1 4-4h14l5 6h25a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"
              fill="#1d3557"
            />
            <path
              d="M21 43l11-12 11 12"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M6 20h52" stroke="#c2410c" strokeWidth="3" />
          </svg>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#1c2430",
                letterSpacing: "-1px",
              }}
            >
              Level<span style={{ color: "#c2410c" }}>folio</span>
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#c2410c",
                textTransform: "uppercase",
              }}
            >
              The Archive
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#1c2430",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Learn it. File it. Level up.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#5b6472",
              lineHeight: 1.4,
            }}
          >
            Gamified corporate onboarding, mandatory compliance, and skills training as an auditable personal archive.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", gap: "18px" }}>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #e4e0d6",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1c2430",
            }}
          >
            📁 Folder Tab Architecture
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #e4e0d6",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1c2430",
            }}
          >
            🛡️ Postgres RLS Tenant Isolation
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #e4e0d6",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1c2430",
            }}
          >
            📜 Serialized Certifications
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}