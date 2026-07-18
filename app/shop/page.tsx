import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductSection } from "@/components/product-section";
import { getStorefrontProducts } from "@/lib/storefront";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getStorefrontProducts();
  const featured = products.all.slice(0, 8);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16 lg:px-10">
        <section className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
          <p className="eyebrow text-clay">Shop</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Discover thoughtful essentials for everyday rituals.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Browse our curated collection of bath, feeding, nursery, and play essentials designed for modern homes.
          </p>
        </section>

        <ProductSection title="Featured products" cta="Back to home" products={featured} />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-cream/40 p-8">
            <h2 className="text-2xl font-semibold text-ink">New arrivals</h2>
            <p className="mt-3 text-muted">Fresh pieces for growing routines and everyday comfort.</p>
            <Link href="/" className="mt-6 inline-flex text-sm font-medium text-clay underline underline-offset-4">
              Explore the home page
            </Link>
          </div>
          <div className="rounded-3xl border border-line bg-sage/10 p-8">
            <h2 className="text-2xl font-semibold text-ink">Best sellers</h2>
            <p className="mt-3 text-muted">The pieces families reach for again and again.</p>
            <Link href="/" className="mt-6 inline-flex text-sm font-medium text-clay underline underline-offset-4">
              Discover top picks
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
