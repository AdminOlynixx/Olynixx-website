import { PRIMARY_NAV, SOCIAL_LINKS } from "@/lib/nav";
import { contactHref } from "@/lib/cta";
import { publicContact, publishLongevity, publishPraxis } from "@/lib/site-config";
import { HeaderClient, type NavItem } from "./HeaderClient";

export function Header() {
  const items: NavItem[] = PRIMARY_NAV.filter(
    (i) => i.href !== "/praxis" || publishPraxis(),
  ).map((i) => ({
    href: i.href,
    label: i.label,
    children:
      "children" in i
        ? i.children.filter((c) => c.href !== "/individuals/longevity" || publishLongevity())
        : undefined,
  }));
  const c = publicContact();
  return (
    <HeaderClient
      items={items}
      ctaHref={contactHref("corporate-pilot", "menu")}
      contact={{ email: c.email, phone: c.phone }}
      socials={SOCIAL_LINKS}
    />
  );
}
