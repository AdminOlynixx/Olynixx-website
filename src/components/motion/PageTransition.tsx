"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Route-change wipe. Internal link clicks are intercepted: the cover rises, the route
 * changes underneath it, then the cover lifts away. Skipped for reduced motion.
 */
export function PageTransition() {
  const cover = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const pending = useRef<string | null>(null);
  const first = useRef(true);

  useEffect(() => {
    gsap.set(cover.current, { yPercent: 100 });
  }, []);

  // Route finished changing: scroll to top and lift the cover.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (pending.current === null) return;
    pending.current = null;
    window.scrollTo({ top: 0, behavior: "instant" });
    gsap.to(cover.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power4.inOut",
      delay: 0.1,
      onComplete: () => {
        gsap.set(cover.current, { yPercent: 100 });
      },
    });
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // hash or same-page: let it be
      e.preventDefault();
      if (pending.current !== null) return;
      pending.current = url.pathname;
      gsap.to(cover.current, {
        yPercent: 0,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
      // Safety: never leave the cover up if navigation stalls.
      setTimeout(() => {
        if (pending.current !== null) {
          pending.current = null;
          gsap.to(cover.current, { yPercent: -100, duration: 0.5 });
        }
      }, 6000);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return (
    <div
      ref={cover}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] translate-y-full bg-green-deep"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
      <div className="flex h-full items-center justify-center font-display text-4xl italic text-gold-dark opacity-70">
        Olynixx
      </div>
    </div>
  );
}
