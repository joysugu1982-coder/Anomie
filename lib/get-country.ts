import { headers } from "next/headers";

export async function getCountry() {
  try {
    const h = await headers();
    return h.get("x-country") || "US";
  } catch {
    return "US";
  }
}
