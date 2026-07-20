import { NAV } from "@/lib/content";
import { getNavCategories } from "@/lib/data";
import type { NavCategory } from "@/lib/data";
import { HeaderClient } from "@/components/header-client";

export async function SiteHeader() {
  const adminCategories = await getNavCategories();
  const navItems: Array<NavCategory | { label: string; href: string }> = [
    ...NAV.map((item) => ({ label: item.label, href: item.href })),
    ...adminCategories,
  ];

  return <HeaderClient navItems={navItems} />;
}
