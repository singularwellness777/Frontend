import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  const categories = [
    { label: "Play", href: "/shop" },
    { label: "Feeding", href: "/shop" },
    { label: "Bath & Care", href: "/shop" },
    { label: "Bedding", href: "/shop" },
    { label: "Gifting", href: "/gifting" },
    { label: "Collections", href: "/collections" },
  ];

  return (
    <>
      <SiteHeader />

      <main className="min-h-[75vh] bg-paper flex flex-col justify-center items-center px-6 py-20 lg:py-28 text-center relative overflow-hidden">
        {/* Soft background glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(50% 50% at 50% 45%, rgba(216, 194, 182, 0.3) 0%, transparent 80%)",
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          {/* Eyebrow / 404 tag */}
          <span className="eyebrow tracking-[0.25em] text-clay font-medium mb-3">
            Error 404
          </span>

          <h1 className="text-6xl sm:text-7xl font-light tracking-tight text-ink mb-4">
            Page Not Found
          </h1>

          <p className="text-muted text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            The page or product you're looking for might have been moved, renamed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="/shop"
              className="rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-paper transition hover:bg-clay shadow-sm"
            >
              Explore Shop
            </a>
            <a
              href="/"
              className="rounded-full border border-line bg-paper px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-ink transition hover:bg-cream"
            >
              Return Home
            </a>
          </div>

          {/* Popular Categories */}
          <div className="w-full border-t border-line/60 pt-8">
            <span className="eyebrow text-muted/80 block mb-4">
              Or Explore Popular Categories
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  className="rounded-full border border-line/80 bg-cream/50 px-4 py-2 text-xs text-ink/80 transition hover:bg-cream hover:text-ink"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
