import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const countryFromQuery = url.searchParams.get("country");

  // 1️⃣ Save the country cookie when ?country=X is used
  if (countryFromQuery) {
    const cleanUrl = url.clone();
    cleanUrl.searchParams.delete("country");

    const res = NextResponse.redirect(cleanUrl);

    res.cookies.set("country", countryFromQuery, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    // Reset Shopify cart
    res.cookies.set("cartId", "", { maxAge: 0 });

    return res;
  }

  // 2️⃣ Forward saved country as header
  const savedCountry = req.cookies.get("country")?.value || "US";

  const headers = new Headers(req.headers);
  headers.set("x-country", savedCountry);

  // IMPORTANT FIX: forward headers to all pages AND API routes
  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/|_static/|.*\\..*).*)"],
};
