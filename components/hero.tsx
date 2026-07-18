import { Fragment } from "react";
import { Media } from "@/components/media";
import { Button } from "@/components/ui";
import type { HomeMedia } from "@/lib/data";

export function Hero({ media }: { media?: HomeMedia }) {
  const title = media?.title ?? "Adventure\nAhead";
  const titleLines = title.split("\n");
  const subtitle = media?.subtitle ?? "Ready. Set. Roll.";
  const href = media?.linkUrl || "/shop";
  const buttonLabel = media?.linkUrl ? "Shop now" : "Shop new toddler bike";
  const imageSrc = media?.mediaType === "image" ? media?.src : media?.poster;

  return (
    <section className="relative">
      <Media
        tone="moss"
        alt={media?.alt ?? "Hero image for the storefront"}
        overlay
        className="h-[68vh] min-h-[420px] w-full lg:h-[78vh]"
        src={imageSrc}
      />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-16">
          <div className="max-w-md text-paper">
            <p className="eyebrow mb-4 opacity-90">{subtitle}</p>
            <h1 className="text-5xl leading-[1.05] font-light tracking-tight lg:text-6xl">
              {titleLines.map((line, index) => (
                <Fragment key={index}>
                  {line}
                  {index < titleLines.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </h1>
            <Button href={href} variant="light" className="mt-8">
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
