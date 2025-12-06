import { ImageResponse } from "next/og";
import LogoIcon from "./icons/logo";

export const runtime = "edge";

export default async function OpengraphImage() {
  const title = process.env.SITE_NAME || "My Store";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* FIXED: MUST ADD display:flex HERE */}
        <div
          style={{
            display: "flex",
            height: 160,
            width: 160,
            border: "1px solid #666",
            borderRadius: "24px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoIcon width="64" height="58" fill="white" />
        </div>

        {/* FIXED: P TAG MUST HAVE display:flex TOO */}
        <p
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          {title}
        </p>

        <p
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 32,
            fontWeight: 400,
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
