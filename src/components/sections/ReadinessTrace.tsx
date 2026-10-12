"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Planned load vs. what the body can absorb, drawn on scroll. Illustrative only. */
export function ReadinessTrace() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const root = ref.current;
      const line = root.querySelector("[data-capacity]");
      const marker = root.querySelectorAll("[data-marker]");
      gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(marker, { autoAlpha: 0, scale: 0.4, svgOrigin: "360 130" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 78%", once: true } })
        .to(line, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" })
        .to(marker, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.1 }, 1.2);
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className="mt-10 border border-rule bg-paper p-5" aria-label="Illustration: planned load against daily capacity">
      <svg viewBox="0 0 640 240" className="h-auto w-full" aria-hidden>
        {[60, 120, 180].map((y) => (
          <line key={y} x1={20} x2={620} y1={y} y2={y} stroke="var(--color-rule)" strokeOpacity={0.6} />
        ))}
        <line x1={20} x2={620} y1={110} y2={110} stroke="var(--color-ink-muted)" strokeWidth={1.5} strokeDasharray="6 6" />
        <path
          data-capacity
          pathLength={1}
          d="M20 140 C 80 60, 130 60, 190 120 S 300 200, 360 130 S 480 60, 540 150 S 600 170, 620 120"
          fill="none"
          stroke="var(--color-data)"
          strokeWidth={3}
        />
        <line data-marker x1={360} x2={360} y1={30} y2={215} stroke="var(--color-gold-text)" strokeDasharray="3 5" />
        <rect data-marker x={353} y={123} width={14} height={14} fill="var(--color-gold)" />
        <text data-marker x={368} y={44} className="fill-current font-mono" fontSize={11} letterSpacing={1.5}>
          SESSION
        </text>
      </svg>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
        <li className="flex items-center gap-2">
          <span className="h-0 w-6 border-t-2 border-dashed border-ink-muted" aria-hidden /> Planned load
        </li>
        <li className="flex items-center gap-2">
          <span className="h-[3px] w-6 bg-data" aria-hidden /> What your body can absorb
        </li>
      </ul>
      <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
        Illustrative. Not client data.
      </figcaption>
    </figure>
  );
}
