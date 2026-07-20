import { Fragment } from "react";
import { Media } from "@/components/media";
import { Button } from "@/components/ui";
import type { HomeMedia } from "@/lib/data";

export function Hero({ media }: { media?: HomeMedia }) {
  const hasOverlayContent = Boolean(media?.title || media?.subtitle || media?.linkUrl);
  const title = media?.title;
  const titleLines = title ? title.split("\n") : [];
  const subtitle = media?.subtitle;
  const href = media?.linkUrl;
  const buttonLabel = media?.linkUrl ? "Shop now" : undefined;

  return (
    <section className="relative">
      <Media
        tone="moss"
        alt={media?.alt ?? "Hero media for the storefront"}
        overlay={hasOverlayContent}
        className="h-[68vh] min-h-[420px] w-full lg:h-[78vh]"
        src={media?.src}
        mediaType={media?.mediaType}
        poster={media?.poster}
      />
      {hasOverlayContent ? (
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-16">
            <div className="max-w-md text-paper">
              {subtitle ? <p className="eyebrow mb-4 opacity-90">{subtitle}</p> : null}
              {titleLines.length > 0 ? (
                <h1 className="text-5xl leading-[1.05] font-light tracking-tight lg:text-6xl">
                  {titleLines.map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      {index < titleLines.length - 1 ? <br /> : null}
                    </Fragment>
                  ))}
                </h1>
              ) : null}
              {buttonLabel && href ? (
                <Button href={href} variant="light" className="mt-8">
                  {buttonLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
