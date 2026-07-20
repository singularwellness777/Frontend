import ProductPage from "@/app/products/[slug]/page";

export const dynamic = "force-dynamic";

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  return <ProductPage params={params} />;
}
