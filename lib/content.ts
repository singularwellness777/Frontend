import type { Tone } from "@/components/media";

export const BRAND = "mushie";

export const ANNOUNCEMENT = "Free shipping on US orders $35+";

export const NAV = [
  { label: "New", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Gifting", href: "/gifting" },
  { label: "About", href: "/about" },
];

export type Product = {
  id: string;
  name: string;
  price: string;
  compareAt?: string;
  rating: number;
  reviews: number;
  tone: Tone;
  swatches: string[];
  /** Real photography from the catalogue. Absent on the built-in placeholders,
   *  which fall back to the tone gradient. */
  image?: string;
};

export type Category =
  | "Play"
  | "Feeding"
  | "Bath & Care"
  | "Bedding"
  | "Pacifiers"
  | "Nursery"
  | "On the Go"
  | "Wear";

export const FAVORITE_TABS: Category[] = [
  "Play",
  "Feeding",
  "Bath & Care",
  "Bedding",
  "Pacifiers",
  "Nursery",
  "On the Go",
  "Wear",
];

export const FAVORITES: Record<Category, Product[]> = {
  Play: [
    { id: "p1", name: "Mini Toddler Bike", price: "$89.00", compareAt: "$99.00", rating: 4.6, reviews: 128, tone: "sage", swatches: ["#a9b4a1", "#c9b6a4", "#8f9aa6"] },
    { id: "p2", name: "Suction Spinner Ball", price: "$14.00", rating: 4.8, reviews: 342, tone: "cream", swatches: ["#e6dacc", "#dbbcb0"] },
    { id: "p3", name: "Silicone Sensory Toy", price: "$16.00", rating: 4.7, reviews: 96, tone: "moss", swatches: ["#6f7c66", "#b99b8d"] },
    { id: "p4", name: "Kaleidoscope", price: "$18.00", rating: 4.9, reviews: 54, tone: "stone", swatches: ["#c3bdb3", "#a9b4a1", "#e9d7cf"] },
  ],
  Feeding: [
    { id: "f1", name: "Silicone Baby Bib", price: "$16.00", rating: 4.9, reviews: 1204, tone: "rose", swatches: ["#e9d7cf", "#a9b4a1", "#c3bdb3", "#b99b8d"] },
    { id: "f2", name: "Silicone Suction Plate", price: "$24.00", rating: 4.8, reviews: 876, tone: "sage", swatches: ["#a9b4a1", "#e6dacc", "#b99b8d"] },
    { id: "f3", name: "Snack Cup", price: "$14.00", rating: 4.7, reviews: 431, tone: "sand", swatches: ["#e6dacc", "#e9d7cf"] },
    { id: "f4", name: "Silicone Suction Bowl", price: "$22.00", rating: 4.9, reviews: 652, tone: "cream", swatches: ["#f3ede5", "#a9b4a1", "#b99b8d"] },
  ],
  "Bath & Care": [
    { id: "b1", name: "Hooded Bath Towel", price: "$34.00", rating: 4.9, reviews: 512, tone: "cream", swatches: ["#f3ede5", "#e9d7cf"] },
    { id: "b2", name: "Bath Bucket", price: "$26.00", rating: 4.6, reviews: 188, tone: "sand", swatches: ["#e6dacc", "#a9b4a1"] },
    { id: "b3", name: "Baby Hair Brush", price: "$12.00", rating: 4.8, reviews: 240, tone: "stone", swatches: ["#c3bdb3"] },
    { id: "b4", name: "Bath Rinse Cup", price: "$14.00", rating: 4.7, reviews: 133, tone: "sage", swatches: ["#a9b4a1", "#e6dacc"] },
  ],
  Bedding: [
    { id: "bd1", name: "Muslin Swaddle", price: "$28.00", rating: 4.9, reviews: 720, tone: "cream", swatches: ["#f3ede5", "#e9d7cf", "#a9b4a1"] },
    { id: "bd2", name: "Crib Sheet", price: "$32.00", rating: 4.8, reviews: 410, tone: "sand", swatches: ["#e6dacc", "#c3bdb3"] },
    { id: "bd3", name: "Knitted Blanket", price: "$48.00", rating: 4.9, reviews: 205, tone: "stone", swatches: ["#c3bdb3", "#b99b8d"] },
    { id: "bd4", name: "Sleep Bag", price: "$42.00", rating: 4.7, reviews: 162, tone: "sage", swatches: ["#a9b4a1"] },
  ],
  Pacifiers: [
    { id: "pa1", name: "FRIGG Daisy Natural Rubber Pacifier 2-Pack", price: "$14.00", rating: 4.9, reviews: 980, tone: "rose", swatches: ["#e9d7cf", "#c3bdb3", "#a9b4a1"] },
    { id: "pa2", name: "FRIGG Daisy Silicone Pacifier 2-Pack", price: "$14.00", rating: 4.8, reviews: 764, tone: "sand", swatches: ["#e6dacc", "#b99b8d"] },
    { id: "pa3", name: "FRIGG Daisy Night Natural Rubber Pacifier 2-Pack", price: "$16.00", rating: 4.9, reviews: 388, tone: "clay", swatches: ["#b99b8d", "#e9d7cf"] },
    { id: "pa4", name: "FRIGG Daisy Night Silicone Pacifier 2-Pack", price: "$16.00", rating: 4.8, reviews: 297, tone: "cream", swatches: ["#f3ede5", "#a9b4a1"] },
  ],
  Nursery: [
    { id: "n1", name: "Woven Storage Basket", price: "$38.00", rating: 4.8, reviews: 176, tone: "sand", swatches: ["#e6dacc"] },
    { id: "n2", name: "Wooden Nightlight", price: "$44.00", rating: 4.7, reviews: 92, tone: "cream", swatches: ["#f3ede5", "#b99b8d"] },
    { id: "n3", name: "Changing Pad Cover", price: "$29.00", rating: 4.9, reviews: 318, tone: "rose", swatches: ["#e9d7cf", "#a9b4a1"] },
    { id: "n4", name: "Wall Shelf", price: "$52.00", rating: 4.6, reviews: 61, tone: "stone", swatches: ["#c3bdb3"] },
  ],
  "On the Go": [
    { id: "g1", name: "Packable Tote", price: "$36.00", rating: 4.7, reviews: 143, tone: "moss", swatches: ["#6f7c66", "#e6dacc"] },
    { id: "g2", name: "Travel Changing Mat", price: "$28.00", rating: 4.8, reviews: 209, tone: "sage", swatches: ["#a9b4a1"] },
    { id: "g3", name: "Stroller Clips", price: "$12.00", rating: 4.6, reviews: 88, tone: "stone", swatches: ["#c3bdb3", "#b99b8d"] },
    { id: "g4", name: "Insulated Bottle", price: "$32.00", rating: 4.9, reviews: 254, tone: "clay", swatches: ["#b99b8d", "#a9b4a1"] },
  ],
  Wear: [
    { id: "w1", name: "Long Sleeve Bib", price: "$24.00", rating: 4.8, reviews: 511, tone: "cream", swatches: ["#f3ede5", "#e9d7cf", "#a9b4a1"] },
    { id: "w2", name: "Ribbed Romper", price: "$34.00", rating: 4.9, reviews: 287, tone: "sand", swatches: ["#e6dacc", "#b99b8d"] },
    { id: "w3", name: "Knit Bonnet", price: "$18.00", rating: 4.7, reviews: 134, tone: "rose", swatches: ["#e9d7cf"] },
    { id: "w4", name: "Terry Booties", price: "$16.00", rating: 4.8, reviews: 76, tone: "stone", swatches: ["#c3bdb3", "#a9b4a1"] },
  ],
};

export const BEST_SELLERS: Product[] = [
  { id: "bs1", name: "Water Resistant Wet Bag", price: "$24.00", rating: 4.8, reviews: 402, tone: "stone", swatches: ["#c3bdb3", "#a9b4a1", "#e9d7cf"] },
  { id: "bs2", name: "Bath Bucket", price: "$26.00", rating: 4.7, reviews: 188, tone: "cream", swatches: ["#f3ede5", "#e6dacc"] },
  { id: "bs3", name: "Stacking Cups Toy", price: "$22.00", rating: 4.9, reviews: 913, tone: "sand", swatches: ["#e6dacc", "#b99b8d", "#a9b4a1"] },
  { id: "bs4", name: "Long Sleeve Bib", price: "$24.00", rating: 4.8, reviews: 511, tone: "rose", swatches: ["#e9d7cf", "#a9b4a1"] },
];

export const CATEGORIES: { label: string; tone: Tone }[] = [
  { label: "Play", tone: "sand" },
  { label: "Bedding", tone: "sage" },
  { label: "Nursery", tone: "cream" },
  { label: "Bath & Care", tone: "clay" },
];

export const VALUES = [
  {
    title: "Function",
    body: "Our durable products are designed for longevity, sustainability and everyday ease — built to be used, washed and used again.",
  },
  {
    title: "Safety",
    body: "Free of BPA, PVC, phthalates and lead. Every material we choose is tested to meet or exceed global safety standards.",
  },
  {
    title: "Beauty",
    body: "Founded in 2018, we create seasonless, modern, sustainable products for little ones — tuned to the palette of your home.",
  },
];

export const PRESS = [
  "well+good",
  "BuzzFeed",
  "VOGUE",
  "Forbes",
  "MOTHERLY",
  "GLAMOUR",
];

export const TESTIMONIALS = [
  {
    quote:
      "I love this sippy cup and another great Mushie product. Easy to use, clean and grow with your kiddo!",
    author: "Jennifer M.",
  },
  {
    quote:
      "Perfect towel for newborns. They are soft and I love the colors — we bought a second set within a week.",
    author: "Loreen D.",
  },
  {
    quote:
      "The bibs have survived a year of daily use and still look new. Nothing else has held up like this.",
    author: "Priya S.",
  },
];
