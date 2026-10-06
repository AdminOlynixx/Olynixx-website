"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Book cover tile with a subtle pointer-driven tilt. Static under reduced motion. */
export function BookCover({ name, year }: { name: string; year: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: px * 14, rotateX: -py * 14, duration: 0.5, ease: "power3.out" });
  };
  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1,0.5)" });

  return (
    <div className="[perspective:900px]" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={ref}
        role="img"
        aria-label={`${name}, ${year}`}
        className="surface-dark relative mx-auto flex aspect-[3/4] w-full max-w-[300px] flex-col justify-between border border-gold p-7 will-change-transform [transform-style:preserve-3d]"
      >
        <span aria-hidden className="absolute inset-3 border border-gold/40" />
        <p className="eyebrow relative">{year}</p>
        <p className="relative font-display text-[2rem] leading-[1.05] text-cream">{name}</p>
        <p aria-hidden className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark">
          Olynixx
        </p>
      </div>
    </div>
  );
}
