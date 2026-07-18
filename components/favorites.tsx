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

  const [active, setActive] = useState<string | null>(null);
  const current = active && groups[active]?.length ? active : (tabs[0] ?? "");

  if (!tabs.length) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
      <SectionHeading>Our Favorites</SectionHeading>

      <div
        role="tablist"
        aria-label="Product categories"
        className="no-scrollbar mt-8 mb-12 flex justify-start gap-2 overflow-x-auto md:justify-center"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={tab === current}
            onClick={() => setActive(tab)}
            className={`eyebrow shrink-0 rounded-full border px-4 py-2 transition-colors ${
              tab === current
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-ink/40 hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ProductGrid products={groups[current] ?? []} />

      <div className="mt-12 flex justify-center">
        <Button variant="outline">Shop {current}</Button>
      </div>
    </section>
  );
}
