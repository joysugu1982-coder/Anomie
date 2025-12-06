import ProseFooter from "@/components/ProseFooter";
import { getPage } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await props.params;

  const data = await getPage(handle);
  if (!data) return notFound();

  return {
    title: data.title,
    description: data.bodySummary,
  };
}

export default async function Page(props: { params: Promise<{ handle: string }> }) {
  const { handle } = await props.params;

  const data = await getPage(handle);
  if (!data) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold text-black">{data.title}</h1>

      {/* ✅ Use footer prose HERE — not outside */}
      <ProseFooter className="mb-8" html={data.body} />

      <p className="text-sm italic text-gray-600">
        Last updated on{" "}
        {new Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(data.updatedAt))}
      </p>
    </>
  );
}
