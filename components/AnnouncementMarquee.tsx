"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const messages = [
  { text: "discover holiday gift shop", link: "/collections/holiday-gift-shop" },
  { text: "aries x salomon xt-whisper - limited size restock", link: "/collections/aries-x-salomon-xt-whisper" },
  { text: "Black Friday - up to 50% off", link: "/collections/sale" },
];

export default function AnnouncementMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const content = marqueeRef.current.innerHTML;
    marqueeRef.current.innerHTML = content + content + content;
  }, []);

  return (
    <div className="w-full border-b bg-white overflow-hidden">
      <div
        ref={marqueeRef}
        className="flex gap-16 py-3 animate-marquee whitespace-nowrap px-4"
      >
        {messages.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="text-sm font-medium text-gray-800 hover:underline"
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
