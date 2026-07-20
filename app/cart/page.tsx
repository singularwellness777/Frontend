import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import CartView from "@/components/cart-view";

export const dynamic = "force-dynamic";

export default function CartPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-paper min-h-screen">
        <CartView />
      </main>

      <SiteFooter />
    </>
  );
}
