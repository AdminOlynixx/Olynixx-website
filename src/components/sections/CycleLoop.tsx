"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Animated connected loop: the ring draws itself on scroll, nodes pop in, then a
 * pulse travels the loop forever. Decorative; labels are passed in as props.
 */
export function CycleLoop({ labels, theme = "dark" }: { labels: readonly string[]; theme?: "dark" | "light" }) {
  const root = useRef<SVGSVGElement>(null);
  const pulse = useRef<SVGCircleElement>(null);
  const R = 130;
  const C = 200;
  const pos = labels.map((_, i) => {
    const a = (-90 + (360 / labels.length) * i) * (Math.PI / 180);
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  });
  const stroke = theme === "dark" ? "#f2ede3" : "#0b100e";

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const ring = root.current.querySelector<SVGCircleElement>("[data-ring]");
      const nodes = root.current.querySelectorAll("[data-node]");
      if (!ring) return;
      const len = ring.getTotalLength();
      gsap.set(ring, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(nodes, { transformOrigin: "50% 50%", scale: 0, opacity: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
      tl.to(ring, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" })
        .to(nodes, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.35, ease: "back.out(2)" }, 0.1);
      const state = { a: -90 };
      gsap.to(state, {
        a: 270,
        duration: 8,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          const r = (state.a * Math.PI) / 180;
          pulse.current?.setAttribute("cx", String(C + R * Math.cos(r)));
          pulse.current?.setAttribute("cy", String(C + R * Math.sin(r)));
        },
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="0 0 400 400" role="img" aria-label={labels.join(", ")} className="mx-auto w-full max-w-[420px]">
      <circle data-ring cx={C} cy={C} r={R} fill="none" stroke="#c5a33e" strokeWidth="2" />
      <circle cx={C} cy={C} r={R - 28} fill="none" stroke={stroke} strokeOpacity="0.15" strokeDasharray="2 6" />
      <circle ref={pulse} cx={C} cy={C - R} r="5" fill="#d9b75a" />
      {pos.map((p, i) => {
        const above = p.y < C - 10;
        const below = p.y > C + 10;
        const anchor = p.x > C + 10 ? "start" : p.x < C - 10 ? "end" : "middle";
        const dx = anchor === "start" ? 30 : anchor === "end" ? -30 : 0;
        const dy = above ? -28 : below ? 38 : 5;
        return (
          <g key={labels[i]} data-node>
            <rect x={p.x - 16} y={p.y - 16} width="32" height="32" fill="#0b3a33" stroke="#c5a33e" strokeWidth="1.5" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fill="#d9b75a" fontFamily="var(--font-plex-mono), monospace">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text
              x={p.x + dx}
              y={p.y + dy}
              textAnchor={anchor}
              fontSize="17"
              fill={stroke}
              fontFamily="var(--font-newsreader), Georgia, serif"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
