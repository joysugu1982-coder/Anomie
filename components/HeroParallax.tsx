"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function HeroParallax() {

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY;

      // vertical parallax
      const bg = document.getElementById("parallax-bg");
      const fg = document.getElementById("parallax-fg");
      const text = document.getElementById("parallax-text");

      if (bg) bg.style.transform = `translateY(${scrolled * 0.15}px)`;
      if (fg) fg.style.transform = `translateY(${scrolled * 0.35}px)`;
      if (text) text.style.transform = `translateY(${scrolled * 0.55}px)`;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[140vh] overflow-hidden">

      {/* BACKGROUND (slow vertical) */}
      <Image
        id="parallax-bg"
        src="/banner.jpg"
        alt="Background"
        fill
        className="object-cover absolute"
      />

      {/* TEXT ON TOP (fast vertical move) */}
      <h1
        id="parallax-text"
        className="absolute top-[20%] w-full text-center 
        text-white text-5xl md:text-7xl font-bold tracking-[0.3em] z-20"
      >
        NEW COLLECTION
      </h1>

      {/* PRODUCT IN THE MIDDLE (medium vertical move) */}
      <div className="absolute top-[45%] w-full flex justify-center z-10">
        <Image
          id="parallax-fg"
          src="/tshirt.png"
          width={500}
          height={500}
          alt="Product"
          className="drop-shadow-2xl"
        />
      </div>

    </section>
  );
}
