"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "react-feather";
import { Lockup } from "@/components/brand/Lockup";
import { PRIMARY_NAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";

export function Header({ longevityLive = false }: { longevityLive?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!openMenu) return;
    const close = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".ol-dropdown")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openMenu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const visibleChildren = (children: readonly { href: string; label: string }[]) =>
    children.filter((child) => (child.href === "/individuals/longevity" ? longevityLive : true));

  return (
    <header className="ol-header">
      <Link href="/" className="ol-header__logo" aria-label="Olynixx home">
        <Lockup product="master" layout="horizontal" ground="dark" height={40} priority />
      </Link>

      <nav className="ol-nav" aria-label="Primary">
        {PRIMARY_NAV.map((item) =>
          "children" in item && item.children ? (
            <div key={item.href} className="ol-dropdown">
              <button
                type="button"
                className={isActive(item.href) ? "ol-dropdown__btn is-active" : "ol-dropdown__btn"}
                aria-expanded={openMenu === item.href}
                aria-haspopup="true"
                onClick={() => setOpenMenu((value) => (value === item.href ? null : item.href))}
              >
                {item.label}
                <ChevronDown size={12} strokeWidth={1.6} aria-hidden className="ol-dropdown__chevron" />
              </button>
              <div className={openMenu === item.href ? "ol-dropdown__menu is-open" : "ol-dropdown__menu"}>
                {visibleChildren(item.children).map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    aria-current={pathname === child.href ? "page" : undefined}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ),
        )}
        <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot")}>
          Book a pilot conversation
        </Link>
      </nav>

      <button
        type="button"
        className="ol-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
      </button>

      <div id="mobile-nav" className={open ? "ol-drawer is-open" : "ol-drawer"}>
        <nav className="ol-drawer__nav" aria-label="Mobile">
          {PRIMARY_NAV.map((item) =>
            "children" in item && item.children ? (
              <div key={item.href} className="ol-drawer__group">
                <p className="ol-drawer__label">{item.label}</p>
                {visibleChildren(item.children).map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    aria-current={pathname === child.href ? "page" : undefined}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="ol-drawer__cta">
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot")}>
            Book a pilot conversation
          </Link>
        </div>
      </div>
    </header>
  );
}
