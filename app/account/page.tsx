import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import AccountView from "@/components/account-view";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-paper min-h-screen">
        <AccountView />
      </main>

      <SiteFooter />
    </>
  );
}
