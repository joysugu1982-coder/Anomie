const API_VERSION = "2025-01";

export async function getLocalization(country: string = "US") {
  const query = `
    {
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

  const json = await res.json();
  return json.data.localization;
}
