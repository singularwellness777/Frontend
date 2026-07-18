import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Banner } from "@/components/banner";

export default function GiftingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16 lg:px-10">
        <section className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
          <p className="eyebrow text-clay">Gifting</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Thoughtful gifts that feel as good as they look.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            From baby showers to housewarmings, discover giftable essentials with timeless design and everyday usefulness.
          </p>
        </section>

        <Banner
          title="Giftable moments"
          body="Choose beloved essentials that bring comfort to the everyday."
          cta="Shop gifting picks"
          tone="sage"
          alt="A curated baby gift setup"
        />
      </main>
      <SiteFooter />
    </>
  );
}
