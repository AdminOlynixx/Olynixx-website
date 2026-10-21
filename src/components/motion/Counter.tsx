"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Animates the first number found in `value` (e.g. "~8,000", "22 yrs"). Falls back to plain text. */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const m = value.match(/\d[\d,]*/);
      if (!m || prefersReducedMotion() || !ref.current) return;
      const end = Number(m[0].replace(/,/g, ""));
      const state = { n: 0 };
      const fmt = (n: number) =>
        value.replace(m[0], m[0].includes(",") ? Math.round(n).toLocaleString("en-US") : String(Math.round(n)));
      // The server-rendered final value stays in place. It only counts up once it enters the viewport.
      gsap.to(state, {
        n: end,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) ref.current.textContent = fmt(state.n);
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 96%",
          once: true,
          onEnter: () => {
            if (ref.current) ref.current.textContent = fmt(0);
          },
        },
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return <span ref={ref}>{value}</span>;
}
