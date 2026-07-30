import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <p className="eyebrow mb-5 text-muted">Singular Cares</p>
        <h1 className="text-4xl font-light tracking-wide text-ink">Privacy Policy</h1>
        <div className="mt-10 space-y-6 text-sm leading-7 text-muted">
          <p>
            We respect your privacy. This page explains how Singular Cares may
            collect, use, and protect information shared while browsing,
            shopping, or contacting us.
          </p>
          <p>
            We use customer information to process orders, provide support,
            improve the shopping experience, and share updates when you choose
            to subscribe.
          </p>
          <p>
            For privacy questions or requests, please contact our support team.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
