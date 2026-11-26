"use client";

import { useState } from "react";
import Link from "next/link";
import { CartBadge } from "@/components/cart-badge";
import { ANNOUNCEMENT } from "@/lib/content";
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
      {/* Slim Editorial Announcement Bar */}
      <div className="bg-ink px-4 py-2 text-center text-paper">
        <p className="eyebrow text-[10px] tracking-[0.22em] text-paper/90">
          {ANNOUNCEMENT}
        </p>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-10">
          {/* Left: Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 md:flex lg:gap-8"
          >
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

              return (
                <div key={item.label} className="group relative py-1.5">
                  <Link
                    href={href}
                    className="eyebrow relative flex items-center gap-1.5 text-[11px] font-medium text-ink/80 transition-colors hover:text-ink"
                  >
                    <span>{item.label}</span>
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
                          strokeWidth="1.8"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-200 group-hover:scale-x-100"
                    />
                  </Link>

                  {hasSubcategories ? (
                    <div className="pointer-events-none absolute left-0 top-full z-50 hidden min-w-[220px] pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:block group-hover:opacity-100">
                      <div className="border border-line bg-paper p-2 shadow-xl">
                        {subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.label}
                            href={subcategory.linkUrl || "/shop"}
                            className="block px-3.5 py-2.5 text-xs tracking-wide text-ink/80 transition-colors hover:bg-cream hover:text-ink"
                          >
                            {subcategory.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* Center (Desktop) / Left (Mobile): Brand Logo */}
          <Link
            href="/"
            className="flex items-center justify-start md:justify-center"
          >
            <img
              src="/Singular logo.svg"
              alt="Singular Cares"
              className="h-10 w-auto object-contain sm:h-11 md:h-12"
            />
          </Link>

          {/* Right: Actions & Mobile Menu Toggle */}
          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <Link
              href="/account"
              aria-label="Account"
              className="flex items-center gap-1.5 p-1.5 text-ink/80 transition-colors hover:text-ink"
            >
              <UserIcon />
              <span className="eyebrow hidden text-[10px] xl:inline">
                Account
              </span>
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex items-center gap-1.5 p-1.5 text-ink/80 transition-colors hover:text-ink"
            >
              <BagIcon />
              <span className="eyebrow hidden text-[10px] xl:inline">Bag</span>
              <CartBadge />
            </Link>

            {/* Hamburger Button (Mobile Only) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="p-1.5 text-ink transition-colors hover:text-clay md:hidden"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[92px] z-40 overflow-y-auto border-b border-line bg-paper/98 px-6 py-6 shadow-2xl backdrop-blur md:hidden">
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
                <div key={item.label} className="border-b border-line/60 pb-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-light tracking-wide text-ink uppercase hover:text-clay"
                    >
                      {item.label}
                    </Link>
                    {hasSubcategories && (
                      <button
                        type="button"
                        onClick={() => toggleAccordion(item.label)}
                        className="p-2 text-ink/70"
                        aria-label={`Expand ${item.label}`}
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
                    <div className="mt-2 space-y-2 border-l border-line pl-4">
                      {subcategories.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.linkUrl || "/shop"}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-sm text-muted hover:text-ink"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="grid grid-cols-2 gap-3 pt-4">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="eyebrow border border-line bg-cream/60 py-3 text-center text-[10px] text-ink"
              >
                Account
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="eyebrow bg-ink py-3 text-center text-[10px] text-paper"
              >
                View Bag
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
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
