import { NextResponse } from "next/server";

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const query = `
    query {
      markets(first: 20) {
        edges {
          node {
            id
            name
            currencySettings {
              defaultCurrency {
                currencyCode
              }
            }
            countries {
              name
              countryCode
            }
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();

  return NextResponse.json(data?.data?.markets?.edges || []);
}
