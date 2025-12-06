import { Product } from "@/lib/shopify/types";
import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../ProseProduct";
import { AddToCart } from "@/components/cart/add-to-cart";

export function ProductDescription({ product }: { product: Product }) {

  // ✅ ALWAYS USE LOCALIZED VARIANT PRICE
  const firstVariant = product.variants[0];

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium text-white">{product.title}</h1>

        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={firstVariant.price.amount}
            currencyCode={firstVariant.price.currencyCode}
          />
        </div>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-light dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart product={product} />
    </>
  );
}
