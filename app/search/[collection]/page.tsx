import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";
import { headers } from "next/headers";


export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  // 🔥 READ COUNTRY FROM MIDDLEWARE HEADER
  const h = await headers();
  const country = h.get("x-country") || "US";

  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : undefined;

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // 🔥 PASS COUNTRY INTO THE QUERY
  const products = await getCollectionProducts({
    handle: params.collection,
    sortKey,
    reverse,
    country,
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">No products found in this collection</p>
      ) : (
        <Grid className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}