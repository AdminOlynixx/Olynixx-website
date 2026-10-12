"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Illustrative, animated mock dashboards. Shapes only: no client data, no real values.
 * Band colours come from the --color-band-* tokens.
 */

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="m-0">
      <div className="relative border border-cream/20 bg-green-deep p-5 text-cream">
        <span className="absolute right-3 top-3 border border-cream/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-cream/70">
          Illustrative
        </span>
        {children}
      </div>
      <figcaption className="mt-3 text-[13px] text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

function useMockAnimation(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;
      const el = scope.current;
      const st = { trigger: el, start: "top 85%", once: true };
      el.querySelectorAll<SVGPathElement>("[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.out", scrollTrigger: st });
      });
      gsap.from(el.querySelectorAll("[data-grow-x]"), { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out", stagger: 0.12, scrollTrigger: st });
      gsap.from(el.querySelectorAll("[data-grow-y]"), { scaleY: 0, transformOrigin: "center bottom", duration: 1, ease: "power3.out", stagger: 0.08, scrollTrigger: st });
      gsap.from(el.querySelectorAll("[data-fade]"), { opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.3, scrollTrigger: st });
    },
    { scope },
  );
}

/** Personal view: ring gauge, trend line, next-decision placeholder rows. */
export function PersonalDashMock({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMockAnimation(ref);
  const r = 46;
  const circ = 2 * Math.PI * r;
  return (
    <Frame caption={caption}>
      <div ref={ref} aria-hidden className="grid grid-cols-[110px_1fr] items-center gap-5 pt-5">
        <svg viewBox="0 0 120 120" className="h-[110px] w-[110px] -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#f2ede3" strokeOpacity="0.12" strokeWidth="10" />
          <circle
            data-draw
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#4fc0a6"
            strokeWidth="10"
            strokeDasharray={`${circ * 0.7} ${circ}`}
          />
        </svg>
        <div>
          <svg viewBox="0 0 200 60" className="w-full">
            <path data-draw d="M0 46 C30 44 40 30 70 34 S120 14 150 20 S185 8 200 10" fill="none" stroke="#d9b75a" strokeWidth="2" />
            <path d="M0 58 H200" stroke="#f2ede3" strokeOpacity="0.15" />
          </svg>
          <div className="mt-3 space-y-2">
            <div data-grow-x className="h-2 w-4/5 bg-cream/25" />
            <div data-grow-x className="h-2 w-3/5 bg-cream/15" />
          </div>
        </div>
      </div>
    </Frame>
  );
}

const BANDS = [
  { cls: "bg-band-low", w: "w-[18%]" },
  { cls: "bg-band-mid", w: "w-[27%]" },
  { cls: "bg-band-good", w: "w-[35%]" },
  { cls: "bg-band-high", w: "w-[20%]" },
];

/** Leadership view: anonymised stacked readiness bands plus a load-concentration column chart. */
export function LeadershipDashMock({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMockAnimation(ref);
  const cols = [38, 62, 45, 78, 52, 30];
  return (
    <Frame caption={caption}>
      <div ref={ref} aria-hidden className="space-y-5 pt-5">
        <div className="flex h-5 overflow-hidden">
          {BANDS.map((b, i) => (
            <span key={i} data-grow-x className={`${b.cls} ${b.w} h-full border-r border-green-deep`} />
          ))}
        </div>
        <div className="flex h-24 items-end gap-2 border-b border-cream/20">
          {cols.map((h, i) => (
            <span
              key={i}
              data-grow-y
              style={{ height: `${h}%` }}
              className={`flex-1 ${h > 70 ? "bg-band-low" : h > 50 ? "bg-band-mid" : "bg-band-good"}`}
            />
          ))}
        </div>
        <svg viewBox="0 0 200 24" className="w-full">
          <path data-draw d="M0 18 C40 16 60 8 100 10 S160 4 200 5" fill="none" stroke="#d9b75a" strokeWidth="2" />
        </svg>
      </div>
    </Frame>
  );
}

/** Gym view: today's load against today's capacity. Shapes only. */
export function LoadCapacityMock({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMockAnimation(ref);
  return (
    <Frame caption={caption}>
      <div ref={ref} aria-hidden className="space-y-4 pt-6">
        {[
          { cls: "bg-band-good", w: "w-[72%]" },
          { cls: "bg-band-mid", w: "w-[48%]" },
          { cls: "bg-band-low", w: "w-[30%]" },
        ].map((row, i) => (
          <div key={i} className="relative h-4 bg-cream/10">
            <span data-grow-x className={`absolute inset-y-0 left-0 ${row.cls} ${row.w}`} />
            <span data-fade className="absolute inset-y-[-4px] left-[75%] w-px bg-gold-dark" />
          </div>
        ))}
      </div>
    </Frame>
  );
}
