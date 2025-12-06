// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const auth = req.headers.get("Authorization");

//   if (!auth) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const token = auth.replace("Bearer ", "");

//   const res = await fetch(
//     "https://shopify.com/c/api/latest/customers/me/orders",
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "Shopify-Customer-Access-Token": token
//       }
//     }
//   );

//   const data = await res.json();
//   return NextResponse.json(data.orders || []);
// }


import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const auth = req.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = auth.replace("Bearer ", "");

  // Shopify Customer Account API endpoint
  const res = await fetch("https://shopify.com/c/api/2025-01/customers/me/orders", {
    method: "GET",
    headers: {
      "Shopify-Customer-Access-Token": token,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return NextResponse.json(data.orders ?? []);
}
