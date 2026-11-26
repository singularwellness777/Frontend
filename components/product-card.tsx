"use client";

import { useState } from "react";
import { Media } from "@/components/media";
import { Stars } from "@/components/ui";
import type { Product } from "@/lib/content";
import { addToCart } from "@/lib/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const productHref = `/products/${product.slug || product.id}`;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart({
      slug: product.slug || product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group flex flex-col gap-3">
      <div className="relative w-full overflow-hidden bg-cream/60" style={{ aspectRatio: "1 / 1" }}>
        <a href={productHref} className="block h-full w-full">
          <Media
            tone={product.tone}
            src={product.image}
            alt={product.name}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </a>

        {product.compareAt ? (
          <span className="eyebrow absolute top-3 left-3 bg-paper/95 px-2.5 py-1 text-[10px] text-ink shadow-xs">
            Save
          </span>
        ) : null}

        <button
          type="button"
          onClick={handleQuickAdd}
          className="eyebrow absolute inset-x-3 bottom-3 bg-paper/95 py-2.5 text-[10px] font-medium text-ink shadow-sm backdrop-blur-xs transition-all duration-200 hover:bg-ink hover:text-paper md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          {added ? "Added ✓" : "Quick add"}
        </button>
      </div>

      <a href={productHref} className="flex flex-col items-center gap-1.5 text-center">
        {product.swatches?.length ? (
          <div className="mb-0.5 flex items-center gap-1.5" aria-label="Available colors">
            {product.swatches.slice(0, 4).map((hex, i) => (
              <span
                key={`${hex}-${i}`}
                className="h-2.5 w-2.5 rounded-full border border-ink/15"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        ) : null}

        <h3 className="text-xs leading-snug tracking-[0.04em] text-ink transition-colors group-hover:text-muted">
          {product.name}
        </h3>

        <p className="flex items-center gap-2 text-xs text-ink">
          <span>{product.price}</span>
          {product.compareAt ? (
            <span className="text-muted line-through">{product.compareAt}</span>
          ) : null}
        </p>

        {product.reviews > 0 ? (
          <Stars rating={product.rating} reviews={product.reviews} />
        ) : null}
      </a>
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
