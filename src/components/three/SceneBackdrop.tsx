"use client";

import dynamic from "next/dynamic";
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

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
    const small = window.matchMedia("(max-width: 768px)").matches;
    const id = requestAnimationFrame(() => setMode(small ? "low" : "full"));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (mode === "off") return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = box.current;
      if (!el) return;
      const f = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
      el.style.opacity = String(1 - f * (mode === "low" ? 0.7 : 0.45));
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
  }, [mode]);

  if (mode === "off") return null;
  return (
    <div ref={box} className="pointer-events-none fixed inset-0 z-[5]" aria-hidden>
      <GlobeCanvas low={mode === "low"} />
    </div>
  );
}
