import { Media } from "@/components/media";
import { SectionHeading } from "@/components/ui";
import { CATEGORIES } from "@/lib/content";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
      <SectionHeading className="mb-12">Shop by Category</SectionHeading>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <a key={category.label} href="#" className="group relative block">
            <Media
              tone={category.tone}
              alt={category.label}
              className="aspect-4/3 w-full"
            >
              <div className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/25" />
              <span className="eyebrow absolute inset-x-0 bottom-6 text-center text-paper drop-shadow">
                {category.label}
              </span>
            </Media>
          </a>
        ))}
      </div>
    </section>
  );
}
