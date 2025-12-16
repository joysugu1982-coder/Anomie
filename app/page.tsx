import Image from "next/image";
import Link from "next/link";
import AutoScrollRow from "@/components/layout/auto-scroll-row";
import Price from "@/components/price";
import { headers } from "next/headers";

import { getCollectionProducts } from "@/lib/shopify";

export const metadata = {
  description: "High-performance e-commerce store built with Next.js, Vercel, and Shopify.",
  openGraph: { type: "website" }
};

export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function Home() {

  // ✅ Read selected country from middleware header
  const h = await headers();
  const country = h.get("x-country") || "US";

  // ✅ IMPORTANT — pass country
  const products = await getCollectionProducts({
  handle: "new-drops",
  country,
});

console.log("COUNTRY FROM HEADER:", country);

  return (
    <main className="flex-1">

      {/* =============================== */}
      {/* 🔥 FULLSCREEN REPRESENT STYLE HERO */}
      {/* =============================== */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/image1.png"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />

        {/* Centered Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
  <h1 className="gafiton text-5xl md:text-7xl tracking-wide ">
    ANOMIE
  </h1>
</div>

      </section>

      {/* =============================== */}
      {/* 🔥 THIN REPRESENT-STYLE PRODUCT STRIP */}
      {/* =============================== */}
      <section className="w-full py-14">
        {/* No side padding so images touch full width */}
        <div className="w-full px-0">

          {/* SECTION HEADER */}
          <div className="flex items-center justify-between px-6 md:px-12 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">New Drops</h2>
          </div>

          {/* PRODUCTS STRIP (AUTO-SCROLLING) */}
          <AutoScrollRow className="overflow-x-auto scrollbar-hide w-full">
            <div className="flex gap-3 sm:gap-4 px-4">

              {products.map((p) => {
                const img = p.images?.[0]?.url;
                const price = p.variants?.[0]?.price?.amount;

                return (
                  <Link
                    key={p.id}
                    href={`/product/${p.handle}`}
                    className="min-w-[180px] sm:min-w-[240px] flex-shrink-0"
                  >
                    {/* Product image */}
                    <div className="w-full h-[240px] sm:h-[300px] bg-gray-100 overflow-hidden">
                      <img
                        src={img}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text */}
                    <p className="mt-2 text-sm text-gray-500">NEW DROP</p>
                    <h3 className="font-medium text-base">{p.title}</h3>
                    <Price
  amount={p.variants[0].price.amount}
  currencyCode={p.variants[0].price.currencyCode}
 />

                  </Link>
                );
              })}

            </div>
          </AutoScrollRow>
        </div>
      </section>

     {/* =============================== */}
{/* 🔥 TWO FEATURED COLLECTIONS (FULL WIDTH NO GAP) */}
{/* =============================== */}
<section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">

  {/* T-SHIRTS COLLECTION */}
  <Link href="/search/t-shirts" className="relative group w-full h-[480px]">
    <img
      src="/tshirt.png"   // <-- replace with your banner image
      className="w-full h-full object-cover"
    />
    <div className="absolute top-6 left-6 text-white text-3xl md:text-4xl font-light">
      T-Shirts
    </div>
  </Link>

  {/* HAND FANS COLLECTION */}
  <Link href="/search/hand-fans" className="relative group w-full h-[480px]">
    <img
      src="/handfan.png"   // <-- replace with your banner image
      className="w-full h-full object-cover"
    />
    <div className="absolute top-6 left-6 text-white text-3xl md:text-4xl font-light">
      Hand Fans
    </div>
  </Link>

  <Link href="/search/head-caps" className="relative group w-full h-[480px]">
    <img
      src="/headcap.png"   // <-- replace with your banner image
      className="w-full h-full object-cover"
    />
    <div className="absolute top-6 left-6 text-white text-3xl md:text-4xl font-light">
      Head Caps
    </div>
  </Link>

  <Link href="/search/tote-bags" className="relative group w-full h-[480px]">
    <img
      src="/totebag.png"   // <-- replace with your banner image
      className="w-full h-full object-cover"
    />
    <div className="absolute top-6 left-6 text-white text-3xl md:text-4xl font-light">
      Tote Bags
    </div>
  </Link>

</section>


      {/* =============================== */}
{/* 🔥 STANDARD CENTERED SECTION */}
{/* =============================== */}
<section className="w-full py-24">

  <div className="relative w-full h-[700px]"> 
    <Image
      src="/image2.png"
      alt="Banner"
      fill
      className="object-cover object-center"
      priority
    />

    {/* TEXT CENTER BOTTOM */}
    <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
        Discover the Latest Fashion Trends
      </h1>

      <p className="text-lg text-gray-200 mt-4 max-w-2xl drop-shadow-md">
        Explore our curated collections of stylish apparel and accessories.
      </p>
    </div>
  </div>
</section>





      {/* =============================== */}
      {/* 🔥 EXPLORER CATEGORY GRID */}
      {/* =============================== */}
      <section className="w-full py-20">
        <div className="max-w-[1300px] mx-auto px-6">

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Trending Now
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Card */}
            <Link href="/search/t-shirts" className="group">
              <img
                src="/tshirt.png"
                className="w-full h-[350px] object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold group-hover:underline">
                T-Shirts
              </h3>
            </Link>

            <Link href="/search/hand-fans" className="group">
              <img
                src="/handfan.png"
                className="w-full h-[350px] object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold group-hover:underline">
                Hand Fans
              </h3>
            </Link>

            <Link href="/search/head-caps" className="group">
              <img
                src="/headcap.png"
                className="w-full h-[350px] object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold group-hover:underline">
                Head Caps
              </h3>
            </Link>

            <Link href="/search/tote-bags" className="group">
              <img
                src="/totebag.png"
                className="w-full h-[350px] object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold group-hover:underline">
                Tote Bags
              </h3>
            </Link>

          </div>
        </div>
      </section>

      {/* =============================== */}
      {/* 🔥 FINAL SALE BANNER */}
      {/* =============================== */}
      <section
  className="relative w-full py-60 bg-black text-white bg-cover bg-center"
  style={{
    backgroundImage: "url('/plain.png')",
  }}
>
  <div className="max-w-[1000px] mx-auto text-center space-y-6 px-6">

    <h2 className="text-4xl font-bold">Explore Our Sale Collection</h2>

    <p className="text-gray-300 text-lg">
      Don&apos;t miss out on our amazing deals and discounts.
    </p>

    <Link
      href="#"
      className="inline-block bg-white text-black px-10 py-3 rounded-md font-semibold"
    >
      Shop Sale
    </Link>

  </div>
</section>


    </main>
  );
}
