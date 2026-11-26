"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/content";

const NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Our Story", href: "/about" },
  { label: "My Account", href: "/account" },
  { label: "Shopping Cart", href: "/cart" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-line bg-cream/80 text-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr_1.3fr] lg:items-start">
          {/* Left: Brand Identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/Singular logo.svg"
                alt={BRAND}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted">
              Soft, practical quilted play mats inspired by the Indian godadi —
              crafted with compressed cotton and gentle printed rayon for
              everyday family moments.
            </p>
            <p className="eyebrow pt-1 text-[10px] text-muted">
              Reversible Design · Hand-Finished Edges
            </p>
          </div>

          {/* Center: Compact Navigation + Socials */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="eyebrow mb-4 text-ink">Explore</h3>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow mb-4 text-ink">Connect</h3>
              <p className="text-xs leading-relaxed text-muted">
                <a
                  href="https://www.instagram.com/singularcares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline-offset-4 transition-colors hover:underline"
                >
                  @singularcares
                </a>
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/singularcares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center border border-line bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Pinterest"
                  className="flex h-9 w-9 items-center justify-center border border-line bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.5 19l1.5-6.5M10.5 14c1.2.8 3.5.4 4-1.5.5-1.8-.8-3.5-2.8-3.5-2.2 0-3.7 1.6-3.2 3.8" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Newsletter Card */}
          <div className="border border-line bg-paper p-6 sm:p-8">
            <p className="eyebrow text-[10px] text-clay">Stay in the loop</p>
            <h3 className="mt-1.5 text-lg font-light tracking-tight text-ink">
              Join the Singular Cares family
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Early access to new prints, restocks, and stories — no spam, ever.
            </p>

            {subscribed ? (
              <div className="mt-5 border border-sage/50 bg-sage/15 px-4 py-3 text-xs text-ink">
                Thank you for subscribing — welcome to {BRAND}.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-5 flex flex-col gap-2.5 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="w-full border border-line bg-cream/40 px-3.5 py-2.5 text-xs text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink"
                />
                <button
                  type="submit"
                  className="eyebrow shrink-0 bg-ink px-6 py-2.5 text-[10px] font-medium text-paper transition-colors hover:bg-ink/85"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-line bg-paper/70">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 py-5 text-[11px] tracking-wide text-muted sm:flex-row sm:justify-between lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
            <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
            <span aria-hidden className="hidden sm:inline">·</span>
            <p>
              Developed By:{" "}
              <a
                href="https://www.mobintix.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline-offset-4 transition-colors hover:underline"
              >
                Mobintix Infotech
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="transition-colors hover:text-ink">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
