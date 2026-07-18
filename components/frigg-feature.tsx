import { Media } from "@/components/media";
import { Button } from "@/components/ui";

export function FriggFeature() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="flex items-center bg-clay px-8 py-20 text-paper lg:px-20">
        <div className="mx-auto max-w-sm text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <DanishFlag />
            <span className="eyebrow opacity-90">The best for our babies</span>
          </div>
          <p className="text-4xl tracking-[0.15em] lg:text-5xl">
            FRIGG<sup className="text-base align-super">®</sup>
          </p>
          <p className="mt-6 text-sm leading-relaxed opacity-90">
            Designed and manufactured in Hvidovre, Denmark, every pacifier is
            crafted with safety and beauty in mind — promoting health and
            wellness for your little one.
          </p>
          <Button href="#" variant="light" className="mt-8">
            Shop now
          </Button>
        </div>
      </div>

      <Media
        tone="rose"
        alt="Wall display of FRIGG pacifiers in every colorway"
        className="min-h-[380px]"
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
