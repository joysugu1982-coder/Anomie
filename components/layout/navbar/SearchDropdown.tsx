"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchDropdownProps {
  label: string;
  link?: string; // <-- now optional
}


export default function SearchDropdown({ label, link }: SearchDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* NAV BUTTON */}
      <button
  onClick={() => link && router.push(link)}
  className="uppercase tracking-[0.25em] text-[13px] font-medium hover:opacity-60 transition"
>
  {label}
</button>


      {/* 🔥 HOVER BRIDGE (SOLVES FLICKER) */}
      {open && (
        <div
          className="
            absolute left-0 top-full 
            w-full h-8     /* small hover area */
            z-40
          "
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        />
      )}

      {/* SMALL DROPDOWN */}
      {open && (
        <div
          className="
            absolute 
            left-0 
            top-[calc(100%+8px)]
            bg-white 
            border border-neutral-200
            shadow-lg
            p-4
            -ml-20
            rounded-md
            w-[260px]
            z-50
          "
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            {/* SEARCH INPUT */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="
                border border-neutral-300 
                px-3 py-2
                text-sm
                rounded-md
                focus:outline-none
                focus:ring-1 focus:ring-black
              "
            />

            {/* SEARCH BUTTON BELOW */}
            <button
              type="submit"
              className="
                w-full
                bg-black text-white
                px-4 py-2
                text-sm 
                rounded-md
                hover:bg-neutral-800
              "
            >
              Search
            </button>

          </form>
        </div>
      )}
    </div>
  );
}
