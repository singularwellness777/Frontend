import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CategoryGrid } from "@/components/category-grid";

export default function CollectionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16 lg:px-10">
        <section className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
          <p className="eyebrow text-clay">Collections</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Curated collections for every stage of family life.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Explore calming palettes, everyday essentials, and thoughtfully designed pieces for play, feeding, and bedtime.
          </p>
        </section>

        <CategoryGrid />
      </main>
      <SiteFooter />
    </>
  );
}
