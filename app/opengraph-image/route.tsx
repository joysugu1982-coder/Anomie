import { ImageResponse } from "next/og";
import LogoIcon from "@/components/icons/logo";

export const runtime = "edge";       // REQUIRED
export const dynamic = "force-dynamic"; // PREVENTS PRERENDER

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",        // <-- REQUIRED (NO TAILWIND)
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "1px solid #666",
            height: "160px",
            width: "160px",
            borderRadius: "24px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoIcon width="64" height="58" fill="white" />
        </div>

        <p
          style={{
            marginTop: "48px",
            color: "white",
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          {process.env.SITE_NAME || "Fashion Store"}
        </p>

        <p
          style={{
            marginTop: "16px",
            color: "white",
            fontSize: 32,
            fontWeight: 400,
            fontFamily: "sans-serif",
          }}
        >
          Premium Fashion Store
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
