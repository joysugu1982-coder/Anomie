"use client";

import Link from "next/link";

import CountrySelector from "@/components/CountrySelector"; // ← IMPORTED
import dynamic from "next/dynamic"

const KlaviyoForm = dynamic(() => import("@/components/klaviyo/KlaviyoForm"), { ssr: false })

export default function Footer() {
  return (
    <footer className="w-full border-t pt-10 pb-14 px-5 sm:px-6 md:px-14 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-8 md:gap-12">

        {/* JOIN LIST */}
        <div>
          <h3 className="text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">JOIN OUR LIST</h3>
          <KlaviyoForm />

        </div>

        {/* LEARN */}
<div>
  <h3 className="text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">LEARN</h3>
  <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700">
    <li><Link href="/about">ABOUT</Link></li>
    <li><Link href="/faqs">FAQS</Link></li>
    <li><Link href="/locations">LOCATIONS</Link></li>
    <li><Link href="/contact">CONTACT US</Link></li>
  </ul>
</div>

{/* POLICIES */}
<div>
  <h3 className="text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">POLICIES</h3>
  <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700">
    <li><Link href="/cookie-policy">COOKIE POLICY</Link></li>
    <li><Link href="/data-sharing-opt-out">PRIVACY POLICY</Link></li>
    <li><Link href="/terms-conditions">TERMS & CONDITIONS</Link></li>
    <li><Link href="/accessibility">ACCESSIBILITY STATEMENT</Link></li>
  </ul>
</div>


        {/* FOLLOW */}
        <div>
          <h3 className="text-xs md:text-sm font-semibold tracking-wide mb-3 md:mb-4">FOLLOW US</h3>
          <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700">
            <li><Link href="https://instagram.com">INSTAGRAM</Link></li>
            <li><Link href="https://facebook.com">FACEBOOK</Link></li>
            <li><Link href="https://tiktok.com">TIKTOK</Link></li>
            <li><Link href="https://youtube.com">YOUTUBE</Link></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-5 sm:gap-6 border-t pt-8">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">SELECT COUNTRY</span>

          {/* WORKING SELECTOR */}
          <CountrySelector />
        </div>
      </div>
    </footer>
  );
}
