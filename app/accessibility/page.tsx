import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AccessibilityPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <p className="eyebrow mb-5 text-muted">Singular Cares</p>
        <h1 className="text-4xl font-light tracking-wide text-ink">Accessibility</h1>
        <div className="mt-10 space-y-6 text-sm leading-7 text-muted">
          <p>
            Singular Cares is committed to making our storefront usable and
            welcoming for every visitor.
          </p>
          <p>
            We aim to support clear navigation, readable content, keyboard
            access, and meaningful labels across the shopping experience.
          </p>
          <p>
            If you experience an accessibility issue, please contact our support
            team so we can help and improve the site.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
