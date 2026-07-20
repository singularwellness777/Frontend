import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { getSiteSettings } from "@/lib/data";
import { ComingSoon } from "@/components/coming-soon";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Singular Cares — Modern essentials for little ones",
  description:
    "Thoughtfully designed feeding, bath, bedding and play essentials for babies and toddlers.",
  icons: {
    icon: "/tab-icon.svg",
    apple: "/tab-icon.svg",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const cookieStore = await cookies();
  const isPreview = cookieStore.get("sf_preview")?.value === "true";

  const showComingSoon = settings.comingSoon && !isPreview;

  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full">
        {settings.comingSoon && isPreview && (
          <div className="bg-amber-600 text-white text-center py-2 px-4 text-xs tracking-wider flex items-center justify-center gap-4">
            <span>PREVIEW MODE — Storefront is currently locked with Coming Soon mode in Admin.</span>
            <a
              href="/api/preview?disable=true"
              className="underline font-semibold hover:text-amber-100"
            >
              Exit Preview
            </a>
          </div>
        )}
        {showComingSoon ? (
          <ComingSoon heading={settings.heading} message={settings.message} />
        ) : (
          children
        )}
      </body>
    </html>
  );
}
