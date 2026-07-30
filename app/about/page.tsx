import type { Metadata } from "next";
import { Media, type Tone } from "@/components/media";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Story — Singular Cares",
  description:
    "Discover how the Indian godadi inspired Singular Cares to make soft, practical quilted mats for a new generation.",
};

export const dynamic = "force-dynamic";

const CONSTRUCTION = [
  {
    number: "01",
    title: "Stays even",
    body: "Two layers of compressed cotton, chosen so the padding stays smooth and never lumps.",
  },
  {
    number: "02",
    title: "Gentle from day one",
    body: "A printed rayon face, soft enough for skin only weeks old.",
  },
  {
    number: "03",
    title: "Twice the life",
    body: "The same print on both sides, because truly reversible should mean twice the use.",
  },
  {
    number: "04",
    title: "Finished by hand",
    body: "Every edge is bound in fabric and carefully finished for the years ahead.",
  },
];

const FAMILIAR_MOMENTS = [
  { label: "Morning", title: "Tummy time", tone: "sand" as Tone },
  { label: "Afternoon", title: "Quiet time", tone: "rose" as Tone },
  { label: "Everyday", title: "Play time", tone: "sage" as Tone },
  { label: "Away", title: "Travel ready", tone: "stone" as Tone },
];

function SignOff({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.26em] ${
        light ? "text-paper/60" : "text-muted"
      }`}
    >
      <span
        aria-hidden
        className={`h-px w-8 ${light ? "bg-paper/30" : "bg-ink/20"}`}
      />
      More Time for Love
    </div>
  );
}

export default async function AboutPage() {
  const products = await getProducts();
  const catalogueMedia = products
    .flatMap((product) =>
      product.images.length ? product.images : [product.image],
    )
    .filter((src): src is string => Boolean(src));
  const image = (index: number) =>
    catalogueMedia.length
      ? catalogueMedia[index % catalogueMedia.length]
      : undefined;

  return (
    <>
      <SiteHeader />

      <main className="overflow-hidden bg-paper">
        {/* Hero */}
        <section className="mx-auto grid min-h-[76vh] max-w-[1600px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
            <div className="max-w-xl">
              <p className="eyebrow mb-8 text-clay">The Singular story</p>
              <h1 className="text-[clamp(3.25rem,6vw,6.75rem)] leading-[0.92] font-light tracking-[-0.045em] text-ink">
                Made with the kind of love that never grows old.
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
                Long before a baby understands words, they understand warmth.
              </p>
              <div className="mt-12">
                <SignOff />
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px] bg-cream lg:min-h-full">
            <Media
              src="/03.png"
              tone="sand"
              alt="A Singular quilted mat, made as a familiar place for baby"
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between border-t border-paper/50 pt-4 text-paper sm:inset-x-10">
              <span className="eyebrow">The modern godadi</span>
              <span className="text-xs">Made to be remembered</span>
            </div>
          </div>
        </section>

        {/* Origin */}
        <section className="bg-cream">
          <div className="mx-auto grid max-w-[1500px] gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-16 lg:py-36">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="block text-[7rem] leading-none font-light tracking-[-0.08em] text-clay/30 sm:text-[10rem]">
                01
              </span>
              <p className="eyebrow mt-2 text-clay">The origin</p>
              <h2 className="mt-5 max-w-lg text-4xl leading-tight font-light tracking-tight text-ink sm:text-6xl">
                It began with a <em className="font-light">godadi.</em>
              </h2>
              <div className="mt-10">
                <SignOff />
              </div>
            </div>

            <div className="space-y-10">
              <p className="max-w-2xl text-2xl leading-snug font-light text-ink sm:text-3xl">
                In homes across India, there has always been a godadi.
              </p>
              <div className="grid gap-8 text-base leading-8 text-muted sm:grid-cols-2">
                <p>
                  Not bought. Made. Stitched together in the afternoon light
                  from cotton that had already lived a life — a mother’s saree,
                  a grandmother’s dupatta — softened by years of washing until
                  it was gentle enough for a newborn’s skin.
                </p>
                <p>
                  Every family had one. Every family still remembers theirs. It
                  was where the baby was laid down after a bath. Where tummy
                  time happened. Where an afternoon nap turned into an hour
                  nobody wanted to end.
                </p>
              </div>

              <figure className="pt-6">
                <Media
                  src={image(1)}
                  tone="rose"
                  alt="The quilting and hand-finished edge of a Singular mat"
                  className="aspect-[16/10] w-full"
                />
                <figcaption className="mt-4 flex items-start justify-between gap-8 text-xs leading-relaxed text-muted">
                  <span>Made with memory in every layer.</span>
                  <span className="max-w-sm text-right">
                    When the child outgrew it, it was folded and kept — because
                    you do not throw away something made by those hands.
                  </span>
                </figcaption>
              </figure>

              <blockquote className="border-l border-clay pl-6 text-2xl leading-snug font-light text-ink sm:pl-10 sm:text-4xl">
                Singular began with a simple question: why did we stop making
                them this way?
              </blockquote>
            </div>
          </div>
        </section>

        {/* Belief / construction */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
              <div>
                <p className="eyebrow text-clay">What we believe</p>
                <h2 className="mt-5 max-w-xl text-4xl leading-tight font-light tracking-tight sm:text-6xl">
                  Softness, chosen with experience.
                </h2>
              </div>
              <div className="space-y-6 text-base leading-8 text-paper/65">
                <p>
                  A grandmother does not read a label to know if a fabric is
                  soft. She takes it between her fingers.
                </p>
                <p>
                  She knows that padding which feels plush in the shop will
                  bunch into ridges by the third wash. She knows that a print
                  looks lovely on one side and cheap on the other, and that a
                  baby will find the cheap side.
                </p>
                <p className="text-xl leading-relaxed text-paper">
                  We build to that standard, not to a spec sheet.
                </p>
              </div>
            </div>

            <div className="mt-20 grid border-y border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
              {CONSTRUCTION.map((item) => (
                <article
                  key={item.number}
                  className="border-b border-paper/15 px-1 py-10 sm:px-7 lg:border-r lg:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <span className="text-xs tracking-[0.2em] text-clay">
                    {item.number}
                  </span>
                  <h3 className="mt-8 text-xl font-light">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-paper/55">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <p className="max-w-2xl text-2xl leading-snug font-light sm:text-3xl">
                Beauty with a purpose. Practicality for real family life.
                Softness chosen the way she would have chosen it.
              </p>
              <SignOff light />
            </div>
          </div>
        </section>

        {/* Familiar place */}
        <section>
          <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="grid items-start gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-clay">Made for every day</p>
                <h2 className="mt-5 text-4xl leading-tight font-light tracking-tight sm:text-6xl">
                  A familiar place.
                </h2>
                <p className="mt-7 text-lg leading-8 text-muted">
                  Babies find their bearings through repetition. The same
                  voice. The same light. The same soft place beneath them.
                </p>
                <p className="mt-6 text-base leading-8 text-muted">
                  A Singular mat becomes that place. Spread out on the floor
                  for morning play. Carried to the balcony when the sun is
                  kind. Laid inside the cot at night. Folded into a bag on the
                  way to Nani’s house, so that even somewhere new, something is
                  familiar.
                </p>
                <div className="mt-10">
                  <SignOff />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {FAMILIAR_MOMENTS.map((moment, index) => (
                  <figure
                    key={moment.title}
                    className={index % 2 ? "sm:translate-y-12" : ""}
                  >
                    <Media
                      src={image(index + 2)}
                      tone={moment.tone}
                      alt={`${moment.title} on a Singular quilted mat`}
                      className="aspect-[4/5] w-full"
                    />
                    <figcaption className="flex justify-between border-b border-line py-4">
                      <span className="eyebrow text-clay">{moment.label}</span>
                      <span className="text-sm text-ink">{moment.title}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-24 grid gap-6 border-t border-line pt-10 text-sm leading-7 text-muted sm:grid-cols-3 lg:mt-36">
              <p>
                <strong className="block font-medium text-ink">
                  Folds flat
                </strong>
                Light enough to move from one familiar corner to the next.
              </p>
              <p>
                <strong className="block font-medium text-ink">
                  Washes easily
                </strong>
                It goes into the machine and comes out exactly as it went in.
              </p>
              <p>
                <strong className="block font-medium text-ink">
                  Made for birth to two
                </strong>
                Designed to hold up through everything those first years bring.
              </p>
            </div>
          </div>
        </section>

        {/* Handover */}
        <section className="bg-rose/60">
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
            <Media
              src={image(6)}
              tone="rose"
              alt="A keepsake made to pass from one generation to the next"
              className="min-h-[520px] w-full lg:min-h-[820px]"
            />

            <div className="flex items-center px-6 py-24 sm:px-12 lg:px-16">
              <div className="max-w-xl">
                <p className="eyebrow text-clay">The handover</p>
                <h2 className="mt-5 text-4xl leading-tight font-light tracking-tight sm:text-6xl">
                  From one generation of love to the next.
                </h2>
                <div className="mt-9 space-y-6 text-base leading-8 text-muted">
                  <p>
                    There is a particular kind of gift only a grandmother
                    gives.
                  </p>
                  <p>
                    It is never the loudest thing in the room. It arrives
                    quietly, wrapped in cloth, and it turns out to be the thing
                    the family still has years later — long after the toys have
                    gone, long after the child has grown taller than she is.
                  </p>
                  <p className="text-2xl leading-snug font-light text-ink">
                    That is what we are trying to make.
                  </p>
                  <p>
                    Not a product a family uses for a season. Something a
                    family keeps. Something a mother one day folds away, and
                    then, when her own daughter has a baby, takes out again.
                  </p>
                </div>
                <div className="mt-12">
                  <SignOff />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="bg-moss px-6 py-24 text-paper sm:px-10 lg:py-36">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mx-auto max-w-3xl text-lg leading-8 text-paper/65">
              Every mat carries our belief that love is found in the details —
              and that the care given today becomes a memory carried for years.
            </p>
            <blockquote className="mt-10 text-[clamp(2.75rem,6vw,6.5rem)] leading-[1.02] font-light tracking-[-0.04em]">
              “You will always have a soft place in my heart.”
            </blockquote>
            <div className="mt-12 flex justify-center">
              <SignOff light />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
