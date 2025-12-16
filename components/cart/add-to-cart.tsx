"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "../product/product-context";
import { useCart } from "./cart-context";
import { useActionState } from "react";
import { addItem } from "./actions";
import { PlusIcon } from "@heroicons/react/24/outline";

function SubmitButton({ availableForSale }: { availableForSale: boolean }) {
  const base =
    "flex w-full items-center justify-center bg-black py-4 text-sm font-medium uppercase tracking-widest text-white transition-opacity";

  if (!availableForSale) {
    return <button disabled className={base + " opacity-60"}>Out of Stock</button>;
  }

  return (
    <button aria-label="Add to cart" className={base + " hover:opacity-80"}>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem, openCart } = useCart();
  const { state } = useProduct();

  const [msg, formAction] = useActionState(addItem, null);

  // Find correct variant
  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (opt) => opt.value === state[opt.name.toLowerCase()]
    )
  );

  const selectedVariantId =
    variant?.id || (variants.length === 1 ? variants[0].id : undefined);

  const finalVariant = variants.find((v) => v.id === selectedVariantId)!;

  return (
    <form
      action={async (formData) => {
        formData.append("variantId", selectedVariantId!);

        // Optimistic update
        addCartItem(finalVariant, product);
        openCart();

        // Server update
        await formAction(formData);
      }}
    >
      <input type="hidden" name="variantId" value={selectedVariantId} />

      <SubmitButton availableForSale={availableForSale} />

      <p className="sr-only">{msg}</p>
    </form>
  );
}

export default AddToCart; // ✅ FIX
