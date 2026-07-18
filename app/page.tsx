import { Banner } from "@/components/banner";
import { CategoryGrid } from "@/components/category-grid";
import { Favorites } from "@/components/favorites";
import { FollowUs } from "@/components/follow-us";
import { FriggFeature } from "@/components/frigg-feature";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/product-section";
import { ShopTheLook } from "@/components/shop-the-look";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { Press, Values } from "@/components/values";
import { BEST_SELLERS, FAVORITES } from "@/lib/content";
import { getHomeMedia } from "@/lib/data";
import { getStorefrontProducts } from "@/lib/storefront";

/**
 * The catalogue is read per request so edits in Admin appear on the storefront
 * immediately. If this ever needs to be cheaper, swap to `export const
 * revalidate = <seconds>` and have Admin call `revalidatePath("/")` on write.
 */
export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getStorefrontProducts();
  const homeMedia = await getHomeMedia();
  const heroMedia = homeMedia.find((item) => item.placement === "campaign");
  const live = products.all.length > 0;

  // The placeholder content is a different brand entirely, so it's all-or-
  // nothing: once there's a real catalogue, the product sections come from it
  // and empty ones drop out rather than backfilling with unrelated stock.
  const bestSellers = live ? products.all.slice(0, 4) : BEST_SELLERS;
  const categories = Object.keys(products.byCategory).sort();
  const [firstCategory, secondCategory] = categories;
  const sections = live
    ? [
        { cta: `Shop all ${firstCategory}`, products: products.byCategory[firstCategory] },
        secondCategory
          ? {
              cta: `Shop all ${secondCategory}`,
              products: products.byCategory[secondCategory],
            }
          : null,
      ].filter((s) => s !== null)
    : [
        { cta: "Shop all feeding", products: FAVORITES.Feeding },
        { cta: "Shop all FRIGG", products: FAVORITES.Pacifiers },
      ];

  return (
    <>
      <SiteHeader />
      <main>
        <Hero media={heroMedia} />

        <Favorites catalogue={products.byCategory} />

        <Banner
          title="Bubbly bath moments"
          body="Thoughtful bath essentials for real-life routines."
          cta="Shop bath & care"
          tone="stone"
          alt="Child playing in a bubble bath"
        />

        <ProductSection
          title="Best Sellers"
          cta="Shop best sellers"
          products={bestSellers}
        />

        <Banner
          title="Tiny tabletops"
          body="Designed for little hands, made to match your table."
          cta="Shop feeding"
          tone="sage"
          align="left"
          alt="Family gathered around a kitchen table"
        />

        {sections[0] ? (
          <ProductSection cta={sections[0].cta} products={sections[0].products} />
        ) : null}

        <FriggFeature />

        {sections[1] ? (
          <ProductSection cta={sections[1].cta} products={sections[1].products} />
        ) : null}

        <CategoryGrid />

        <Values />
        <Press />

        <ShopTheLook />

        <Testimonials />

        <FollowUs />
      </main>
      <SiteFooter />
    </>
  );
}
