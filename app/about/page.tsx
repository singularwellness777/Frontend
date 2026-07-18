import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Values } from "@/components/values";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16 lg:px-10">
        <section className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
          <p className="eyebrow text-clay">About</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Designed for the rhythm of family life.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            We create practical, beautiful essentials that make daily routines feel calmer, lighter, and more joyful.
          </p>
        </section>

        <Values />
      </main>
      <SiteFooter />
    </>
  );
}
