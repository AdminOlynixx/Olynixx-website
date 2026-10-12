"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Vertical timeline whose gold line draws as you scroll (scrubbed) and whose
 * dots light up when the line reaches them. Children are <TimelineItem> rows.
 * Fully visible without motion or JS.
 */
export function ScrollTimeline({ children, theme = "light" }: { children: ReactNode; theme?: "dark" | "light" }) {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current || !fill.current) return;
      const dots = root.current.querySelectorAll<HTMLElement>("[data-tl-dot]");
      const items = root.current.querySelectorAll<HTMLElement>("[data-tl-item]");
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      dots.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "#0b3a33", scale: 0.8 },
          {
            backgroundColor: "#c5a33e",
            color: "#0b100e",
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: { trigger: items[i], start: "top 65%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <span
        aria-hidden
        className={`absolute bottom-0 left-[14px] top-0 w-px md:left-[17px] ${theme === "dark" ? "bg-cream/20" : "bg-rule"}`}
      />
      <span
        ref={fill}
        aria-hidden
        className="absolute bottom-0 left-[13px] top-0 w-[3px] origin-top bg-gold md:left-[16px]"
      />
      <ol className="relative">{children}</ol>
    </div>
  );
}
