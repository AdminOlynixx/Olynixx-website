import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FIRST_12 } from "@/content/corporates";
import { contactHref } from "@/lib/cta";

/** What a first 12-week cycle delivers: outputs only, never client numbers. */
export function FirstTwelveWeeks({ position, theme = "light" }: { position: string; theme?: "dark" | "light" }) {
  const dark = theme === "dark";
  return (
    <Reveal stagger={0.1} className="max-w-3xl space-y-8">
      <h3 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1]">{FIRST_12.title}</h3>
      <ul className="space-y-5">
        {FIRST_12.items.map((i) => (
          <li key={i.who} className={`border-l-2 border-gold pl-5 ${dark ? "text-cream/85" : "text-ink-muted"}`}>
            <strong className={dark ? "text-cream" : "text-ink"}>{i.who}:</strong> {i.what}
          </li>
        ))}
      </ul>
      <p className={`text-sm ${dark ? "text-cream/70" : "text-ink-muted"}`}>{FIRST_12.note}</p>
      <Button href={contactHref("corporate-pilot", position)}>{FIRST_12.cta}</Button>
    </Reveal>
  );
}
