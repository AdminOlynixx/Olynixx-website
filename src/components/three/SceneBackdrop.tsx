"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });

/**
 * One fixed full-screen canvas for the whole site: a dotted 3D Earth that drifts across the
 * page and turns as you scroll from start to finish. Full strength over the hero, quieter
 * further down so body copy stays readable. Reduced motion or no WebGL: nothing mounts.
 */
export function SceneBackdrop() {
  const [mode, setMode] = useState<"off" | "low" | "full">("off");
  const box = useRef<HTMLDivElement>(null);
  const onContact = usePathname() === "/contact";

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

  useEffect(() => {
    if (mode === "off") return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = box.current;
      if (!el) return;
      const f = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
      // On /contact the globe stays in the hero and drops to 15% once the form is in view.
      el.style.opacity = String(onContact ? 1 - f * 0.85 : 1 - f * (mode === "low" ? 0.7 : 0.45));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode, onContact]);

  if (mode === "off") return null;
  return (
    <div ref={box} className="pointer-events-none fixed inset-0 z-[5]" aria-hidden>
      <GlobeCanvas low={mode === "low"} />
    </div>
  );
}
