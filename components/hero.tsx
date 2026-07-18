import { Media } from "@/components/media";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative">
      <Media
        tone="moss"
        alt="Toddler riding a balance bike through a garden"
        overlay
        className="h-[68vh] min-h-[420px] w-full lg:h-[78vh]"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-16">
          <div className="max-w-md text-paper">
            <p className="eyebrow mb-4 opacity-90">Ready. Set. Roll.</p>
            <h1 className="text-5xl leading-[1.05] font-light tracking-tight lg:text-6xl">
              Adventure
              <br />
              Ahead
            </h1>
            <Button href="#" variant="light" className="mt-8">
              Shop new toddler bike
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
