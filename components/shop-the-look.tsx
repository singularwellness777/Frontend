import { Media } from "@/components/media";

export function ShopTheLook() {
  return (
    <section className="relative">
      <Media
        tone="stone"
        alt="Family in a kitchen, toddler on a balance bike"
        className="h-[70vh] min-h-[440px] w-full"
      />

      {/* Shoppable hotspot — pinned to a product in the scene. */}
      <div className="absolute right-6 top-1/2 w-44 -translate-y-1/2 lg:right-20">
        <div className="bg-paper p-3 shadow-lg">
          <Media tone="sage" alt="Mini Toddler Bike" className="aspect-square w-full" />
          <p className="mt-3 text-[11px] leading-tight">Mini Toddler Bike</p>
          <p className="mt-1 text-[11px]">
            $89.00 <span className="text-muted line-through">$99.00</span>
          </p>
        </div>
        <button
          aria-label="Add Mini Toddler Bike to cart"
          className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-paper text-lg shadow-md transition-transform hover:scale-105"
        >
          +
        </button>
      </div>
    </section>
  );
}
