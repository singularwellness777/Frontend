import type { Tone } from "@/components/media";
import type { Product as CardProduct, Category } from "@/lib/content";
import {
  getProducts,
  getReviews,
  groupByCategory,
  summarizeRatings,
  type Product as DbProduct,
  type RatingSummary,
} from "@/lib/data";

/* -------------------------------------------------------------------------- */
/* Bridging the catalogue to the card shape                                    */
/*                                                                             */
/* `products` has no tone/swatch columns — those are presentation, not         */
/* catalogue data. Rather than add columns the atelier would have to fill in    */
/* for every row, derive them from the slug: stable across renders and across   */
/* deploys, and a given product always looks the same.                          */
/* -------------------------------------------------------------------------- */

const TONES: Tone[] = ["cream", "sand", "sage", "clay", "rose", "moss", "stone"];

const SWATCHES: Record<Tone, string[]> = {
  cream: ["#e6dacc", "#dbbcb0"],
  sand: ["#d9c7b1", "#c9b6a4"],
  sage: ["#a9b4a1", "#8f9aa6", "#c9b6a4"],
  clay: ["#ad8d7d", "#d8c2b6"],
  rose: ["#dbbcb0", "#f0ded7", "#c3bdb3"],
  moss: ["#6b7862", "#9daa93"],
  stone: ["#c3bdb3", "#e3e0da"],
};

/** Stable non-cryptographic hash — same slug always lands on the same tone. */
function hash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function toneFor(slug: string): Tone {
  return TONES[hash(slug) % TONES.length];
}

function toCardProduct(
  product: DbProduct,
  ratings: Map<string, RatingSummary>,
): CardProduct {
  const tone = toneFor(product.slug);
  const rating = ratings.get(product.slug);
  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    price: product.price,
    rating: rating?.average ?? 0,
    reviews: rating?.count ?? 0,
    tone,
    swatches: SWATCHES[tone],
    image: product.image,
  };
}

/* -------------------------------------------------------------------------- */
/* Page data                                                                   */
/* -------------------------------------------------------------------------- */

export interface StorefrontProducts {
  /** Every published product, in the atelier's sort order. */
  all: CardProduct[];
  /** Keyed by the category tabs the homepage renders. */
  byCategory: Record<string, CardProduct[]>;
}

/**
 * One round-trip for the homepage: the catalogue plus the reviews needed to
 * show a rating on each card. Returns empty lists when Supabase is unreachable
 * (see lib/data.ts) — callers fall back to the built-in content.
 */
export async function getStorefrontProducts(): Promise<StorefrontProducts> {
  const [products, reviews] = await Promise.all([getProducts(), getReviews()]);
  const ratings = summarizeRatings(reviews);

  const all = products.map((product) => toCardProduct(product, ratings));

  const byCategory: Record<string, CardProduct[]> = {};
  for (const [category, group] of groupByCategory(products)) {
    byCategory[category] = group.map((product) => toCardProduct(product, ratings));
  }

  return { all, byCategory };
}

/** Products for a tab, or an empty list if the atelier has none in it yet. */
export function forCategory(
  products: StorefrontProducts,
  category: Category,
): CardProduct[] {
  return products.byCategory[category] ?? [];
}
