import { ProductGrid } from "@/components/product-card";
import { Button, SectionHeading } from "@/components/ui";
import type { Product } from "@/lib/content";

export function ProductSection({
  title,
  cta,
  products,
}: {
  title?: string;
  cta: string;
  products: Product[];
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
      {title ? <SectionHeading className="mb-12">{title}</SectionHeading> : null}
      <ProductGrid products={products} />
      <div className="mt-12 flex justify-center">
        <Button variant="outline">{cta}</Button>
      </div>
    </section>
  );
}
