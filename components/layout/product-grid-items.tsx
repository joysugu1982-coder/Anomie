import { Product } from "@/lib/shopify/types";
import Grid from "../grid";
import Link from "next/link";
import Price from "@/components/price";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => {
        const firstVariant = product.variants[0];

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link
              href={`/product/${product.handle}`}
              className="relative inline-block h-full w-full group"
              prefetch={true}
            >
              {/* DEFAULT IMAGE */}
              <img
                src={product.images?.[0]?.url}
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* HOVER IMAGE */}
              {product.images?.[1] && (
                <img
                  src={product.images?.[1]?.url}
                  alt={product.title}
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}

              {/* Title + FORMATTED PRICE */}
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-2 text-sm">
                <p>{product.title}</p>

                <Price 
                  amount={firstVariant.price.amount}
                  currencyCode={firstVariant.price.currencyCode}
                />
              </div>
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
