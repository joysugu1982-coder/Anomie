import OpengraphImage from "@/components/opengraph-image";

export const runtime = "nodejs";

export async function GET() {
  return await OpengraphImage();
}
