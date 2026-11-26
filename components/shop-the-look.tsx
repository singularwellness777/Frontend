"use client";

import { useState } from "react";
import { Media } from "@/components/media";
import { addToCart } from "@/lib/cart-store";

export function ShopTheLook() {
  const [open, setOpen] = useState(true);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    await addToCart({
      slug: "mini-toddler-bike",
      name: "Mini Toddler Bike",
      price: "$89.00",
      image: "/03.png",
      quantity: 1,
      category: "Play",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="relative overflow-hidden bg-cream">
      <Media
        tone="stone"
        src="/Tummy time.png"
        alt="Calm nursery setup with Singular Cares essentials"
        className="h-[68vh] min-h-[460px] w-full"
      />

      {/* Shoppable hotspot — pinned to the right without overlapping scene text */}
      <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-3 lg:right-16">
        {open ? (
          <div className="w-52 bg-paper p-3.5 shadow-xl transition-all">
            <a href="/shop" className="group block">
              <Media
                tone="sage"
                src="/03.png"
                alt="Mini Toddler Bike"
                className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <p className="mt-3 text-xs font-medium leading-tight text-ink">
                Mini Toddler Bike
              </p>
              <p className="mt-1 text-xs text-ink">
                $89.00{" "}
                <span className="ml-1 text-muted line-through">$99.00</span>
              </p>
            </a>
            <button
              type="button"
              onClick={handleAdd}
              className="eyebrow mt-3 w-full bg-ink py-2.5 text-[10px] font-medium text-paper transition-colors hover:bg-ink/85"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Hide featured product" : "Show featured product"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-lg text-ink shadow-lg transition-transform hover:scale-105"
        >
          {open ? "×" : "+"}
        </button>
      </div>
    </section>
  );
}
