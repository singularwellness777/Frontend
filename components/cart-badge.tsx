"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getLocalCart } from "@/lib/cart-store";

export function CartBadge() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function loadCartCount() {
      // 1. Check local cart count first
      const localItems = getLocalCart();
      if (localItems.length > 0) {
        setCount(localItems.reduce((acc, i) => acc + i.quantity, 0));
      }

      if (!supabase) return;
      try {
        // Reading the cached session avoids an unnecessary Auth API request
        // whenever a guest page renders. Database RLS still validates the
        // session token when a signed-in user's cart is queried.
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession();
        if (authError) return;

        const user = session?.user;
        if (user) {
          const { data: dbCarts } = await supabase
            .from("carts")
            .select("quantity")
            .eq("user_id", user.id);

          if (dbCarts && dbCarts.length > 0) {
            const totalQty = dbCarts.reduce((acc, row) => acc + (row.quantity || 1), 0);
            setCount(totalQty);
          }
        }
      } catch (err) {
        console.error("Cart badge load failed:", err);
      }
    }

    loadCartCount();

    // Event listener for cart updates
    const handleCartUpdate = (event: Event) => {
      const { detail } = event as CustomEvent<{ count?: number }>;
      if (typeof detail?.count === "number") {
        setCount(detail.count);
      } else {
        const localItems = getLocalCart();
        setCount(localItems.reduce((acc, i) => acc + i.quantity, 0));
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  if (count <= 0) return null;

  return (
    <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-clay text-[8px] font-medium text-white shadow-xs">
      {count}
    </span>
  );
}
