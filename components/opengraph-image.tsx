import { ImageResponse } from "next/og";
import LogoIcon from "./icons/logo";

export const runtime = "edge";

export default function OpengraphImage() {
  const title = process.env.SITE_NAME || "My Store";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "black",
          color: "white",
          fontFamily: "sans-serif",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "40px",        // avoids extra child nodes
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            height: 160,
            width: 160,
            border: "1px solid #666",
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoIcon width="64" height="58" fill="white" />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 400,
          }}
        >
          Premium Fashion Store
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
