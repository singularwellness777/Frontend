import { Media } from "@/components/media";
import type { Product } from "@/lib/content";

export function SocialProducts({
  products,
  fallbackProducts,
}: {
  products: Product[];
  fallbackProducts?: Product[];
}) {
  const items = (products.length ? products : fallbackProducts ?? []).slice(0, 4);

  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-14 lg:px-10 lg:py-20">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden bg-white shadow-[0_8px_28px_rgba(43,39,36,0.08)]"
          >
            <a href={`/products/${product.slug || product.id}`} className="group block">
              <Media
                tone={product.tone}
                src={product.image}
                alt={product.name}
                className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="space-y-2 px-4 py-4">
                <h3 className="line-clamp-2 min-h-9 text-sm leading-tight font-medium text-ink">
                  {product.name}
                </h3>
                <p className="text-[11px] text-muted">Verified favorite</p>
                <p className="text-sm font-medium text-ink">
                  {product.price}
                  {product.compareAt ? (
                    <span className="ml-2 text-xs font-normal text-muted line-through">
                      {product.compareAt}
                    </span>
                  ) : null}
                </p>
              </div>
            </a>
            <div className="px-4 pb-4">
              <button className="w-full bg-ink px-4 py-3 text-xs font-medium tracking-[0.08em] text-paper uppercase transition-colors hover:bg-ink/85">
                Add To Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
