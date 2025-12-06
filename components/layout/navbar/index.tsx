"use client";

import Link from "next/link";
import MobileMenu from "./mobilemenu";
import CartModal from "@/components/cart/modal";
import Dropdown from "./dropdown";
import SearchDropdown from "./SearchDropdown";
import { useCart } from "@/components/cart/cart-context";

export default function Navbar({ menu }: { menu: any[] }) {
  const { cart } = useCart();

  const collectionItems = menu.map((item) => ({
    title: item.title,
    url: item.path,
  }));

  return (
    <nav className="flex items-center justify-between px-4 py-4 lg:px-6">

      {/* MOBILE LEFT */}
      <div className="md:hidden flex items-center">
        <MobileMenu menu={menu} />
      </div>

      {/* DESKTOP LEFT */}
      <div className="hidden md:flex md:items-center md:gap-6">
        <Link href="/" className="text-lg tracking-widest">SD</Link>

        <Dropdown
          label="Collections"
          items={collectionItems}
          link="/collections"
        />
      </div>

      {/* CENTER LOGO */}
      <div className="flex items-center justify-center flex-1">
        <Link href="/" className="gafiton text-xl tracking-widest">
  ANOMIE
</Link>

      </div>

      {/* DESKTOP RIGHT */}
      <div className="hidden md:flex items-center gap-6">
        <SearchDropdown label="Search" />

        <Link href="/auth/login" className="text-sm uppercase tracking-wider">
  Account
</Link>


        <CartModal desktopTextOnly />
      </div>

      {/* MOBILE RIGHT */}
      <div className="md:hidden flex items-center gap-4">

        {/* SEARCH */}
        <Link href="/search">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
          </svg>
        </Link>

        {/* ACCOUNT */}
        <Link href="/account">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 1 1 15 0" />
          </svg>
        </Link>

        <CartModal />
      </div>
    </nav>
  );
}
