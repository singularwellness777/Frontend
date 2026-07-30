"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  getLocalCart,
  saveLocalCart,
  updateLocalQuantity,
  removeLocalItem,
  clearLocalCart,
  type CartItem,
} from "@/lib/cart-store";
import type { User } from "@supabase/supabase-js";

export function CartView() {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    async function loadCartAndUser() {
      // 1. First get items from local cart store
      const currentItems = getLocalCart();
      setItems(currentItems);

      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        // Use the locally cached session for cart hydration. Calling getUser()
        // here makes every cart visit depend on a separate Auth API request.
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession();
        if (authError) return;

        const user = session?.user ?? null;
        setUser(user);

        if (user) {
          // Fetch cart from Supabase
          const { data: dbCarts } = await supabase
            .from("carts")
            .select("*")
            .eq("user_id", user.id);

          if (dbCarts && dbCarts.length > 0) {
            const mappedItems: CartItem[] = dbCarts.map((row) => {
              const numPrice = parseFloat((row.price || "").replace(/[^0-9.]/g, "")) || 0;
              return {
                id: `${row.product_slug}-${row.material}`,
                slug: row.product_slug,
                name: row.name || "Product",
                price: numPrice,
                priceString: row.price || "$0.00",
                image: row.image || "",
                quantity: row.quantity || 1,
                category: "Catalogue",
              };
            });
            setItems(mappedItems);
            saveLocalCart(mappedItems);
          }
        }
      } catch (err) {
        console.error("Load cart error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCartAndUser();
  }, []);

  const updateQuantity = async (id: string, delta: number) => {
    const targetItem = items.find((i) => i.id === id || i.slug === id);
    const updated = updateLocalQuantity(id, delta);
    setItems(updated);

    if (supabase && user && targetItem) {
      const newQty = targetItem.quantity + delta;
      if (newQty > 0) {
        await supabase
          .from("carts")
          .update({ quantity: newQty, updated_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .eq("product_slug", targetItem.slug);
      } else {
        await supabase
          .from("carts")
          .delete()
          .eq("user_id", user.id)
          .eq("product_slug", targetItem.slug);
      }
    }
  };

  const removeItem = async (id: string) => {
    const targetItem = items.find((i) => i.id === id || i.slug === id);
    const updated = removeLocalItem(id);
    setItems(updated);

    if (supabase && user && targetItem) {
      await supabase
        .from("carts")
        .delete()
        .eq("user_id", user.id)
        .eq("product_slug", targetItem.slug);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 35.0;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const estimatedShipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 5.99;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal - discountAmount + estimatedShipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SINGULAR10" || promoCode.trim().toUpperCase() === "WELCOME10") {
      setAppliedDiscount(10);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try SINGULAR10");
    }
  };

  const handleCheckout = async () => {
    setIsPlacingOrder(true);
    try {
      if (supabase && user) {
        // Place order in Supabase
        await supabase.from("orders").insert({
          user_id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email,
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            price: i.priceString || `$${i.price.toFixed(2)}`,
            image: i.image,
            quantity: i.quantity,
          })),
          total: `$${total.toFixed(2)}`,
          status: "pending",
        });

        await supabase.from("carts").delete().eq("user_id", user.id);
      }

      clearLocalCart();
      setItems([]);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-clay border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16">
      <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-ink mb-8 text-center">
        Your Shopping Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
      </h1>

      {/* Free Shipping Progress Bar */}
      <div className="mx-auto max-w-xl mb-12 rounded-2xl border border-line bg-cream p-5 text-center shadow-sm">
        {remainingForFreeShipping > 0 ? (
          <p className="text-xs text-muted mb-2">
            Add <span className="font-semibold text-ink">${remainingForFreeShipping.toFixed(2)}</span> more to qualify for <span className="font-semibold text-ink">FREE Shipping</span>!
          </p>
        ) : (
          <p className="text-xs font-semibold text-moss mb-2">
            🎉 You have unlocked FREE Shipping!
          </p>
        )}
        <div className="w-full bg-sand/60 rounded-full h-2 overflow-hidden">
          <div
            className="bg-clay h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {orderPlaced ? (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto rounded-3xl border border-line bg-cream p-8">
          <span className="text-4xl">🎉</span>
          <h2 className="text-2xl font-light text-ink">Order Request Placed!</h2>
          <p className="text-xs text-muted leading-relaxed">
            Thank you for your order. We will follow up shortly to confirm details.
          </p>
          <Link
            href="/account"
            className="inline-block rounded-full bg-ink px-8 py-3 text-xs uppercase tracking-widest text-paper hover:bg-clay transition mt-4"
          >
            View My Account
          </Link>
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center space-y-4">
          <p className="text-lg text-muted">Your bag is currently empty.</p>
          <Link
            href="/shop"
            className="inline-block rounded-full bg-ink px-8 py-3.5 text-xs uppercase tracking-widest text-paper hover:bg-clay transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex gap-6 items-center">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-line bg-cream">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-muted">No Image</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="eyebrow text-muted">{item.category}</span>
                    <h3 className="text-base font-medium text-ink truncate">{item.name}</h3>
                    <p className="text-sm text-ink font-light">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center rounded-full border border-line bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 text-sm text-ink hover:bg-cream rounded-l-full transition"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-medium text-ink">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-sm text-ink hover:bg-cream rounded-r-full transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right space-y-1">
                    <p className="text-sm font-semibold text-ink">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-muted hover:text-red-600 transition underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link href="/shop" className="text-xs uppercase tracking-wider text-muted hover:text-ink transition">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-line bg-cream p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-semibold text-ink border-b border-line pb-4">Order Summary</h2>

              <div className="space-y-3 text-xs text-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-moss">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-ink">
                    {estimatedShipping === 0 ? "FREE" : `$${estimatedShipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="pt-2 border-t border-line">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (SINGULAR10)"
                    className="w-full rounded-full border border-line bg-white px-4 py-2.5 text-xs outline-none focus:border-clay"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-ink px-5 py-2.5 text-xs text-paper uppercase tracking-wider hover:bg-clay transition shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-red-600 mt-1 pl-2">{promoError}</p>}
                {appliedDiscount > 0 && <p className="text-[11px] text-moss mt-1 pl-2">✓ 10% discount applied!</p>}
              </form>

              {/* Total & Checkout */}
              <div className="border-t border-line pt-4 space-y-4">
                <div className="flex justify-between text-base font-medium text-ink">
                  <span>Total</span>
                  <span className="text-xl font-light">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isPlacingOrder}
                  className="w-full rounded-full bg-ink py-4 text-xs font-medium uppercase tracking-widest text-paper transition hover:bg-clay disabled:opacity-50"
                >
                  {isPlacingOrder ? "Placing Order..." : "Proceed to Checkout"}
                </button>

                <p className="text-[10px] text-center text-muted">
                  🔒 Guaranteed Safe & Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;
