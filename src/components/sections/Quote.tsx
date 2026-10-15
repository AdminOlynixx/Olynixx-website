import { Reveal } from "@/components/motion/Reveal";

/**
 * Anonymised client quote: quote, role, sector. No photo, no name.
 * Not used on any page yet. Louis supplies the quotes (brief item 13); render this on Home, Corporates and Gyms when they arrive.
 */
export function Quote({
  quote,
  role,
  sector,
  theme = "light",
}: {
  quote: string;
  role: string;
  sector: string;
  theme?: "dark" | "light";
}) {
  const dark = theme === "dark";
  return (
    <Reveal as="figure" className={`max-w-3xl border-l-2 border-gold pl-6 ${dark ? "text-cream" : "text-ink"}`}>
      <blockquote className="font-display text-[clamp(1.375rem,2.6vw,1.875rem)] leading-snug">“{quote}”</blockquote>
      <figcaption className={`mt-4 font-mono text-xs uppercase tracking-[0.1em] ${dark ? "text-cream/70" : "text-ink-muted"}`}>
        {role}, {sector}
      </figcaption>
    </Reveal>
  );
}
