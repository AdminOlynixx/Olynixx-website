"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });

/**
 * One fixed full-screen canvas for the whole site: a dotted 3D Earth that drifts across the
 * page and turns as you scroll. It is visible only over the Hero and the final CTA band
 * (sections marked data-globe) and fades out everywhere else, so it never sits behind copy. Reduced motion or no WebGL: nothing mounts.
 */
export function SceneBackdrop() {
  const [mode, setMode] = useState<"off" | "low" | "full">("off");
  const box = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const onContact = pathname === "/contact";

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
    const small = window.matchMedia("(max-width: 768px)").matches;
    // Contact page: no globe on phones, it only gets in the way of the form.
    const next = small ? (onContact ? "off" : "low") : "full";
    const id = requestAnimationFrame(() => setMode(next));
    return () => cancelAnimationFrame(id);
  }, [onContact]);

  // The globe shows in two places only: the Hero and the final call-to-action band.
  useEffect(() => {
    if (mode === "off") return;
    const el = box.current;
    if (!el) return;
    const level: Record<string, number> = { hero: 1, cta: 0.6 };
    const seen = new Map<Element, number>();
    const apply = () => {
      let best = 0;
      seen.forEach((v) => (best = Math.max(best, v)));
      el.style.opacity = String(best);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) seen.set(e.target, level[(e.target as HTMLElement).dataset.globe ?? ""] ?? 0);
          else seen.delete(e.target);
        });
        apply();
      },
      { threshold: 0.25 },
    );
    // Wait a frame so the new page's sections exist after a route change.
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll("[data-globe]").forEach((n) => io.observe(n));
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.style.opacity = "0";
    };
  }, [mode, pathname]);

  if (mode === "off") return null;
  return (
    <div ref={box} className="pointer-events-none fixed inset-0 z-[5] opacity-0 transition-opacity duration-500" aria-hidden>
      <GlobeCanvas low={mode === "low"} />
    </div>
  );
}
