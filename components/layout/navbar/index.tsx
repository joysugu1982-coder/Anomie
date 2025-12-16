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
    <nav className="flex items-center justify-between px-4 py-3 md:py-4 md:px-6 text-inherit">

      {/* MOBILE LEFT */}
      <div className="md:hidden flex items-center relative z-10">
        <MobileMenu menu={menu} />
      </div>

      {/* DESKTOP LEFT */}
      <div className="hidden md:flex md:items-center md:gap-6">
        <Link href="/" className="text-sm font-medium uppercase tracking-[0.28em] text-inherit hover:text-black transition-colors">SD</Link>

        <Dropdown
          label="Collections"
          items={collectionItems}
          link="/collections"
        />
      </div>

      {/* CENTER LOGO */}
      <div className="flex items-center justify-center flex-1 pointer-events-none">
        <Link href="/" className="gafiton text-xl md:text-2xl tracking-[0.38em] text-inherit pointer-events-auto">
  ANOMIE
</Link>

      </div>

      {/* DESKTOP RIGHT */}
      <div className="hidden md:flex items-center gap-6 text-inherit">
        <SearchDropdown label="Search" link="/search" />


        <Link href="/auth/login" className="text-xs uppercase tracking-[0.22em] text-inherit hover:text-black transition-colors">
  Account
</Link>


        <CartModal desktopTextOnly />
      </div>

      {/* MOBILE RIGHT */}
      <div className="md:hidden flex items-center gap-3 relative z-20 text-inherit">
        {/* ACCOUNT */}
        <Link 
          href="/account"
          className="p-2 -m-2 touch-manipulation"
          aria-label="Account"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 1 1 15 0" />
          </svg>
        </Link>

        <CartModal />
      </div>
    </nav>
  );
}
