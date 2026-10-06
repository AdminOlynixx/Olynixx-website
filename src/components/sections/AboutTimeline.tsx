"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Entry = { era: string; body: string };

/** Vertical rail: the gold line draws as you scroll, entries reveal as the line passes. */
export function AboutTimeline({ entries }: { entries: readonly Entry[] }) {
  const root = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current || !line.current) return;
      gsap.set(line.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(line.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: 0.5 },
      });
      const items = gsap.utils.toArray<HTMLElement>(".tl-item", root.current);
      items.forEach((el) => {
        const dot = el.querySelector(".tl-dot");
        const copy = el.querySelectorAll(".tl-copy");
        gsap.set(copy, { autoAlpha: 0, y: 24 });
        if (dot) gsap.set(dot, { scale: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 72%",
          once: true,
          onEnter: () => {
            gsap.to(copy, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 });
            if (dot) gsap.to(dot, { scale: 1, duration: 0.5, ease: "back.out(2.4)" });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="relative">
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-rule md:left-[204px]" />
      <span
        ref={line}
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-[2px] -translate-x-[0.5px] bg-gold md:left-[204px]"
      />
      {entries.map((entry) => (
        <li key={entry.era} className="tl-item relative grid gap-2 pb-12 pl-9 last:pb-0 md:grid-cols-[180px_1fr] md:gap-12 md:pl-0">
          <p className="tl-copy eyebrow md:pt-1 md:text-right">{entry.era}</p>
          <div className="relative md:pl-0">
            <span
              aria-hidden
              className="tl-dot absolute -left-[36px] top-1.5 h-[15px] w-[15px] border-2 border-gold bg-cream md:-left-[32px]"
            />
            <p className="tl-copy max-w-[62ch] text-ink-muted">{entry.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
