"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// collections dropdown does not include the search box

interface DropdownItem {
  title: string
  url: string
}

interface DropdownProps {
  label: string
  link: string
  items?: DropdownItem[]
}

export default function Dropdown({ label, link, items = [] }: DropdownProps) {
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

      {/* DROPDOWN CONTENT */}
      {open && (
        <div
          className="
            absolute 
            left-0
            -ml-20
            top-10
            w-screen 
            bg-white 
            border-t 
            py-10 
            shadow-sm 
            z-50
          "
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="max-w-[1400px] mx-auto px-16">
            <div className="grid grid-cols-1 gap-6">
              <div>
                {items.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {items.map((it) => (
                      <div key={it.url} className="py-2">
                        <a href={it.url} className="block text-sm font-medium hover:underline">
                          {it.title}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">No collections available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
