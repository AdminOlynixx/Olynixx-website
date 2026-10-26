"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Step = { title: string; body: string };

/**
 * Pinned scroll storyline. On desktop the section pins while a scrubbed timeline
 * advances through the steps. On mobile or reduced motion it is a plain stacked list.
 */
export function PinnedCycle({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: readonly Step[];
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-step]", root.current);
        const big = gsap.utils.toArray<HTMLElement>("[data-big]", root.current);
        const line = root.current!.querySelector<HTMLElement>("[data-line]");
        gsap.set(items, { opacity: 0.7 });
        gsap.set(big, { autoAlpha: 0, yPercent: 40 });
        gsap.set(items[0], { opacity: 1 });
        gsap.set(big[0], { autoAlpha: 1, yPercent: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${steps.length * 90}%`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });
        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: steps.length }, 0);
        steps.forEach((_, i) => {
          if (i === 0) return;
          tl.to(items[i - 1], { opacity: 0.7, duration: 0.3 }, i - 0.3)
            .to(big[i - 1], { autoAlpha: 0, yPercent: -40, duration: 0.4 }, i - 0.4)
            .to(items[i], { opacity: 1, duration: 0.3 }, i - 0.1)
            .to(big[i], { autoAlpha: 1, yPercent: 0, duration: 0.4 }, i - 0.1);
        });
        return () => ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [steps.length] },
  );

  return (
    <section ref={root} data-theme="dark" className="surface-dark relative overflow-hidden lg:min-h-screen">
      <div className="container-ol flex flex-col justify-center py-20 lg:min-h-screen lg:py-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.8125rem,3.4vw,2.5rem)] leading-[1.1]">{title}</h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative pl-8">
            <span className="absolute bottom-1 left-0 top-1 w-px bg-cream/15" />
            <span
              data-line
              className="absolute bottom-1 left-0 top-1 w-px origin-top bg-gold-dark"
            />
            <ol className="space-y-8">
              {steps.map((s, i) => (
                <li key={s.title} data-step className="max-w-md">
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-cream/75">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative hidden h-[22rem] lg:block" aria-hidden>
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-big
                className="absolute inset-0 flex items-center justify-end whitespace-nowrap pl-16 font-display text-[clamp(4rem,9.5vw,9rem)] italic leading-none text-gold-dark/90"
              >
                {s.title}
                <span className="sr-only">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
