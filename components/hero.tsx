import { Fragment } from "react";
import { Media } from "@/components/media";
import { Button } from "@/components/ui";
import type { HomeMedia } from "@/lib/data";

const TRUST_ITEMS = [
  { label: "Free US Shipping $35+", detail: "Fast, carbon-neutral delivery" },
  { label: "100% Food-Grade Silicone", detail: "BPA, PVC & phthalate free" },
  { label: "Thoughtful Craft", detail: "Designed for everyday calm" },
  { label: "4.9 ★ Parent Rated", detail: "Trusted by 10,000+ families" },
];

export function Hero({ media }: { media?: HomeMedia }) {
  const title = media?.title || "Modern essentials\nfor little ones";
  const titleLines = title.split("\n");
  const subtitle = media?.subtitle || "New Season Edit";
  const href = media?.linkUrl || "/shop";
  const buttonLabel = media?.linkUrl ? "Shop now" : "Shop collection";

  return (
    <section className="relative">
      <div className="relative overflow-hidden">
        <Media
          tone="moss"
          src={media?.src || "/Play time.png"}
          alt={media?.alt ?? "Singular Cares — Modern essentials for little ones"}
          overlay
          className="h-[62vh] min-h-[440px] w-full sm:h-[68vh] lg:h-[74vh]"
          mediaType={media?.mediaType}
          poster={media?.poster}
        />

        {/* Editorial gradient scrim for crisp contrast */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/25 to-transparent"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
            <div className="max-w-lg text-paper">
              <p className="eyebrow mb-4 inline-flex items-center gap-2.5 text-paper/90">
                <span className="h-px w-6 bg-paper/70" aria-hidden />
                {subtitle}
              </p>

              <h1 className="text-4xl leading-[1.06] font-light tracking-tight sm:text-5xl lg:text-6xl">
                {titleLines.map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {index < titleLines.length - 1 ? <br /> : null}
                  </Fragment>
                ))}
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/85 sm:text-base">
                Soft-touch feeding, bath, bedding, and play pieces crafted in
                warm, calming tones for modern nurseries.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={href} variant="light">
                  {buttonLabel}
                </Button>
                <Button
                  href="/about"
                  variant="outline"
                  className="border-paper/50 text-paper hover:bg-paper hover:text-ink"
                >
                  Our story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle brand trust strip */}
      <div className="border-b border-line bg-cream/70">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-y divide-line/60 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="px-6 py-4 text-center">
              <p className="eyebrow text-ink">{item.label}</p>
              <p className="mt-1 text-[11px] text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
