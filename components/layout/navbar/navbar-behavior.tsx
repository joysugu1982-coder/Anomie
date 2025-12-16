"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavbarBehavior({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHome) {
    const active = scrolled || hovered;

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed top-0 left-0 w-full z-[999] transition-colors duration-300 ${
          active ? "bg-white text-black shadow-sm" : "bg-transparent text-white"
        }`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-[999] bg-white text-black shadow-sm">
      {children}
    </div>
  );
}
