"use client";

import { useState, useEffect } from "react";
import { BRAND } from "@/lib/content";

interface ComingSoonProps {
  heading?: string;
  message?: string;
}

export function ComingSoon({ heading, message }: ComingSoonProps) {
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.endsWith(".local"))
    ) {
      setIsLocalhost(true);
    }
  }, []);

  const displayHeading = heading?.trim() || "Something extraordinary is coming";
  const displayMessage =
    message?.trim() || "Our new collection is being crafted. Please return shortly.";

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      {/* Header */}
      <header className="border-b border-line py-6 text-center">
        <span className="text-2xl lowercase tracking-tight font-light">{BRAND}</span>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mx-auto max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-4 py-1.5 text-xs tracking-wider uppercase text-muted">
            <span className="h-2 w-2 rounded-full bg-clay animate-pulse" />
            Coming Soon
          </div>

          <h1 className="text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {displayHeading}
          </h1>

          <p className="text-lg font-light leading-relaxed text-muted sm:text-xl">
            {displayMessage}
          </p>

          {/* Email Subscription Box */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="w-full max-w-sm rounded-full border border-line bg-white px-5 py-3.5 text-sm outline-none transition focus:border-clay sm:w-80"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-ink px-7 py-3.5 text-xs tracking-widest uppercase text-paper transition hover:bg-clay sm:w-auto"
            >
              Notify Me
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line py-6 text-center text-xs text-muted flex flex-col items-center gap-2">
        <p>&copy; {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
        {isLocalhost && (
          <a
            href="/api/preview"
            className="text-[11px] tracking-wider uppercase text-muted/60 hover:text-ink underline transition"
          >
            Developer Preview Storefront
          </a>
        )}
      </footer>
    </div>
  );
}
