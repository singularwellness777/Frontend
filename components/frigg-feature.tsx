import { Media } from "@/components/media";
import { Button } from "@/components/ui";

export function FriggFeature() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="flex items-center bg-clay px-8 py-20 text-paper lg:px-20 lg:py-28">
        <div className="mx-auto max-w-md text-center md:text-left">
          <div className="mb-6 flex items-center justify-center gap-2.5 md:justify-start">
            <DanishFlag />
            <span className="eyebrow opacity-90">Designed in Denmark</span>
          </div>

          <h2 className="text-4xl font-light tracking-[0.14em] lg:text-5xl">
            FRIGG<sup className="ml-0.5 align-super text-base">®</sup>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-paper/90">
            Designed and manufactured in Hvidovre, Denmark, every pacifier is
            crafted with safety and quiet beauty in mind — promoting comfort,
            health, and wellness for your little one.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Button href="/shop" variant="light">
              Shop pacifiers
            </Button>
            <span className="eyebrow text-[10px] text-paper/75">
              100% Natural Rubber &amp; Silicone
            </span>
          </div>
        </div>
      </div>

      <Media
        tone="rose"
        src="/03.png"
        alt="Wall display of FRIGG pacifiers in soft neutral colorways"
        className="min-h-[400px] md:min-h-[520px]"
      />
    </section>
  );
}

function DanishFlag() {
  return (
    <svg viewBox="0 0 20 14" className="h-3.5 w-5" aria-label="Made in Denmark">
      <rect width="20" height="14" fill="#c8102e" />
      <path d="M6 0h2.5v14H6z M0 5.75h20v2.5H0z" fill="#fff" />
    </svg>
  );
}
