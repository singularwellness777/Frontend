import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductGrid } from "@/components/product-card";
import { getStorefrontProducts } from "@/lib/storefront";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getStorefrontProducts();
  const all = products.all;

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <section className="mb-8">
          <h1 className="text-center text-4xl font-semibold tracking-tight text-ink">
            All Products
          </h1>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Filters / sidebar */}
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border border-line bg-paper p-6">
                <h3 className="text-sm font-semibold text-ink">FILTERS</h3>
                <div className="mt-4 space-y-4">
                  <details className="open:mt-0">
                    <summary className="cursor-pointer text-sm text-ink">Availability</summary>
                  </details>
                  <details>
                    <summary className="cursor-pointer text-sm text-ink">Price</summary>
                  </details>
                  <details>
                    <summary className="cursor-pointer text-sm text-ink">Product Type</summary>
                  </details>
                  <details>
                    <summary className="cursor-pointer text-sm text-ink">Color</summary>
                  </details>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="order-1 lg:order-2 lg:col-span-9">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="text-sm text-muted">Sort</label>
                <select className="rounded border border-line bg-paper px-3 py-1 text-sm">
                  <option>Best Selling</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                {/* View icons (grid/list) */}
                <button aria-label="Grid view" className="rounded border border-line bg-paper p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="8" height="8" rx="1" />
                    <rect x="13" y="3" width="8" height="8" rx="1" />
                    <rect x="3" y="13" width="8" height="8" rx="1" />
                    <rect x="13" y="13" width="8" height="8" rx="1" />
                  </svg>
                </button>
                <button aria-label="List view" className="rounded border border-line bg-paper p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="4" rx="1" />
                    <rect x="3" y="10" width="18" height="4" rx="1" />
                    <rect x="3" y="16" width="18" height="4" rx="1" />
                  </svg>
                </button>
              </div>
            </div>

            <ProductGrid products={all} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
