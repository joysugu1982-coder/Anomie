import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    "https://shopify.com/c/api/2025-01/customers/me",
    {
      headers: {
        "Shopify-Customer-Access-Token": token,
        "Content-Type": "application/json",
      },
    }
  );

  const json = await res.json();
  return NextResponse.json(json);
}
