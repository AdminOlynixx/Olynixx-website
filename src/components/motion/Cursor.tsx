"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Dot + ring cursor. Fine pointers only; grows over links/buttons. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      gsap.to(ring.current, {
        scale: hit ? 1.9 : 1,
        opacity: hit ? 0.9 : 0.6,
        duration: 0.25,
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border border-gold opacity-0 mix-blend-difference"
        style={{ opacity: 0.6 }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold"
      />
    </>
  );
}
