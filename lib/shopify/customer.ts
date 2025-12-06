const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontKey = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const API_VERSION = "2025-01"; // ⭐ use latest stable version

// --------------------- CREATE CUSTOMER ----------------------
export async function createCustomer(name: string, email: string, password: string) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontKey
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          firstName: name,
          email,
          password
        }
      }
    })
  });

  return res.json();
}


// -------------- VERIFY CUSTOMER ACCOUNT (ACTIVATION CODE) -------------
export async function activateCustomer(id: string, activationToken: string) {
  const query = `
    mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
      customerActivate(id: $id, input: $input) {
        customer { id }
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors { message }
      }
    }
  `;

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontKey
    },
    body: JSON.stringify({
      query,
      variables: {
        id,
        input: { activationToken }
      }
    })
  });

  return res.json();
}


// -------------------------- LOGIN --------------------------
export async function loginCustomer(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors { message }
      }
    }
  `;

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontKey
    },
    body: JSON.stringify({
      query,
      variables: {
        input: { email, password }
      }
    })
  });

  return res.json();
}
