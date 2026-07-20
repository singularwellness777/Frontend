"use client";

import { useState } from "react";
import { Stars } from "@/components/ui";
import { supabase } from "@/lib/supabase";

interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
}

interface ProductDetailViewProps {
  slug: string;
  name: string;
  price: string;
  category: string;
  tagline: string;
  images: string[];
  description: string[];
  details: { label: string; value: string }[];
  materials: string[];
  reviews: ReviewItem[];
}

export function ProductDetailView({
  slug,
  name,
  price,
  category,
  tagline,
  images,
  description,
  details,
  materials,
  reviews,
}: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "materials">("description");

  const mainImage = images[selectedImageIndex] || "";
  const avgRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 5.0;

  const handleAddToCart = async () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("carts").upsert({
            user_id: user.id,
            product_slug: slug || "product",
            material: "",
            name: name,
            image: mainImage || "",
            price: price,
            quantity: quantity,
            updated_at: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-xs text-muted flex items-center gap-2">
        <a href="/" className="hover:text-ink transition">Home</a>
        <span>/</span>
        <a href="/shop" className="hover:text-ink transition">Shop</a>
        <span>/</span>
        <span className="text-ink font-medium">{name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-cream border border-line">
            {mainImage ? (
              <img
                src={mainImage}
                alt={name}
                className="h-full w-full object-cover object-center transition duration-300"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted">
                No Image Available
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    selectedImageIndex === idx
                      ? "border-ink"
                      : "border-line opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${name} ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="eyebrow text-muted">{category}</span>
            <h1 className="mt-1 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              {name}
            </h1>
            {tagline && <p className="mt-2 text-sm text-muted italic">{tagline}</p>}
          </div>

          {/* Price & Reviews */}
          <div className="flex items-center justify-between border-y border-line py-4">
            <span className="text-2xl font-light text-ink">{price}</span>
            <Stars rating={avgRating} reviews={reviews.length || 12} />
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-muted">Quantity</span>
              <div className="flex items-center rounded-full border border-line bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm text-ink hover:bg-cream rounded-l-full transition"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-medium text-ink">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm text-ink hover:bg-cream rounded-r-full transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full rounded-full bg-ink py-4 text-xs font-medium uppercase tracking-widest text-paper transition hover:bg-clay"
            >
              Add to Bag — {price}
            </button>

            {addedToCart && (
              <div className="rounded-xl bg-sage/20 p-3 text-center text-xs text-moss animate-fade-in">
                ✓ Added {quantity} x {name} to your bag!
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-cream p-4 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-base">🚚</span>
              <span>Free shipping on orders $35+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🌿</span>
              <span>100% Non-toxic & Safe</span>
            </div>
          </div>

          {/* Tabs: Description / Details / Materials */}
          <div className="mt-4 border-t border-line pt-6">
            <div className="flex border-b border-line gap-6 text-xs uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2 transition border-b-2 ${
                  activeTab === "description"
                    ? "border-ink text-ink font-semibold"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                Description
              </button>
              {details.length > 0 && (
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 transition border-b-2 ${
                    activeTab === "details"
                      ? "border-ink text-ink font-semibold"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  Details
                </button>
              )}
              {materials.length > 0 && (
                <button
                  onClick={() => setActiveTab("materials")}
                  className={`pb-2 transition border-b-2 ${
                    activeTab === "materials"
                      ? "border-ink text-ink font-semibold"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  Materials
                </button>
              )}
            </div>

            <div className="py-4 text-sm leading-relaxed text-muted">
              {activeTab === "description" && (
                <div className="space-y-3">
                  {description.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {activeTab === "details" && (
                <ul className="space-y-2">
                  {details.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b border-line/50 pb-1.5">
                      <span className="font-medium text-ink">{item.label}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "materials" && (
                <ul className="list-disc pl-5 space-y-1">
                  {materials.map((mat, idx) => (
                    <li key={idx}>{mat}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
