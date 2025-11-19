import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import LogoIcon from "./icons/logo";

export const runtime = "nodejs"; // IMPORTANT FIX

export type Props = { title?: string };

export default async function OpengraphImage(props?: Props) {
  const title = props?.title || process.env.SITE_NAME;

  const fontPath = path.join(process.cwd(), "app", "fonts", "Gafiton-Rounded.ttf");

  const fontData = await readFile(fontPath);

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>

        <p tw="mt-12 text-6xl text-white" style={{ fontFamily: "Gafiton" }}>
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Gafiton",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
