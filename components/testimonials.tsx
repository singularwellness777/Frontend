"use client";

import { useState } from "react";
import { Media } from "@/components/media";
import { SectionHeading } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
      <div className="mb-10 flex flex-col items-center gap-3">
        <span className="text-clay tracking-[0.3em] text-xs" aria-hidden>
          ★★★★★
        </span>
        <SectionHeading>For Parents, By Parents</SectionHeading>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <figure
              key={item.author}
              className={`bg-cream px-8 py-14 text-center ${
                i === index ? "" : "hidden md:block"
              }`}
            >
              <blockquote className="text-sm leading-relaxed text-ink/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-[11px] tracking-wide text-muted">
                {item.author}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          <Media tone="sand" alt="Toddler in sunglasses" className="aspect-4/3" />
          <Media tone="rose" alt="Baby wearing a bib" className="aspect-4/3" />
          <Media
            tone="cream"
            alt="Suction bowl on a highchair tray"
            className="aspect-4/3 hidden md:block"
          />
        </div>

        <Arrow direction="left" onClick={() => go(-1)} />
        <Arrow direction="right" onClick={() => go(1)} />
      </div>
    </section>
  );
}

function Arrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous review" : "Next review"}
      className={`absolute top-1/3 flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink shadow transition-colors hover:bg-cream ${
        direction === "left" ? "-left-2 lg:-left-5" : "-right-2 lg:-right-5"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
