import { CategoryGrid } from "@/components/category-grid";
import { Favorites } from "@/components/favorites";
import { FriggFeature } from "@/components/frigg-feature";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHomeMedia } from "@/lib/data";
import { getStorefrontProducts } from "@/lib/storefront";

/**
 * The catalogue is read per request so edits in Admin appear on the storefront
 * immediately. If this ever needs to be cheaper, swap to `export const
 * revalidate = <seconds>` and have Admin call `revalidatePath("/")` on write.
 */
export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, homeMedia] = await Promise.all([
    getStorefrontProducts(),
    getHomeMedia(),
  ]);
  const heroMedia = homeMedia.find((item) => item.placement === "campaign");

  return (
    <>
      <SiteHeader />
      <main>
        <Hero media={heroMedia} />

        <Favorites catalogue={products.byCategory} />

        <FriggFeature />

        <CategoryGrid />
      </main>
      <SiteFooter />
    </>
  );
}
