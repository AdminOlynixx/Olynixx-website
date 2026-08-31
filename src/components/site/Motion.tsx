"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "#content .ol-section:not(.ol-hero) > .ol-container";

export function Motion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const nodes = [...document.querySelectorAll(SELECTOR)];
    if (!nodes.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -32px 0px" },
    );

    for (const el of nodes) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 24) el.classList.add("is-in");
      else io.observe(el);
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
