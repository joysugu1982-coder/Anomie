import { NextRequest, NextResponse } from "next/server";
import { getCart } from "@/lib/shopify";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  // ✔ FIX: cookies() must be awaited!
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  // ✔ get country from middleware
  const country = req.headers.get("x-country") || "US";

  if (!cartId) {
    return NextResponse.json({ count: 0 });
  }

  const cart = await getCart(cartId, country);
  const count = cart?.totalQuantity || 0;

  return NextResponse.json({ count });
}
