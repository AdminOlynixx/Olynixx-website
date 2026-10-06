"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const SOURCES = [
  { label: "Bioimpedance", y: 50 },
  { label: "Heart-rate variability", y: 150 },
  { label: "Galvanic skin response", y: 250 },
  { label: "Digital pulse wave", y: 350 },
];

/** Four technologies converge on 52 indicators, then one status. Lines draw with scroll. */
export function TechConvergence() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root.current);
      gsap.set(q(".tc-line"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(q(".tc-out"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(q(".tc-final"), { autoAlpha: 0.15 });
      gsap.set(q(".tc-node"), { autoAlpha: 0.15 });
      gsap.set(q(".tc-hub"), { scale: 0.6, transformOrigin: "50% 50%", autoAlpha: 0.2 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 45%", scrub: 0.6 },
      });
      tl.to(q(".tc-node"), { autoAlpha: 1, stagger: 0.15, duration: 0.3 }, 0)
        .to(q(".tc-line"), { strokeDashoffset: 0, stagger: 0.15, duration: 0.6, ease: "none" }, 0.1)
        .to(q(".tc-hub"), { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.6)" }, 1)
        .to(q(".tc-out"), { strokeDashoffset: 0, duration: 0.5, ease: "none" }, 1.4)
        .to(q(".tc-final"), { autoAlpha: 1, duration: 0.3 }, 1.8);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="border border-rule bg-paper p-4 md:p-8">
      <svg
        viewBox="0 0 640 400"
        role="img"
        aria-label="Bioimpedance, heart-rate variability, galvanic skin response and digital pulse wave converge into 52 indicators, which resolve into one functional status."
        className="h-auto w-full"
      >
        {SOURCES.map((s) => (
          <g key={s.label}>
            <path
              className="tc-line"
              pathLength={1}
              d={`M200 ${s.y} C 290 ${s.y}, 290 200, 380 200`}
              fill="none"
              strokeWidth={2}
              style={{ stroke: "var(--color-data)" }}
            />
            <g className="tc-node">
              <rect x={0} y={s.y - 24} width={200} height={48} fill="none" strokeWidth={1} style={{ stroke: "var(--color-rule)" }} />
              <text x={14} y={s.y + 6} fontSize={17} style={{ fill: "var(--color-ink)", fontFamily: "var(--font-sans)" }}>
                {s.label}
              </text>
            </g>
          </g>
        ))}
        <g className="tc-hub">
          <circle cx={430} cy={200} r={50} style={{ fill: "var(--color-green-deep)" }} />
          <text x={430} y={206} textAnchor="middle" fontSize={32} style={{ fill: "var(--color-gold-dark)", fontFamily: "var(--font-display)" }}>
            52
          </text>
          <text x={430} y={236} textAnchor="middle" fontSize={12} style={{ fill: "var(--color-cream)", fontFamily: "var(--font-mono)" }}>
            INDICATORS
          </text>
        </g>
        <path
          className="tc-out"
          pathLength={1}
          d="M480 200 L 540 200"
          fill="none"
          strokeWidth={2}
          style={{ stroke: "var(--color-gold)" }}
        />
        <g className="tc-final">
          <rect x={540} y={170} width={100} height={60} style={{ fill: "var(--color-gold)" }} />
          <text x={590} y={206} textAnchor="middle" fontSize={17} fontWeight={600} style={{ fill: "var(--color-ink)", fontFamily: "var(--font-sans)" }}>
            One status
          </text>
        </g>
      </svg>
    </div>
  );
}
