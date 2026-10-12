"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Decorative ECG-style line that traces itself on a loop. Static under reduced motion. */
export function HeartbeatLine() {
  const path = useRef<SVGPathElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion() || !path.current) return;
    const len = path.current.getTotalLength();
    gsap.set(path.current, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path.current, { strokeDashoffset: -len, duration: 3.2, ease: "none", repeat: -1 });
  });
  return (
    <svg aria-hidden viewBox="0 0 600 80" preserveAspectRatio="none" className="mt-12 h-16 w-full max-w-2xl">
      <path
        ref={path}
        d="M0 40 H190 L215 40 L230 12 L250 70 L268 4 L285 40 H420 L440 28 L455 40 H600"
        fill="none"
        stroke="#d9b75a"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
