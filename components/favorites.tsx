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

  const current = tabs[0] ?? "";
  const products = (groups[current] ?? []).slice(0, 5);

  if (!tabs.length) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading className="mb-7">Our Favorites</SectionHeading>
      <div className="mb-12 flex justify-center">
        <Button href="/shop" className="px-6 py-2.5">
          Shop
        </Button>
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
