"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/product-card";
import { Button, SectionHeading } from "@/components/ui";
import { FAVORITES, FAVORITE_TABS, type Product } from "@/lib/content";

/**
 * `catalogue` comes from the database via the server page. When it's empty —
 * no Supabase credentials, or an atelier that hasn't added products yet — the
 * built-in placeholder content renders instead, so the page is never blank.
 */
export function Favorites({
  catalogue,
}: {
  catalogue?: Record<string, Product[]>;
}) {
  const live = catalogue && Object.keys(catalogue).length > 0;
  const groups: Record<string, Product[]> = live ? catalogue : FAVORITES;

  // Keep the designed tab order for categories we know, then append any the
  // atelier has invented since.
  const known = FAVORITE_TABS.filter((tab) => groups[tab]?.length);
  const extra = Object.keys(groups)
    .filter((key) => !FAVORITE_TABS.includes(key as never) && groups[key].length)
    .sort();
  const tabs = [...known, ...extra];

  const [selected, setSelected] = useState<string>(tabs[0] ?? "");
  const current = tabs.includes(selected) ? selected : tabs[0] ?? "";
  const products = (groups[current] ?? []).slice(0, 4);

  if (!tabs.length) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-8 flex flex-col items-center text-center">
        <p className="eyebrow mb-3 text-muted">Thoughtfully Curated</p>
        <SectionHeading>Our Favorites</SectionHeading>
      </div>

      {/* Interactive Category Tabs */}
      <div
        role="tablist"
        aria-label="Product categories"
        className="no-scrollbar mb-12 flex items-center justify-start gap-2 overflow-x-auto border-b border-line pb-4 sm:justify-center sm:gap-3"
      >
        {tabs.map((tab) => {
          const active = tab === current;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(tab)}
              className={`eyebrow shrink-0 px-4 py-2 transition-colors ${
                active
                  ? "bg-ink text-paper"
                  : "text-muted hover:bg-cream hover:text-ink"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <ProductGrid products={products} />

      <div className="mt-12 flex justify-center">
        <Button href="/shop" variant="outline">
          Shop {current}
        </Button>
      </div>
    </section>
  );
}
