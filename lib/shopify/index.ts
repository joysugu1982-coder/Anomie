import { NextRequest, NextResponse } from "next/server";
import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "../constants";
import { ensureStartWith } from "../utils";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries/product";

import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { getPageQuery, getPagesQuery } from "./queries/page";

import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "./types";


const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
console.log("USING SHOPIFY TOKEN:", process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);


type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

/* -------------------------------------------------------------------------- */
/*                           SHOPIFY FETCH (FIXED)                            */
/* -------------------------------------------------------------------------- */
export async function shopifyFetch<T>({
  cache = "force-cache",
  extraHeaders,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  extraHeaders?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}) {
  // ✔ REAL FIX — correct headers import
  const h = await headers();
  const country = h.get("x-country") || "US";

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": key!,
      "Shopify-Storefront-Buyer-Country": country,
      ...extraHeaders,
    },
    body: JSON.stringify({
      query,
      variables: {
        ...(variables || {}),
        country,
      },
    }),
    cache,
    ...(tags && { next: { tags } }),
  });

  const body = await result.json();
  if (body.errors) throw body.errors[0];

  return { status: result.status, body };
}

/* -------------------------------------------------------------------------- */
/*                            HELPERS (unchanged)                             */
/* -------------------------------------------------------------------------- */

function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
  return array.edges.map((edge) => edge?.node);
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
  const flattened = removeEdgesAndNodes(images);
  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
}



function reshapeProduct(product: ShopifyProduct, filterHiddenProducts = true) {
  if (!product) return undefined;

  const tags = product.tags || [];

  if (filterHiddenProducts && tags.includes(HIDDEN_PRODUCT_TAG)) return undefined;

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  };
}


function reshapeProducts(products: ShopifyProduct[]) {
  return products
    .map((p) => reshapeProduct(p))
    .filter((p): p is Product => Boolean(p));
}

/* -------------------------------------------------------------------------- */
/*                             PUBLIC API FUNCTIONS                           */
/* -------------------------------------------------------------------------- */

export async function getMenu(handle: string): Promise<Menu[]> {
  if (!handle) return [];

  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: { handle },
  });

  const items = res.body?.data?.menu?.items;
  if (!items) return [];

  return items
    .map((item: any) => {
      let path = item.url
        .replace(domain, "")
        .replace("/collections", "/search")
        .replace("/pages", "/page");

      if (item.url.includes("/pages/")) {
        const h = item.url.split("/pages/")[1];
        if (!h) return null;
        path = `/page/${h}`;
      }

      return { title: item.title, path };
    })
    .filter(Boolean);
}



export async function getProducts(args: any): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: args,
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });

  const edges = res.body?.data?.collections?.edges;
  if (!edges) return [];

  const collections = edges.map((e: any) => e.node);

  return [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: { title: "All", description: "All products" },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    ...collections
      .map((c: any) => ({
 ...c, path: `/search/${c.handle}` }))
      .filter((c: any) => !c.handle.startsWith("hidden")),
  ];
}

export async function getCollectionProducts({
  handle,
  sortKey,
  reverse,
  country
}: {
  handle: string;
  sortKey?: string;
  reverse?: boolean;
  country?: string;
}) {
  if (!handle) return [];

  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: { handle, sortKey, reverse, country },
  });

  if (!res.body.data.collection) return [];
  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}



export async function getProduct(handle: string) {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: { handle },
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string) {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: { productId },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

/* ------------------------------- CART FUNCTIONS --------------------------- */

function reshapeCart(cart: ShopifyCart): Cart {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = { amount: "0.0", currencyCode: "USD" };
  }

  return { ...cart, lines: removeEdgesAndNodes(cart.lines) };
}

export async function createCart(country: string): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
    variables: { country },
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(cartId: string | undefined, country: string) {
  if (!cartId) return undefined;

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId, country },
    tags: [TAGS.cart],
  });

  if (!res.body.data.cart) return undefined;
  return reshapeCart(res.body.data.cart);
}

export async function addToCart(cartId: string, lines: any[], country: string) {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: { cartId, lines, country },
    cache: "no-cache",
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function updateCart(cartId: string, lines: any[], country: string) {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: { cartId, lines, country },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[], country: string) {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds, country },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

/* ------------------------------- REVALIDATION ------------------------------ */

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const h = await headers(); // correct import
  const topic = h.get("x-shopify-topic") || "unknown";

  const secret = req.nextUrl.searchParams.get("secret");

  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];

  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];

  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) revalidateTag(TAGS.collections);
if (isProductUpdate) revalidateTag(TAGS.products);



  return NextResponse.json({
    status: 200,
    revalidated: true,
    now: Date.now(),
  });
}

export async function getPage(handle: string) {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    cache: "no-store",
    variables: { handle },
  });
  return res.body.data.pageByHandle;
}

export async function getPages() {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
    cache: "no-store",
  });
  return removeEdgesAndNodes(res.body.data.pages);
}
