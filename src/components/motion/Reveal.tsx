"use client";

import { useRef, type ElementType, type FC, type HTMLAttributes, type Ref, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
  y?: number;
  delay?: number;
};

/** Scroll-triggered fade-and-rise. Content stays visible without JS or with reduced motion. */
export function Reveal({
  children,
  as: as = "div",
  className = "",
  stagger,
  y = 32,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const targets = stagger ? Array.from(ref.current.children) : ref.current;
      // Final content is in the server HTML. Animation is an enhancement, never a gate.
      gsap.set(ref.current, { opacity: 1 });
      const inView = ref.current.getBoundingClientRect().top < window.innerHeight * 0.95;
      gsap.fromTo(
        targets,
        { autoAlpha: 0.65, y: Math.min(y, 14) },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          delay,
          ease: "power2.out",
          stagger: stagger ?? 0,
          // Below the fold the from-state is applied only when the block scrolls in, so nothing sits faded.
          immediateRender: inView,
          scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
        },
      );
      return () => ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  const Tag = as as unknown as FC<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>;

  return (
    <Tag ref={ref} className={`${className} js-reveal`}>
      {children}
    </Tag>
  );
}
