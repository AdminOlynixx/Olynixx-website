import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export type CardItem = { title: string; body?: string; kicker?: string; extra?: ReactNode };

/** Responsive card grid with staggered reveal and a gold top-rule hover. */
export function CardGrid({
  items,
  theme = "light",
  cols = 3,
  numbered,
}: {
  items: readonly CardItem[];
  theme?: "dark" | "light";
  cols?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[cols];
  const card =
    theme === "dark"
      ? "border-cream/15 bg-cream/[0.04] hover:border-gold-dark"
      : "border-rule bg-paper hover:border-gold";
  return (
    <Reveal stagger={0.1} className={`grid gap-5 ${colClass}`}>
      {items.map((it, i) => (
        <article
          key={it.title}
          className={`group relative border p-7 transition-colors duration-300 ${card}`}
        >
          <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
          {(numbered || it.kicker) && (
            <p className="eyebrow mb-4">{it.kicker ?? String(i + 1).padStart(2, "0")}</p>
          )}
          <h3 className="font-display text-2xl leading-tight">{it.title}</h3>
          {it.body && (
            <p className={`mt-3 text-[15px] ${theme === "dark" ? "text-cream/75" : "text-ink-muted"}`}>{it.body}</p>
          )}
          {it.extra}
        </article>
      ))}
    </Reveal>
  );
}
