import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <p className="eyebrow mb-5 text-muted">Singular Cares</p>
        <h1 className="text-4xl font-light tracking-wide text-ink">Terms of Service</h1>
        <div className="mt-10 space-y-6 text-sm leading-7 text-muted">
          <p>
            By using this website, you agree to use Singular Cares services,
            content, and checkout features responsibly and in accordance with
            applicable laws.
          </p>
          <p>
            Product availability, pricing, promotions, and policies may change
            over time. Orders are subject to confirmation and acceptance.
          </p>
          <p>
            Please contact our support team with questions about orders,
            returns, or these terms.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
