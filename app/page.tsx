import { CategoryGrid } from "@/components/category-grid";
import { Favorites } from "@/components/favorites";
import { FriggFeature } from "@/components/frigg-feature";
import { Hero } from "@/components/hero";
import { ShopTheLook } from "@/components/shop-the-look";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialProducts } from "@/components/social-products";
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

  const bestSellers = live ? products.all.slice(0, 4) : BEST_SELLERS;
  const socialProducts = live ? products.all.slice(0, 4) : FAVORITES.Feeding;

  return (
    <>
      <SiteHeader />
      <main>
        <Hero media={heroMedia} />

        <Favorites catalogue={products.byCategory} />

        <FriggFeature />

        <CategoryGrid />

        <ShopTheLook />

        <SocialProducts products={socialProducts} fallbackProducts={bestSellers} />
      </main>
      <SiteFooter />
    </>
  );
}
