import { PRESS, VALUES } from "@/lib/content";
import { Button, SectionHeading } from "@/components/ui";

export function Values() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading className="mb-12">Calm to Parenthood</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {VALUES.map((value) => (
            <article
              key={value.title}
              className="bg-paper px-8 py-10 text-center"
            >
              <h3 className="eyebrow mb-4">{value.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{value.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Press() {
  return (
    <section className="bg-cream pb-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading className="mb-10">What Everyone Is Saying</SectionHeading>
        <div className="no-scrollbar flex items-center justify-between gap-8 overflow-x-auto">
          {PRESS.map((name) => (
            <span
              key={name}
              className="shrink-0 text-xl tracking-[0.1em] text-ink/45 grayscale"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="outline">Read all press</Button>
        </div>
      </div>
    </section>
  );
}
