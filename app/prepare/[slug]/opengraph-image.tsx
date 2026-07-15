import { ImageResponse } from "next/og";
import { getPreparePage } from "@/lib/prepare";

export const runtime = "edge";
export const alt = "Apply — Company Prep Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPreparePage(slug);

  if (!page) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0f2a3d 0%, #123447 50%, #0d5c56 100%)",
            color: "white",
            fontFamily: "sans-serif"
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.7 }}>Apply</div>
          <div style={{ fontSize: 48, fontWeight: 800, marginTop: 16 }}>Company Prep Guide</div>
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          background: "linear-gradient(135deg, #0f2a3d 0%, #123447 50%, #0d5c56 100%)",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#7fd9c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#0f2a3d"
            }}
          >
            A
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, opacity: 0.8 }}>Apply</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#7fd9c7",
              textTransform: "uppercase",
              letterSpacing: 2
            }}
          >
            {page.companyName} · Prep Guide
          </span>
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: 1000
            }}
          >
            {page.title.length > 80
              ? page.title.slice(0, 80) + "..."
              : page.title}
          </span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 20, opacity: 0.6 }}>
          <span>{page.readingTime}</span>
          <span>·</span>
          <span>apply.neexmeet.com</span>
        </div>
      </div>
    ),
    size
  );
}
