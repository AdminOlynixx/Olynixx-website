"use client";

import { useRef, type PointerEvent } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Level = { title: string; body: string; price: string };

function splitTitle(title: string) {
  const i = title.indexOf(". ");
  return i === -1 ? { kicker: "", name: title } : { kicker: title.slice(0, i), name: title.slice(i + 2) };
}

/** The three levels as rising, tilting cards over a progress rail. Price slots stay empty until published. */
export function LevelLadder({
  levels,
  priceNote,
  note,
  theme = "light",
}: {
  levels: readonly Level[];
  priceNote?: string;
  note?: string;
  theme?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dark = theme === "dark";

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const root = ref.current;
      const cards = gsap.utils.toArray<HTMLElement>("[data-level]", root);
      const marks = gsap.utils.toArray<HTMLElement>("[data-mark]", root);
      const fill = root.querySelector<HTMLElement>("[data-fill]");
      gsap.set(marks, { backgroundColor: "rgba(197,163,62,0)" });
      if (fill) gsap.set(fill, { scaleX: 0, transformOrigin: "left" });
      gsap.set(cards, { autoAlpha: 0, y: 70, rotateX: 12, transformPerspective: 900 });
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 80%", scrub: 0.5 },
      });
      if (fill) tl.to(fill, { scaleX: 1, duration: marks.length }, 0);
      marks.forEach((m, i) =>
        tl.to(m, { backgroundColor: "rgba(197,163,62,1)", duration: 0.3 }, (i * (marks.length - 1)) / marks.length),
      );
    },
    { scope: ref },
  );

  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(e.currentTarget, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 900, duration: 0.4, overwrite: "auto" });
  };
  const untilt = (e: PointerEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.6, overwrite: "auto" });
  };

  const card = dark ? "border-cream/15 bg-cream/[0.04] hover:border-gold-dark" : "border-rule bg-paper hover:border-gold";

  return (
    <div ref={ref}>
      <div className="relative mb-8 flex items-center justify-between" aria-hidden>
        <div className={`absolute inset-x-4 top-1/2 h-px -translate-y-1/2 ${dark ? "bg-cream/20" : "bg-rule"}`}>
          <span data-fill className="block h-full w-full bg-gold" />
        </div>
        {levels.map((l) => (
          <span
            key={l.title}
            data-mark
            className={`relative z-10 flex size-9 items-center justify-center border border-gold bg-gold font-mono text-xs text-ink ${
              dark ? "" : ""
            }`}
          >
            {splitTitle(l.title).kicker.replace("Level ", "") || "·"}
          </span>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {levels.map((l) => {
          const { kicker, name } = splitTitle(l.title);
          return (
            <article
              key={l.title}
              data-level
              onPointerMove={tilt}
              onPointerLeave={untilt}
              className={`relative border p-7 transition-colors duration-300 ${card}`}
            >
              {kicker && <p className="eyebrow mb-4">{kicker}</p>}
              <h3 className="font-display text-2xl leading-tight">{name}</h3>
              {l.price.trim() && (
                <p className={`mt-2 font-mono text-xs ${dark ? "text-cream/70" : "text-ink-muted"}`}>
                  from AED {l.price} /month
                </p>
              )}
              <p className={`mt-3 text-[15px] ${dark ? "text-cream/75" : "text-ink-muted"}`}>{l.body}</p>
            </article>
          );
        })}
      </div>
      {priceNote && <p className={`mt-6 font-mono text-xs uppercase tracking-[0.08em] ${dark ? "text-cream/70" : "text-ink-muted"}`}>{priceNote}</p>}
      {note && <p className={`mt-2 ${dark ? "text-cream/80" : "text-ink-muted"}`}>{note}</p>}
    </div>
  );
}
