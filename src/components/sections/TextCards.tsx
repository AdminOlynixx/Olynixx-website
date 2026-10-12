import { Reveal } from "@/components/motion/Reveal";

/** Paragraph-only cards (numbered) for sentence-length copy. */
export function TextCards({
  items,
  theme = "light",
  cols = 3,
}: {
  items: readonly string[];
  theme?: "dark" | "light";
  cols?: 2 | 3;
}) {
  const colClass = cols === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  const card =
    theme === "dark" ? "border-cream/15 bg-cream/[0.04] hover:border-gold-dark" : "border-rule bg-paper hover:border-gold";
  return (
    <Reveal stagger={0.1} className={`grid gap-5 ${colClass}`}>
      {items.map((t, i) => (
        <article key={t.slice(0, 40)} className={`group relative border p-7 transition-colors duration-300 ${card}`}>
          <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
          <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")}</p>
          <p className={`text-[16px] ${theme === "dark" ? "text-cream/85" : "text-ink"}`}>{t}</p>
        </article>
      ))}
    </Reveal>
  );
}
