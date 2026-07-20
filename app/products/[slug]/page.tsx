import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductGrid } from "@/components/product-card";
import { getProductBySlug, getProducts, getReviews, summarizeRatings } from "@/lib/data";
import { getStorefrontProducts } from "@/lib/storefront";
import { BEST_SELLERS, FAVORITES } from "@/lib/content";
import { ProductDetailView } from "@/components/product-detail-view";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  // 1. Fetch real product from database
  let dbProduct = await getProductBySlug(slug);
  let reviews = await getReviews();
  let productReviews = reviews.filter((r) => r.productSlug === slug);

  // 2. Fallback to static catalogue if not found in database directly
  let fallbackProduct = null;
  if (!dbProduct) {
    const allStatic = [
      ...BEST_SELLERS,
      ...Object.values(FAVORITES).flat(),
    ];
    fallbackProduct = allStatic.find((p) => p.id === slug || p.name.toLowerCase().replace(/\s+/g, "-") === slug);
  }

  if (!dbProduct && !fallbackProduct) {
    notFound();
  }

  // Related products
  const storefrontProducts = await getStorefrontProducts();
  const relatedProducts = storefrontProducts.all
    .filter((p) => p.id !== slug)
    .slice(0, 4);

  const name = dbProduct?.name || fallbackProduct?.name || "Product";
  const price = dbProduct?.price || fallbackProduct?.price || "$0.00";
  const category = dbProduct?.category || "Catalogue";
  const tagline = dbProduct?.tagline || "";
  const images = dbProduct?.images?.length ? dbProduct.images : dbProduct?.image ? [dbProduct.image] : fallbackProduct?.image ? [fallbackProduct.image] : [];
  const modelMedia = dbProduct?.modelMedia || [];
  const bannerMedia = dbProduct?.bannerMedia || [];
  const description = dbProduct?.description || ["Thoughtfully designed and crafted with premium, sustainable materials for everyday use."];
  const details = dbProduct?.details || [];
  const materials = dbProduct?.materials || [];

  return (
    <>
      <SiteHeader />

      <main className="bg-paper min-h-screen">
        <ProductDetailView
          slug={slug}
          name={name}
          price={price}
          category={category}
          tagline={tagline}
          images={images}
          modelMedia={modelMedia}
          bannerMedia={bannerMedia}
          description={description}
          details={details}
          materials={materials}
          reviews={productReviews}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-[1400px] border-t border-line px-6 py-20 lg:px-10">
            <h2 className="section-title mb-10 text-center">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
