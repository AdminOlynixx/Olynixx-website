"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Pulls its child slightly toward the pointer. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const onLeave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {children}
    </span>
  );
}
