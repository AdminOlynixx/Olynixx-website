"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Three data layers stacking up. Labels come from the content file. Illustrative only. */
export function LayerStack({ labels }: { labels: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const layers = gsap.utils.toArray<SVGElement>("[data-layer]", ref.current);
      gsap.set(layers, { autoAlpha: 0, y: -50 });
      gsap.to(layers, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  const fills = ["rgba(197,163,62,0.35)", "rgba(20,107,88,0.25)", "rgba(11,58,51,0.18)"];
  return (
    <figure ref={ref} className="mx-auto mt-12 max-w-md" aria-label="Illustration: three stacked data layers">
      <svg viewBox="0 0 360 270" className="h-auto w-full text-ink" aria-hidden>
        {labels.slice(0, 3).map((l, i) => {
          const y = 14 + i * 84;
          return (
            <g key={l} data-layer>
              <polygon points={`180,${y} 335,${y + 38} 180,${y + 76} 25,${y + 38}`} fill={fills[i]} stroke="currentColor" strokeOpacity={0.5} />
              <text x={180} y={y + 42} textAnchor="middle" className="fill-current font-mono" fontSize={11} letterSpacing={1.5}>
                {l.replace(/\.$/, "")}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">Illustrative.</figcaption>
    </figure>
  );
}
