import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/data";
import { ComingSoon } from "@/components/coming-soon";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "mushie — Modern essentials for little ones",
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

  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full">
        {settings.comingSoon ? (
          <ComingSoon heading={settings.heading} message={settings.message} />
        ) : (
          children
        )}
      </body>
    </html>
  );
}

