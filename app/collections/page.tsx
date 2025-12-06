import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/shopify";

export const metadata = {
  title: "Collections",
  description: "Browse all collections",
};

// Map your collection handles → images
const collectionImages: Record<string, string> = {
  "frontpage": "/banner.jpg",
  "t-shirts": "/tshirt.png",
  "hand-fans": "/handfan.png",
  "head-caps": "/headcap.png",
  "tote-bags": "/totebag.png",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <main className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-black">Collections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection: any) => (
          <Link
            key={collection.path}
            href={collection.path}
            className="group block"
          >
            <div className="relative w-full h-64 overflow-hidden rounded-lg">
              <Image
                src={
                  collectionImages[collection.handle] ||
                  collection.image ||
                  "/banner.png"
                }
                alt={collection.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold group-hover:underline">
              {collection.title}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
