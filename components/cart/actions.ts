"use server";

import { TAGS } from "@/lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getCountry() {
  const cookieStore = await cookies();
  return cookieStore.get("country")?.value || "US";
}

async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get("cartId")?.value;
}

async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { path: "/" });
}

export async function createCartAndSetCookie() {
  const country = await getCountry();
  const newCart = await createCart(country);
  await setCookie("cartId", newCart.id!);
  return newCart;
}

/** ADD ITEM */
export async function addItem(prevState: any, formData: FormData) {
  const variantId = formData.get("variantId")?.toString();
  if (!variantId) return "Missing variant";

  let cartId = await getCartId();
  const country = await getCountry();

  if (!cartId) {
    const newCart = await createCartAndSetCookie();
    cartId = newCart.id!;
  }

  await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }], country);
  revalidateTag(TAGS.cart);

  return null;
}

/** UPDATE QTY */
/** UPDATE QTY */
export async function updateItemQuantity(
  prev: any,
  payload: { merchandiseId: string; quantity: number }
) {
  const cartId = await getCartId();
  const country = await getCountry();

  if (!cartId) return;

  const { merchandiseId, quantity } = payload;
  const cart = await getCart(cartId, country);
  if (!cart) return;

  const line = cart.lines.find((l) => l.merchandise.id === merchandiseId);

if (!line) {
  // No existing line → means Shopify doesn't have this item yet
  await addToCart(cartId, [{ merchandiseId, quantity }], country);
  revalidateTag(TAGS.cart);
  return;
}

if (!line.id) {
  // Shopify line exists but missing id — fallback add
  await addToCart(cartId, [{ merchandiseId, quantity }], country);
  revalidateTag(TAGS.cart);
  return;
}

// At this point line.id IS 100% a valid string
await updateCart(
  cartId,
  [{ id: line.id, merchandiseId, quantity }],
  country
);

revalidateTag(TAGS.cart);
}

/** REMOVE */
export async function removeItem(prev: any, merchandiseId: string) {
  const cartId = await getCartId();
  const country = await getCountry();
  if (!cartId) return;

  const cart = await getCart(cartId, country);
  if (!cart) return;

  const line = cart.lines.find((l) => l.merchandise.id === merchandiseId);
  if (!line?.id) return;

  await removeFromCart(cartId, [line.id], country);
  revalidateTag(TAGS.cart);
}


/** CHECKOUT */
export async function redirectToCheckout() {
  const country = await getCountry();
  const cartId = await getCartId();
  if (!cartId) return;

  const cart = await getCart(cartId, country);
  if (!cart) return;

  redirect(cart.checkoutUrl);
}
