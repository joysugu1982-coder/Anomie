"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/layout/navbar/search";

interface SearchDropdownProps {
  label: string
  link: string
}

export default function SearchDropdown({ label, link }: SearchDropdownProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* NAV ITEM */}
      <button
        onClick={() => router.push(link)}
        className="uppercase tracking-[0.25em] text-[13px] font-medium hover:opacity-60 transition"
      >
        {label}
      </button>

      {/* HOVER BRIDGE */}
      {open && (
        <div
          className="absolute left-0 top-full w-full h-10 z-40"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        />
      )}

      {/* DROPDOWN - Full screen width */}
      {open && (
        <div
          className="
            fixed
            left-0
            right-0
            top-[60px]
            w-full
            bg-white 
            border-t 
            py-10 
            shadow-sm 
            z-50
          "
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex justify-end">
              <div className="w-full max-w-[420px]">
                <Search onFocus={() => setOpen(true)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
