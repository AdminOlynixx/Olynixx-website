"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** A playful four-point star that drifts, twinkles, and leans away from the pointer. */
export function NotFoundStar() {
  const root = useRef<HTMLDivElement>(null);
  const star = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current || !star.current) return;
      gsap.to(star.current, { y: -14, rotate: 6, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".nf-glow", { opacity: 0.25, scale: 1.12, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".nf-dot", { opacity: 0.2, duration: 0.9, stagger: { each: 0.35, repeat: -1, yoyo: true }, ease: "sine.inOut" });
      const qx = gsap.quickTo(root.current, "x", { duration: 0.8, ease: "power3.out" });
      const qy = gsap.quickTo(root.current, "y", { duration: 0.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        qx(-(e.clientX / window.innerWidth - 0.5) * 30);
        qy(-(e.clientY / window.innerHeight - 0.5) * 30);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="mx-auto w-48 md:w-64">
      <svg viewBox="0 0 200 200" className="h-auto w-full overflow-visible">
        <circle className="nf-glow" cx={100} cy={100} r={70} style={{ fill: "var(--color-gold)", opacity: 0.12 }} />
        {[
          [20, 40],
          [170, 30],
          [180, 150],
          [30, 165],
          [150, 185],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} className="nf-dot" cx={x} cy={y} r={2.5} style={{ fill: "var(--color-gold-dark)" }} />
        ))}
        <g ref={star}>
          <path d="M100 30 C106 78 122 94 170 100 C122 106 106 122 100 170 C94 122 78 106 30 100 C78 94 94 78 100 30 Z" style={{ fill: "var(--color-gold)" }} />
          <circle cx={90} cy={96} r={3.2} style={{ fill: "var(--color-ink)" }} />
          <circle cx={110} cy={96} r={3.2} style={{ fill: "var(--color-ink)" }} />
          <path d="M91 108 Q100 116 109 108" fill="none" strokeWidth={2.2} strokeLinecap="round" style={{ stroke: "var(--color-ink)" }} />
        </g>
      </svg>
    </div>
  );
}
