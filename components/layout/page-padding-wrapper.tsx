"use client";

import { usePathname } from "next/navigation";

export default function PagePaddingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div className={isHome ? "" : "pt-[90px]"}>
      {children}
    </div>
  );
}
