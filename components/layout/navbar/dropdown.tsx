"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DropdownProps {
  label: string;
  items: { title: string; url: string }[];
  link: string;
}

export default function Dropdown({ label, items, link }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

      {/* 🔥 HOVER BRIDGE — fixed flicker forever */}
      {open && (
        <div
          className="absolute left-0 top-full w-full h-10 z-40"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        />
      )}

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute 
            left-0
            -ml-20
            right-150
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
          <div className="max-w-[1400px] mx-auto px-16 grid grid-cols-3 gap-20">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="
                  uppercase 
                  text-[13px] 
                  tracking-[0.20em]
                  text-neutral-700 
                  hover:text-black 
                  transition
                  block
                "
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
