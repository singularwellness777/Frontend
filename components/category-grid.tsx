import { Media, type Tone } from "@/components/media";
import { Button, SectionHeading } from "@/components/ui";

const MOMENTS: {
  label: string;
  subtitle: string;
  image: string;
  tone: Tone;
  href: string;
}[] = [
  {
    label: "Play Time",
    subtitle: "Sensory toys & wooden keepsakes",
    image: "/Play time.png",
    tone: "sand",
    href: "/shop",
  },
  {
    label: "Quiet Time",
    subtitle: "Organic swaddles & pacifiers",
    image: "/Quiet time.png",
    tone: "rose",
    href: "/shop",
  },
  {
    label: "Tummy Time",
    subtitle: "Soft mats & developmental gear",
    image: "/Tummy time.png",
    tone: "sage",
    href: "/shop",
  },
  {
    label: "Travel Ready",
    subtitle: "Wet bags, totes & on-the-go",
    image: "/Travel ready.png",
    tone: "clay",
    href: "/shop",
  },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3 text-muted">Curated by Moment</p>
        <SectionHeading>Shop by Category</SectionHeading>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MOMENTS.map((moment) => (
          <a
            key={moment.label}
            href={moment.href}
            className="group relative block overflow-hidden bg-cream"
          >
            <Media
              tone={moment.tone}
              src={moment.image}
              alt={moment.label}
              className="aspect-[3/4] w-full transition-transform duration-700 group-hover:scale-[1.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent transition-opacity duration-300 group-hover:from-ink/75" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                <p className="eyebrow">{moment.label}</p>
                <p className="mt-1.5 text-xs text-paper/80">{moment.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase text-paper/90 transition-transform duration-300 group-hover:translate-x-1">
                  Explore <span aria-hidden>→</span>
                </span>
              </div>
            </Media>
          </a>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button href="/shop" variant="outline">
          View all categories
        </Button>
      </div>
    </section>
  );
}
