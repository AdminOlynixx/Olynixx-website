"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Subtle 3D tilt toward the pointer. Fine pointers only; no-op under reduced motion. */
export function TiltCard({ children, className = "", max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = () =>
    !prefersReducedMotion() && typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  const move = (e: React.PointerEvent) => {
    if (!ok() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: px * max * 2, rotateX: -py * max * 2, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
  };
  const leave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={className}>
      {children}
    </div>
  );
}
