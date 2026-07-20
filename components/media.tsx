import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

export type Tone =
  | "cream"
  | "sand"
  | "sage"
  | "clay"
  | "rose"
  | "moss"
  | "stone";

const TONES: Record<Tone, [string, string]> = {
  cream: ["#f6f1ea", "#e7dccd"],
  sand: ["#eee3d4", "#d9c7b1"],
  sage: ["#cdd5c6", "#9aa891"],
  clay: ["#d8c2b6", "#ad8d7d"],
  rose: ["#f0ded7", "#dbbcb0"],
  moss: ["#9daa93", "#6b7862"],
  stone: ["#e3e0da", "#c3bdb3"],
};

/**
 * Photography, with the tone gradient as its fallback. Callers that have a real
 * asset pass `src`; callers that don't (the built-in placeholder content) still
 * pass only `tone` + `alt` and get the gradient as before.
 */
export function Media({
  tone = "cream",
  alt,
  className = "",
  overlay = false,
  src,
  children,
}: {
  tone?: Tone;
  alt?: string;
  className?: string;
  /** Darken the image so overlaid text stays legible. */
  overlay?: boolean;
  /** Catalogue image URL. Falls back to the tone gradient when empty. */
  src?: string;
  children?: ReactNode;
}) {
  const [from, to] = TONES[tone];
  const style: CSSProperties = {
    backgroundImage: `radial-gradient(120% 90% at 25% 15%, ${from} 0%, ${to} 70%, ${to} 100%)`,
  };

  return (
    <div
      role="img"
      aria-label={alt}
      style={style}
      className={`relative overflow-hidden ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 70% 80%, rgba(255,255,255,.9) 0%, transparent 60%)",
          }}
        />
      )}
      {overlay ? (
        <div aria-hidden className="absolute inset-0 bg-ink/25" />
      ) : null}
      {children}
    </div>
  );
}
