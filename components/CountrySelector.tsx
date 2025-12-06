"use client";

import { useEffect, useState } from "react";

export default function CountrySelector() {
  const [data, setData] = useState<any>(null);
  const [clientCountry, setClientCountry] = useState<string | null>(null);

  // 🟢 Read cookie on client after hydration
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("country="));

    if (cookie) {
      setClientCountry(cookie.split("=")[1]); // "US" / "VN" etc.
    }
  }, []);

  // 🟢 Load Shopify localization
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/localization", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  async function changeCountry(iso: string) {
    window.location.href = `?country=${iso}`;
  }

  if (!data || !clientCountry) return null;

  return (
    <select
      className="border px-3 py-2 text-sm"
      value={clientCountry}  // 🟢 NOT data.country.isoCode
      onChange={(e) => changeCountry(e.target.value)}
    >
      {data.availableCountries.map((c: any) => (
        <option key={c.isoCode} value={c.isoCode}>
          {c.name} — {c.currency.isoCode}
        </option>
      ))}
    </select>
  );
}
