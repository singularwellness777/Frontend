"use client";

import { useState } from "react";
import { CartBadge } from "@/components/cart-badge";
import type { NavCategory } from "@/lib/data";

export type NavItem = NavCategory | { label: string; href: string };

export function HeaderClient({ navItems }: { navItems: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (label: string) => {
    setOpenAccordion((prev) => (prev === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
          {/* Logo */}
          <a href="/" className="shrink-0 flex items-center">
            <img
              src="/Singular logo.svg"
              alt="Singular Cares"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </a>

          <div className="flex items-center gap-4 sm:gap-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7">
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
                      className="eyebrow text-ink/80 transition-colors hover:text-ink flex items-center gap-1 text-xs uppercase tracking-wider font-medium"
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

            {/* Right Icons: Account, Cart & Mobile Menu Toggle */}
            <div className="flex items-center gap-4 sm:gap-5">
              <a
                href="/account"
                aria-label="Account"
                className="hover:text-clay transition p-1"
              >
                <UserIcon />
              </a>
              <a
                href="/cart"
                aria-label="Cart"
                className="relative hover:text-clay transition p-1"
              >
                <BagIcon />
                <CartBadge />
              </a>

              {/* Hamburger Button (Mobile Only) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="md:hidden p-1.5 text-ink hover:text-clay transition"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bottom-0 z-40 bg-paper/98 backdrop-blur border-b border-line overflow-y-auto px-6 py-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
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
              const isOpen = openAccordion === item.label;

              return (
                <div key={item.label} className="border-b border-line/50 pb-3">
                  <div className="flex items-center justify-between">
                    <a
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-light tracking-wide text-ink hover:text-clay uppercase"
                    >
                      {item.label}
                    </a>
                    {hasSubcategories && (
                      <button
                        onClick={() => toggleAccordion(item.label)}
                        className="p-2 text-ink/70"
                      >
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
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
                      </button>
                    )}
                  </div>

                  {hasSubcategories && isOpen && (
                    <div className="mt-2 pl-4 space-y-2 border-l border-line/60">
                      {subcategories.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.linkUrl || "#"}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-sm text-muted hover:text-ink py-1"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
