"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export type ScrubStep = { label: string; title?: string; body: string };

const COLS: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };

/**
 * Sequence of steps joined by a rail that draws itself as you scroll (ScrollTrigger scrub).
 * Vertical on mobile, horizontal from md. Fully visible without JS or with reduced motion.
 */
export function ScrubSteps({ steps, theme = "light" }: { steps: readonly ScrubStep[]; theme?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const dark = theme === "dark";

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const root = ref.current;
      const items = gsap.utils.toArray<HTMLElement>("[data-step]", root);
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", root);
      const railV = root.querySelector<HTMLElement>("[data-rail='v']");
      const railH = root.querySelector<HTMLElement>("[data-rail='h']");
      const n = items.length;
      gsap.set(items, { opacity: 0.28, y: 18 });
      gsap.set(dots, { scale: 0.5, backgroundColor: "rgba(197,163,62,0)" });
      if (railV) gsap.set(railV, { scaleY: 0, transformOrigin: "top" });
      if (railH) gsap.set(railH, { scaleX: 0, transformOrigin: "left" });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top 72%", end: "bottom 70%", scrub: 0.5 },
      });
      if (railV) tl.to(railV, { scaleY: 1, duration: n }, 0);
      if (railH) tl.to(railH, { scaleX: 1, duration: n }, 0);
      items.forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, i * 0.9);
        tl.to(dots[i], { scale: 1, backgroundColor: "rgba(197,163,62,1)", duration: 0.35 }, i * 0.9);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      <div className={`absolute bottom-2 left-[7px] top-2 w-px md:hidden ${dark ? "bg-cream/20" : "bg-rule"}`}>
        <span data-rail="v" className="block h-full w-full bg-gold" />
      </div>
      <div className={`absolute left-0 right-0 top-[7px] hidden h-px md:block ${dark ? "bg-cream/20" : "bg-rule"}`}>
        <span data-rail="h" className="block h-full w-full bg-gold" />
      </div>
      <ol className={`grid gap-10 ${COLS[steps.length] ?? "md:grid-cols-3"}`}>
        {steps.map((s) => (
          <li key={s.label + (s.title ?? "")} data-step className="relative pl-10 md:pl-0 md:pr-6 md:pt-12">
            <span
              data-dot
              className="absolute left-0 top-1.5 size-[15px] border border-gold bg-gold md:top-0"
              aria-hidden
            />
            <p className="eyebrow">{s.label}</p>
            {s.title && <h3 className="mt-2 font-display text-3xl leading-tight">{s.title}</h3>}
            <p className={`mt-3 text-[15px] ${dark ? "text-cream/80" : "text-ink-muted"}`}>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
