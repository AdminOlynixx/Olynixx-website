"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const NODE_Y = [70, 150, 230, 310];
const CX = 500;
const CY = 200;
const ARC = `M${CX - 90} ${CY} A90 90 0 0 1 ${CX + 90} ${CY}`;

function drawGauge(root: HTMLElement, tl: gsap.core.Timeline, at: number) {
  const arc = root.querySelector("[data-arc]");
  const needle = root.querySelector("[data-needle]");
  if (arc) tl.fromTo(arc, { strokeDashoffset: 1 }, { strokeDashoffset: 0.32, duration: 1.4, ease: "power3.out" }, at);
  if (needle)
    tl.fromTo(
      needle,
      { rotation: -85, svgOrigin: `${CX} ${CY}` },
      { rotation: 25, svgOrigin: `${CX} ${CY}`, duration: 1.6, ease: "elastic.out(1,0.6)" },
      at,
    );
}

function Gauge({ label }: { label: string }) {
  return (
    <g>
      <path d={ARC} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={10} />
      <path
        data-arc
        d={ARC}
        pathLength={1}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={10}
        strokeDasharray={1}
        strokeDashoffset={0.32}
      />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI - (i * Math.PI) / 8;
        return (
          <line
            key={i}
            x1={CX + Math.cos(a) * 104}
            y1={CY - Math.sin(a) * 104}
            x2={CX + Math.cos(a) * 112}
            y2={CY - Math.sin(a) * 112}
            stroke="currentColor"
            strokeOpacity={0.4}
          />
        );
      })}
      <line data-needle x1={CX} y1={CY} x2={CX} y2={CY - 72} stroke="var(--color-cream)" strokeWidth={2} transform={`rotate(25 ${CX} ${CY})`} />
      <rect x={CX - 6} y={CY - 6} width={12} height={12} fill="var(--color-gold)" />
      <text x={CX} y={CY + 40} textAnchor="middle" className="fill-current font-mono" fontSize={12} letterSpacing={2} opacity={0.8}>
        {label}
      </text>
    </g>
  );
}

/** Four technology signals converging into one animated readiness gauge. Illustrative only. */
export function ReadinessDiagram({ constraints }: { constraints?: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const root = ref.current;
      const curves = gsap.utils.toArray<SVGPathElement>("[data-curve]", root);
      const nodes = gsap.utils.toArray<SVGElement>("[data-node]", root);
      const flows = gsap.utils.toArray<SVGPathElement>("[data-flow]", root);
      gsap.set(curves, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(nodes, { autoAlpha: 0, x: -20 });
      gsap.set(flows, { autoAlpha: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 75%", once: true } });
      tl.to(nodes, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" })
        .to(curves, { strokeDashoffset: 0, duration: 1.1, stagger: 0.1, ease: "power2.inOut" }, 0.3)
        .from("[data-hub]", { scale: 0, svgOrigin: "320 200", duration: 0.5, ease: "back.out(2)" }, 1.2);
      drawGauge(root, tl, 1.4);
      tl.to(flows, { autoAlpha: 0.9, duration: 0.4 }, 1.6);
      gsap.to(flows, { strokeDashoffset: -32, duration: 1.6, ease: "none", repeat: -1 });
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className="mt-12 text-cream" aria-label="Illustration: four technology signals resolve into one readiness status">
      <svg viewBox="0 0 640 380" className="h-auto w-full" role="img" aria-hidden>
        {NODE_Y.map((y, i) => {
          const d = `M170 ${y} C 250 ${y}, 250 ${CY}, 320 ${CY}`;
          return (
            <g key={y}>
              <path data-curve d={d} pathLength={1} fill="none" stroke="var(--color-gold-dark)" strokeOpacity={0.6} strokeWidth={1.5} />
              <path data-flow d={d} fill="none" stroke="var(--color-data-dark)" strokeWidth={2} strokeDasharray="4 12" />
              <g data-node>
                <rect x={10} y={y - 22} width={160} height={44} fill="none" stroke="currentColor" strokeOpacity={0.4} />
                <text x={26} y={y + 4} className="fill-current font-mono" fontSize={12} letterSpacing={1.5}>
                  {`TECHNOLOGY 0${i + 1}`}
                </text>
              </g>
            </g>
          );
        })}
        <rect data-hub x={312} y={CY - 8} width={16} height={16} fill="var(--color-gold)" />
        <line x1={330} y1={CY} x2={CX - 90} y2={CY} stroke="var(--color-gold-dark)" strokeOpacity={0.6} strokeWidth={1.5} />
        <Gauge label="ONE FUNCTIONAL STATUS" />
      </svg>
      {constraints && constraints.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-3" aria-label="The constraint is one of three systems">
          {constraints.map((c) => (
            <li key={c} className="border border-cream/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-cream/80">
              {c}
            </li>
          ))}
        </ul>
      )}
      <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-cream/55">
        Illustrative diagram. Not client data.
      </figcaption>
    </figure>
  );
}

/** Standalone animated readiness gauge for the morning-number story. Illustrative only. */
export function ReadinessGauge({ label = "TODAY'S READINESS" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
      drawGauge(ref.current, tl, 0);
    },
    { scope: ref },
  );
  return (
    <figure ref={ref} className="mt-10 max-w-md text-cream" aria-label="Illustration of a daily readiness gauge">
      <svg viewBox="360 80 280 190" className="h-auto w-full" aria-hidden>
        <Gauge label={label} />
      </svg>
      <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-cream/55">
        Illustrative gauge. Not client data.
      </figcaption>
    </figure>
  );
}
