import { ANNOUNCEMENT, BRAND, NAV } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink py-2 text-center">
        <p className="eyebrow text-paper/90">{ANNOUNCEMENT}</p>
      </div>

      <div className="border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-4 lg:px-10">
          <a href="#" className="shrink-0 text-2xl lowercase tracking-tight">
            {BRAND}
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="eyebrow text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <form className="ml-auto hidden max-w-md flex-1 items-center gap-2 border-b border-line pb-1 md:flex">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search products"
              className="w-full bg-transparent text-xs tracking-wide outline-none placeholder:text-muted"
            />
          </form>

          <div className="ml-auto flex items-center gap-5 md:ml-4">
            <button aria-label="Account" className="md:hidden">
              <SearchIcon />
            </button>
            <button aria-label="Account">
              <UserIcon />
            </button>
            <button aria-label="Cart" className="relative">
              <BagIcon />
              <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-clay text-[8px] text-white">
                2
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5.5 7.5h13l-1 12.5h-11z" strokeLinejoin="round" />
      <path d="M9 9V6.5a3 3 0 016 0V9" strokeLinecap="round" />
    </svg>
  );
}
