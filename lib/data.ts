import { supabase } from "@/lib/supabase";

/* -------------------------------------------------------------------------- */
/* Types — mirror Admin/app/src/data/*.ts, minus the write paths.              */
/* -------------------------------------------------------------------------- */

export interface Product {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: string;
  tagline: string;
  image: string;
  images: string[];
  modelMedia: string[];
  bannerMedia: string[];
  description: string[];
  details: { label: string; value: string }[];
  materials: string[];
}

export type Placement = "campaign" | "gallery" | "products_hero" | "products_grid";

export interface HomeMedia {
  id: string;
  placement: Placement;
  mediaType: "image" | "video";
  src: string;
  poster: string;
  title: string;
  subtitle: string;
  alt: string;
  linkUrl: string;
  sortOrder: number;
}

export interface NavSubcategory {
  label: string;
  image: string;
  linkUrl: string;
}

export interface NavCategory {
  id: string;
  label: string;
  linkUrl: string;
  sortOrder: number;
  subcategories: NavSubcategory[];
}

export interface Review {
  id: string;
  productSlug: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
}

/** Aggregate rating for a product, derived from its published reviews. */
export interface RatingSummary {
  average: number;
  count: number;
}

export interface SiteSettings {
  comingSoon: boolean;
  heading: string;
  message: string;
}

/* -------------------------------------------------------------------------- */
/* Row mappers                                                                 */
/* -------------------------------------------------------------------------- */

type Row = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v : "");
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

function mapProduct(row: Row): Product {
  const images = arr<string>(row.images);
  const image = str(row.image);
  return {
    slug: str(row.slug),
    name: str(row.name),
    category: str(row.category),
    subcategory: str(row.subcategory),
    price: str(row.price),
    tagline: str(row.tagline),
    image,
    // Rows predating the gallery column only have the single cover image.
    images: images.length ? images : image ? [image] : [],
    modelMedia: arr<string>(row.model_media),
    bannerMedia: arr<string>(row.banner_media),
    description: arr<string>(row.description),
    details: arr<{ label: string; value: string }>(row.details),
    materials: arr<string>(row.materials),
  };
}

function mapHomeMedia(row: Row): HomeMedia {
  return {
    id: str(row.id),
    placement: (str(row.placement) || "campaign") as Placement,
    mediaType: str(row.media_type) === "video" ? "video" : "image",
    src: str(row.src),
    poster: str(row.poster),
    title: str(row.title),
    subtitle: str(row.subtitle),
    alt: str(row.alt),
    linkUrl: str(row.link_url),
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
  };
}

function mapNavCategory(row: Row): NavCategory {
  return {
    id: str(row.id),
    label: str(row.label),
    linkUrl: str(row.link_url),
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
    subcategories: arr<Row>(row.subcategories).map((s) => ({
      label: str(s.label),
      image: str(s.image),
      linkUrl: str(s.link_url),
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* Queries                                                                     */
/*                                                                             */
/* Every query resolves to an empty result rather than throwing: a storefront   */
/* that renders its fallback content beats one that 500s because the database   */
/* is unreachable. Callers treat "empty" as "use the built-in content".         */
/* -------------------------------------------------------------------------- */

async function query<T>(
  table: string,
  build: (q: ReturnType<NonNullable<typeof supabase>["from"]>) => PromiseLike<{
    data: unknown;
    error: { message: string } | null;
  }>,
  map: (row: Row) => T,
): Promise<T[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await build(supabase.from(table));
    if (error) {
      console.error(`[storefront] ${table}: ${error.message}`);
      return [];
    }
    return arr<Row>(data).map(map);
  } catch (cause) {
    console.error(`[storefront] ${table} unreachable`, cause);
    return [];
  }
}

export function getProducts(): Promise<Product[]> {
  return query(
    "products",
    (q) => q.select("*").order("sort_order", { ascending: true }),
    mapProduct,
  );
}

export function getHomeMedia(): Promise<HomeMedia[]> {
  return query(
    "home_media",
    (q) => q.select("*").order("sort_order", { ascending: true }),
    mapHomeMedia,
  );
}

export function getNavCategories(): Promise<NavCategory[]> {
  return query(
    "nav_categories",
    (q) => q.select("*").order("sort_order", { ascending: true }),
    mapNavCategory,
  );
}

/** Published reviews, newest first. RLS hides anything the atelier hid. */
export function getReviews(): Promise<Review[]> {
  return query(
    "reviews",
    (q) =>
      q
        .select("id, product_slug, author_name, rating, title, body")
        .eq("status", "published")
        .order("created_at", { ascending: false }),
    (row) => ({
      id: str(row.id),
      productSlug: str(row.product_slug),
      authorName: str(row.author_name) || "Verified buyer",
      rating: typeof row.rating === "number" ? row.rating : 0,
      title: str(row.title),
      body: str(row.body),
    }),
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const rows = await query(
    "site_settings",
    (q) => q.select("coming_soon, heading, message").eq("id", 1),
    (row) => ({
      comingSoon: row.coming_soon === true,
      heading: str(row.heading),
      message: str(row.message),
    }),
  );
  return rows[0] ?? { comingSoon: false, heading: "", message: "" };
}

/** Roll published reviews up into a per-product average + count. */
export function summarizeRatings(reviews: Review[]): Map<string, RatingSummary> {
  const totals = new Map<string, { sum: number; count: number }>();
  for (const review of reviews) {
    const entry = totals.get(review.productSlug) ?? { sum: 0, count: 0 };
    entry.sum += review.rating;
    entry.count += 1;
    totals.set(review.productSlug, entry);
  }
  return new Map(
    [...totals].map(([slug, { sum, count }]) => [
      slug,
      { average: sum / count, count },
    ]),
  );
}

/** Group the catalogue by top-level category, preserving sort_order. */
export function groupByCategory(products: Product[]): Map<string, Product[]> {
  const groups = new Map<string, Product[]>();
  for (const product of products) {
    const key = product.category.trim();
    if (!key) continue;
    groups.set(key, [...(groups.get(key) ?? []), product]);
  }
  return groups;
}
