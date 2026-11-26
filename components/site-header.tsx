import { NAV } from "@/lib/content";
import { HeaderClient } from "@/components/header-client";

export async function SiteHeader() {
  const navItems = NAV.map((item) => ({ label: item.label, href: item.href }));

  return <HeaderClient navItems={navItems} />;
}
