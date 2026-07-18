import type { ReactNode } from "react";

export function Button({
  children,
  href = "#",
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "light";
  className?: string;
}) {
  const styles = {
    solid: "bg-ink text-paper hover:bg-ink/85",
    outline: "border border-ink/30 text-ink hover:bg-ink hover:text-paper",
    light: "bg-paper text-ink hover:bg-white",
  }[variant];

  return (
    <a
      href={href}
      className={`eyebrow inline-flex items-center justify-center px-8 py-3.5 font-medium transition-colors duration-200 ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <h2 className="section-title text-ink">{children}</h2>
      <span aria-hidden className="h-px w-8 bg-ink/30" />
    </div>
  );
}

export function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} filled={i < Math.round(rating)} />
        ))}
      </span>
      <span className="text-[10px] text-muted">({reviews})</span>
      <span className="sr-only">
        Rated {rating} out of 5 from {reviews} reviews
      </span>
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-2.5 w-2.5">
      <path
        d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z"
        fill={filled ? "#b99b8d" : "none"}
        stroke="#b99b8d"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
