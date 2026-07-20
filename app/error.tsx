"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Storefront Error]", error);
  }, [error]);

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
          <span className="eyebrow tracking-[0.25em] text-clay font-medium mb-3">
            Something Went Wrong
          </span>

          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-ink mb-4">
            Unable to Load Page
          </h1>

          <p className="text-muted text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            We encountered an unexpected issue while retrieving this page. Please try again or head back to the shop.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-paper transition hover:bg-clay shadow-sm"
            >
              Try Again
            </button>
            <a
              href="/shop"
              className="rounded-full border border-line bg-paper px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-ink transition hover:bg-cream"
            >
              Go to Shop
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
