import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">

          {/* FIX: remove h-full, add block */}
          <Link
            className="relative block w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
          >

            {/* FIX: wrap GridTileImage inside aspect-square */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>

          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
