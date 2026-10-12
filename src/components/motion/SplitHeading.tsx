"use client";

import { useRef, type ElementType, type FC, type HTMLAttributes, type Ref } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Line-by-line masked heading reveal. Plays on mount, or on scroll when `onScroll`. */
export function SplitHeading({
  text,
  as: as = "h2",
  className = "",
  onScroll = false,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  onScroll?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const el = ref.current;
      let split: SplitText | undefined;
      document.fonts.ready.then(() => {
        split = SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              ease: "power4.out",
              stagger: 0.09,
              delay,
              scrollTrigger: onScroll ? { trigger: el, start: "top 88%", once: true } : undefined,
            }),
        });
        gsap.set(el, { opacity: 1 });
      });
      return () => split?.revert();
    },
    { scope: ref },
  );

  const Tag = as as unknown as FC<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>;

  return (
    <Tag ref={ref} className={`${className} js-reveal`}>
      {text}
    </Tag>
  );
}
