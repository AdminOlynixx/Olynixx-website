"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export type NavItem = {
  href: string;
  label: string;
  children?: readonly { href: string; label: string }[];
};

type Props = {
  items: NavItem[];
  ctaHref: string;
  contact: { email: string; phone: string };
  socials: readonly { href: string; label: string }[];
};

export function HeaderClient({ items, ctaHref, contact, socials }: Props) {
  const pathname = usePathname();
  // Menu state is keyed to the pathname it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);
  const [hover, setHover] = useState<number | null>(null);

  const btnWrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Hamburger follows the cursor when it gets close (fine pointers only).
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const el = btnWrap.current;
    if (!el) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - (gsap.getProperty(el, "x") as number);
      const cy = r.top + r.height / 2 - (gsap.getProperty(el, "y") as number);
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.hypot(dx, dy) < 120) {
        qx(dx * 0.45);
        qy(dy * 0.45);
      } else {
        qx(0);
        qy(0);
      }
    };
    const leave = () => {
      qx(0);
      qy(0);
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Scroll lock and Escape while open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open]);

  // Open / close animation: a circle expands from the hamburger, then the routes rise in.
  useGSAP(
    () => {
      const ov = overlay.current;
      if (!ov) return;
      const wasFirst = first.current;
      first.current = false;
      if (wasFirst && !open) return;

      const r = btn.current?.getBoundingClientRect();
      const cx = r ? r.left + r.width / 2 : window.innerWidth - 40;
      const cy = r ? r.top + r.height / 2 : 36;
      const lines = ov.querySelectorAll("[data-line]");
      const subs = ov.querySelectorAll("[data-sub]");
      const side = ov.querySelectorAll("[data-side]");
      const reduced = prefersReducedMotion();

      if (open) {
        gsap.set(ov, { visibility: "visible" });
        if (reduced) {
          gsap.set(ov, { clipPath: "none" });
          return;
        }
        gsap.set(lines, { yPercent: 115 });
        gsap.set([...subs, ...side], { autoAlpha: 0, y: 14 });
        gsap
          .timeline()
          .fromTo(
            ov,
            { clipPath: `circle(0px at ${cx}px ${cy}px)` },
            { clipPath: `circle(160% at ${cx}px ${cy}px)`, duration: 0.95, ease: "power3.inOut" },
          )
          .to(lines, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: "power4.out" }, 0.35)
          .to(subs, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "power3.out" }, 0.7)
          .to(side, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0.75);
      } else {
        if (reduced) {
          gsap.set(ov, { visibility: "hidden" });
          return;
        }
        gsap.to(ov, {
          clipPath: `circle(0px at ${cx}px ${cy}px)`,
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(ov, { visibility: "hidden" });
          },
        });
      }
    },
    { dependencies: [open], scope: overlay },
  );

  return (
    <>
      <header className="sticky top-0 z-50 h-[72px] bg-green-deep text-cream">
        <div className="container-ol flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label="Olynixx home" className="relative z-10">
            <Image
              src="/brand/olynixx-lockup-horizontal-on-dark.svg"
              alt="Olynixx"
              width={128}
              height={40}
              priority
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <div ref={btnWrap} className="relative z-10">
            <button
              ref={btn}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(!open)}
              data-cursor
              className="group flex h-12 cursor-pointer items-center gap-3 pl-4 pr-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-gold-dark"
            >
              <span className="hidden sm:block">{open ? "Close" : "Menu"}</span>
              <span className="relative block h-9 w-9 rounded-full border border-cream/30 transition-colors group-hover:border-gold-dark">
                <span
                  className={`absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 bg-current transition-transform duration-500 ease-[var(--ease-ol)] ${
                    open ? "rotate-45" : "-translate-y-[4px]"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 bg-current transition-transform duration-500 ease-[var(--ease-ol)] ${
                    open ? "-rotate-45" : "translate-y-[4px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        data-lenis-prevent
        className="surface-dark invisible fixed inset-0 z-[49] overflow-y-auto pt-[72px] lg:overflow-y-hidden"
        style={{ clipPath: "circle(0px at 100% 0)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(79,192,166,0.14),transparent_55%)]" />
        <div className="container-ol relative grid min-h-[calc(100svh-72px)] gap-12 py-10 lg:h-[calc(100svh-72px)] lg:grid-cols-[1.5fr_1fr] lg:gap-8 lg:py-[3vh]">
          <nav aria-label="Site" className="self-center">
            <ul onMouseLeave={() => setHover(null)}>
              {items.map((item, i) => (
                <li
                  key={item.label}
                  onMouseEnter={() => setHover(i)}
                  className={`border-b border-cream/10 py-3 transition-opacity duration-300 sm:py-4 lg:py-[1.3vh] ${
                    hover !== null && hover !== i ? "opacity-35" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    <span className="font-mono text-xs text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                    <span className="block overflow-hidden">
                      <Link
                        data-line
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        className="group/link inline-flex items-center gap-3 font-display text-[clamp(2.1rem,6vw,4.5rem)] lg:text-[clamp(1.75rem,min(5vw,7.2vh),4.5rem)] leading-[1.05] tracking-[-0.02em] transition-colors duration-300 hover:text-gold-dark"
                      >
                        {item.label}
                        <ArrowUpRight className="h-[0.5em] w-[0.5em] -translate-x-2 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                      </Link>
                    </span>
                    {item.children && (
                      <ul className="flex flex-wrap gap-x-5 gap-y-1">
                        {item.children.map((c) => (
                          <li key={c.href + c.label} data-sub>
                            <Link
                              href={c.href}
                              tabIndex={open ? 0 : -1}
                              className="font-mono text-[11px] uppercase tracking-[0.1em] text-cream/65 transition-colors hover:text-gold-dark"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="flex flex-col justify-end gap-10 self-end pb-2 lg:gap-[3.5vh]">
            <div data-side>
              <p className="eyebrow">Start here</p>
              <Link
                href={ctaHref}
                tabIndex={open ? 0 : -1}
                className="mt-4 inline-flex min-h-[52px] items-center bg-gold px-7 text-[15px] font-medium text-ink transition hover:brightness-110"
              >
                Book a pilot conversation
              </Link>
            </div>
            <div data-side className="space-y-1 text-sm">
              <p className="eyebrow mb-3">Direct</p>
              <p>
                <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1} className="hover:text-gold-dark">
                  {contact.email}
                </a>
              </p>
              <p>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} tabIndex={open ? 0 : -1} className="hover:text-gold-dark">
                  {contact.phone}
                </a>
              </p>
              <p className="text-cream/60">Dubai, UAE</p>
            </div>
            <ul data-side className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="text-cream/70 transition-colors hover:text-gold-dark"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
