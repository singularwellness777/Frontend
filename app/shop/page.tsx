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

      <main className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16 min-h-[70vh]">
        {/* Page Header */}
        <section className="mb-12 text-center max-w-xl mx-auto">
          <span className="eyebrow text-muted block mb-2">Catalogue</span>
          <h1 className="text-4xl font-light tracking-tight text-ink sm:text-5xl">
            All Products
          </h1>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Thoughtfully designed and crafted with sustainable, premium materials for everyday use.
          </p>
        </section>

        {/* Product Grid */}
        {all.length > 0 ? (
          <ProductGrid products={all} />
        ) : (
          <div className="py-20 text-center text-muted">
            <p className="text-base">No products available in the shop catalogue right now.</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
