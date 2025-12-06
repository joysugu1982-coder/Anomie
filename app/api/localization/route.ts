import { NextRequest, NextResponse } from "next/server";

const API_VERSION = "2025-01";

export async function GET(req: NextRequest) {
  try {
    const country = req.headers.get("x-country") || "US";

    const query = `
      query Localization {
        localization {
          availableCountries {
            isoCode
            name
            currency { isoCode symbol }
          }
          country {
            isoCode
            name
            currency { isoCode symbol }
          }
          language { isoCode }
        }
      }
    `;

    const res = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
          "Shopify-Storefront-Buyer-Country": country,
        },
        body: JSON.stringify({ query }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Shopify Localization API error:", await res.text());
      return NextResponse.json({ error: "Shopify API Error" }, { status: 500 });
    }

    const json = await res.json();
    return NextResponse.json(json.data.localization);

  } catch (err) {
    console.error("Localization API crashed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
