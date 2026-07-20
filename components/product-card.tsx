import { Media } from "@/components/media";
import { Stars } from "@/components/ui";
import type { Product } from "@/lib/content";

export function ProductCard({ product }: { product: Product }) {
  const productHref = `/products/${product.slug || product.id}`;
  return (
    <a href={productHref} className="group flex flex-col gap-3 text-center">
      <Media
        tone={product.tone}
        src={product.image}
        alt={product.name}
        className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="flex flex-col items-center gap-1.5">
        <h3 className="text-[11px] leading-tight tracking-[0.06em] text-ink">
          {product.name}
        </h3>
        <p className="flex items-center gap-2 text-[11px] text-ink">
          <span>{product.price}</span>
          {product.compareAt ? (
            <span className="text-muted line-through">{product.compareAt}</span>
          ) : null}
        </p>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="flex gap-1.5 pt-0.5">
          {product.swatches.map((color) => (
            <span
              key={color}
              style={{ backgroundColor: color }}
              className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/10"
            />
          ))}
        </div>
      </div>
    </a>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
