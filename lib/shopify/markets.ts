import { getMarketsQuery } from "./queries/markets";

export async function getShopifyMarkets() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query: getMarketsQuery }),
  });

  if (!res.ok) throw new Error("Failed to fetch Shopify Markets");

  const json = await res.json();
  return json.data.markets.edges.map((edge: any) => edge.node);
}
