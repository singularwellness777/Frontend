"use client";

import { useState } from "react";
import { Media } from "@/components/media";
import { SectionHeading } from "@/components/ui";
import { addToCart } from "@/lib/cart-store";
import type { Product } from "@/lib/content";

export function SocialProducts({
  products,
  fallbackProducts,
}: {
  products: Product[];
  fallbackProducts?: Product[];
}) {
  const [addedId, setAddedId] = useState<string | null>(null);
  const items = (products.length ? products : fallbackProducts ?? []).slice(0, 4);

  if (!items.length) return null;

  const handleAdd = async (product: Product) => {
    await addToCart({
      slug: product.slug || product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr));
    }, 1600);
  };

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3 text-muted">Most Loved</p>
        <SectionHeading>Community Favorites</SectionHeading>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => {
          const isAdded = addedId === product.id;
          return (
            <article
              key={product.id}
              className="flex flex-col justify-between overflow-hidden border border-line/70 bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(43,39,36,0.08)]"
            >
              <a
                href={`/products/${product.slug || product.id}`}
                className="group block"
              >
                <Media
                  tone={product.tone}
                  src={product.image}
                  alt={product.name}
                  className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="space-y-1.5 px-5 py-4">
                  <p className="eyebrow text-[10px] text-moss">Verified favorite</p>
                  <h3 className="line-clamp-2 min-h-10 text-sm leading-snug font-medium text-ink">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-ink">
                    {product.price}
                    {product.compareAt ? (
                      <span className="ml-2 text-xs font-normal text-muted line-through">
                        {product.compareAt}
                      </span>
                    ) : null}
                  </p>
                </div>
              </a>

              <div className="px-5 pb-5">
                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="eyebrow w-full bg-ink px-4 py-3 text-[11px] font-medium text-paper transition-colors hover:bg-ink/85"
                >
                  {isAdded ? "Added to cart ✓" : "Add To Cart"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
