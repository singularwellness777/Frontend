"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";

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

function isVideo(url?: string, type?: "image" | "video"): boolean {
  if (type === "video") return true;
  if (!url) return false;
  return /\.(mp4|webm|mov|ogg|m4v)($|\?)/i.test(url) || url.includes("video/");
}

/**
 * Photography and Video component, with tone gradient fallback.
 */
export function Media({
  tone = "cream",
  alt,
  className = "",
  overlay = false,
  src,
  mediaType,
  poster,
  children,
}: {
  tone?: Tone;
  alt?: string;
  className?: string;
  /** Darken the image/video so overlaid text stays legible. */
  overlay?: boolean;
  /** Catalogue image or video URL. Falls back to the tone gradient when empty or error. */
  src?: string;
  /** Media type: image or video. Inferred from file extension if omitted. */
  mediaType?: "image" | "video";
  /** Optional poster image URL for video. */
  poster?: string;
  children?: ReactNode;
}) {
  const [mediaError, setMediaError] = useState(false);
  const [from, to] = TONES[tone];
  const style: CSSProperties = {
    backgroundImage: `radial-gradient(120% 90% at 25% 15%, ${from} 0%, ${to} 70%, ${to} 100%)`,
  };

  const showMedia = Boolean(src && !mediaError);
  const isVid = isVideo(src, mediaType);

  return (
    <div
      role="img"
      aria-label={alt}
      style={style}
      className={`relative overflow-hidden ${className}`}
    >
      {showMedia ? (
        isVid ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setMediaError(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={src!}
            alt={alt ?? ""}
            fill
            unoptimized
            onError={() => setMediaError(true)}
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        )
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
