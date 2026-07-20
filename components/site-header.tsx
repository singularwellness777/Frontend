import { ANNOUNCEMENT, BRAND, NAV } from "@/lib/content";
import { getNavCategories } from "@/lib/data";
import type { NavCategory } from "@/lib/data";
import { CartBadge } from "@/components/cart-badge";

export async function SiteHeader() {
  const adminCategories = await getNavCategories();
  const navItems: Array<NavCategory | { label: string; href: string }> = [
    ...NAV.map((item) => ({ label: item.label, href: item.href })),
    ...adminCategories,
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <a href="/" className="shrink-0 flex items-center">
            <img
              src="/Singular logo.svg"
              alt="Singular Cares"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item, idx) => {
                const href =
                  "href" in item && item.href
                    ? item.href
                    : "linkUrl" in item && item.linkUrl
                    ? item.linkUrl
                    : "/shop";
                const subcategories =
                  "subcategories" in item ? item.subcategories : undefined;
                const hasSubcategories =
                  Array.isArray(subcategories) && subcategories.length > 0;

                const isRightAligned = idx >= navItems.length - 2;

                return (
                  <div key={item.label} className="group relative py-2">
                    <a
                      href={href}
                      className="eyebrow text-ink/80 transition-colors hover:text-ink flex items-center gap-1"
                    >
                      {item.label}
                      {hasSubcategories && (
                        <svg
                          className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </a>
                    {hasSubcategories ? (
                      <div
                        className={`pointer-events-none absolute top-full z-50 pt-2 hidden min-w-[200px] opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:block group-hover:opacity-100 ${
                          isRightAligned ? "right-0" : "left-0"
                        }`}
                      >
                        <div className="rounded-2xl border border-line bg-paper p-3 shadow-xl space-y-1">
                          {subcategories.map((subcategory) => (
                            <a
                              key={subcategory.label}
                              href={subcategory.linkUrl || "#"}
                              className="block rounded-xl px-3 py-2 text-xs font-medium text-ink/80 transition-colors hover:bg-cream hover:text-ink"
                            >
                              {subcategory.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-5">
              <a
                href="/account"
                aria-label="Account"
                className="hover:text-clay transition"
              >
                <UserIcon />
              </a>
              <a
                href="/cart"
                aria-label="Cart"
                className="relative hover:text-clay transition"
              >
                <BagIcon />
                <CartBadge />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M5.5 7.5h13l-1 12.5h-11z" strokeLinejoin="round" />
      <path d="M9 9V6.5a3 3 0 016 0V9" strokeLinecap="round" />
    </svg>
  );
}
