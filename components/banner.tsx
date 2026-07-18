import { Media, type Tone } from "@/components/media";
import { Button } from "@/components/ui";

export function Banner({
  title,
  body,
  cta,
  tone,
  align = "center",
  alt,
}: {
  title: string;
  body?: string;
  cta: string;
  tone: Tone;
  align?: "center" | "left";
  alt: string;
}) {
  const centered = align === "center";

  return (
    <section className="relative">
      <Media
        tone={tone}
        alt={alt}
        overlay
        className="h-[52vh] min-h-[340px] w-full"
      />
      <div
        className={`absolute inset-0 flex items-center ${
          centered ? "justify-center" : ""
        }`}
      >
        <div
          className={`mx-auto w-full max-w-[1400px] px-8 lg:px-16 ${
            centered ? "text-center" : "text-left"
          }`}
        >
          <div className={`text-paper ${centered ? "mx-auto max-w-lg" : "max-w-sm"}`}>
            <h2 className="text-3xl font-light tracking-[0.12em] uppercase lg:text-4xl">
              {title}
            </h2>
            {body ? (
              <p className="mt-4 text-sm leading-relaxed opacity-90">{body}</p>
            ) : null}
            <Button href="#" variant="light" className="mt-7">
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
