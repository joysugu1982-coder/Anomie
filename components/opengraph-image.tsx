import { ImageResponse } from "next/og";
import LogoIcon from "./icons/logo";
import path from "path";
import { promises as fs } from "fs";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME,
    },
    ...props,
  };

  // Load ALL fonts
  const gafitonFont = await fs.readFile(
    path.join(process.cwd(), "public/fonts/Gafiton.woff")
  );

  const montserratRegular = await fs.readFile(
    path.join(process.cwd(), "public/fonts/Montserrat-Regular.woff")
  );

  const montserratSemi = await fs.readFile(
    path.join(process.cwd(), "public/fonts/Montserrat-SemiBold.woff")
  );

  const nobileRegular = await fs.readFile(
    path.join(process.cwd(), "public/fonts/Nobile-Regular.woff")
  );

  const nobileBold = await fs.readFile(
    path.join(process.cwd(), "public/fonts/Nobile-Bold.woff")
  );

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">

        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>

        {/* Title using Nobile */}
        <p
          tw="mt-12 text-white"
          style={{
            fontFamily: "Nobile",
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          {title}
        </p>

        {/* Subtitle using Montserrat */}
        <p
          tw="mt-4 text-white"
          style={{
            fontFamily: "Montserrat",
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
      fonts: [
        {
          name: "Gafiton",
          data: gafitonFont,
          weight: 700,
          style: "normal",
        },
        {
          name: "Montserrat",
          data: montserratRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Montserrat",
          data: montserratSemi,
          weight: 600,
          style: "normal",
        },
        {
          name: "Nobile",
          data: nobileRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Nobile",
          data: nobileBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
