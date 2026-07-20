"use client";

import { supabase } from "./supabase";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceString: string;
  image: string;
  quantity: number;
  category: string;
}

const LOCAL_STORAGE_KEY = "singular_cares_cart";

export function getLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(
      new CustomEvent("cart-updated", {
        detail: { count: items.reduce((acc, i) => acc + i.quantity, 0) },
      })
    );
  } catch (err) {
    console.error("Save local cart error:", err);
  }
}

export async function addToCart(product: {
  slug: string;
  name: string;
  price: string | number;
  image: string;
  quantity: number;
  category?: string;
}): Promise<void> {
  const currentItems = getLocalCart();
  const numPrice =
    typeof product.price === "number"
      ? product.price
      : parseFloat((product.price || "").replace(/[^0-9.]/g, "")) || 0;
  const priceStr =
    typeof product.price === "string" ? product.price : `$${numPrice.toFixed(2)}`;

  const existingIndex = currentItems.findIndex((i) => i.slug === product.slug);

  let updated: CartItem[];
  if (existingIndex >= 0) {
    updated = [...currentItems];
    updated[existingIndex].quantity += product.quantity;
  } else {
    const newItem: CartItem = {
      id: `${product.slug}-${Date.now()}`,
      slug: product.slug,
      name: product.name,
      price: numPrice,
      priceString: priceStr,
      image: product.image,
      quantity: product.quantity,
      category: product.category || "Shop",
    };
    updated = [newItem, ...currentItems];
  }

  saveLocalCart(updated);

  // If user is signed in to Supabase, sync to DB as well
  if (supabase) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const itemToSync = updated.find((i) => i.slug === product.slug);
        if (itemToSync) {
          await supabase.from("carts").upsert({
            user_id: user.id,
            product_slug: itemToSync.slug,
            material: "",
            name: itemToSync.name,
            image: itemToSync.image || "",
            price: itemToSync.priceString,
            quantity: itemToSync.quantity,
            updated_at: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.error("Supabase cart sync error:", err);
    }
  }
}

export function updateLocalQuantity(id: string, delta: number): CartItem[] {
  const current = getLocalCart();
  const updated = current
    .map((item) => {
      if (item.id === id || item.slug === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter(Boolean) as CartItem[];

  saveLocalCart(updated);
  return updated;
}

export function removeLocalItem(id: string): CartItem[] {
  const current = getLocalCart();
  const updated = current.filter((item) => item.id !== id && item.slug !== id);
  saveLocalCart(updated);
  return updated;
}

export function clearLocalCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: 0 } }));
}
