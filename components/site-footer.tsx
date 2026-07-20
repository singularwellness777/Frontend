import { BRAND } from "@/lib/content";

const COLUMNS = [
  { title: "Shop", links: ["New In", "Best Sellers", "Feeding", "Bath & Care", "Gift Cards"] },
  { title: "About", links: ["Our Story", "Sustainability", "Safety", "Careers"] },
  { title: "Support", links: ["Contact Us", "Shipping", "Returns", "FAQ"] },
  { title: "Resources", links: ["Press", "Wholesale", "Affiliates", "Retailers"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-cream">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-[1.2fr_2fr_1.2fr] lg:px-10">
        <div>
          <a href="/" className="inline-block">
            <img src="/Singular logo.svg" alt="Singular Cares" className="h-10 w-auto" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="eyebrow mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-muted transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-ink px-8 py-10 text-paper">
          <h3 className="eyebrow mb-3">Join our newsletter</h3>
          <p className="mb-6 text-xs leading-relaxed text-paper/70">
            Product launches, restocks and seasonal edits — straight to your
            inbox.
          </p>
          <form className="flex items-center gap-2 border-b border-paper/30 pb-2">
            <input
              type="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              className="w-full bg-transparent text-xs outline-none placeholder:text-paper/50"
            />
            <button type="submit" className="eyebrow shrink-0 text-paper/90">
              Sign up
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between lg:px-10">
          <p className="text-[10px] tracking-wide text-muted">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] tracking-wide text-muted">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
