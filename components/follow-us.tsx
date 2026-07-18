import { Media, type Tone } from "@/components/media";
import { SectionHeading } from "@/components/ui";

const FEED: Tone[] = ["cream", "sage", "sand", "rose", "stone", "clay"];

export function FollowUs() {
  return (
    <section className="pb-20">
      <SectionHeading className="mb-10">Follow Us</SectionHeading>
      <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
        {FEED.map((tone, i) => (
          <a key={i} href="#" className="group relative block">
            <Media tone={tone} alt="Instagram post" className="aspect-square" />
            <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/15" />
          </a>
        ))}
      </div>
    </section>
  );
}
