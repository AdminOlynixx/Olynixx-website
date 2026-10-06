import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  /** dark = deep green, light = cream. Drives both the background and the star's colour. */
  theme?: "dark" | "light";
  id?: string;
  narrow?: boolean;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
};

/** Standard page section: themed background, optional eyebrow/title/lead, staggered reveal. */
export function Section({ theme = "light", id, narrow, eyebrow, title, lead, children, className = "" }: Props) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={`${theme === "dark" ? "surface-dark" : ""} py-20 md:py-28 ${className}`}
    >
      <div className={`container-ol ${narrow ? "max-w-[860px]" : ""}`}>
        {(eyebrow || title || lead) && (
          <Reveal stagger={0.1} className="mb-10 max-w-3xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)] leading-[1.1]">{title}</h2>}
            {lead && (
              <p className={`mt-4 max-w-[68ch] ${theme === "dark" ? "text-cream/80" : "text-ink-muted"}`}>{lead}</p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function Prose({ children, theme = "light" }: { children: ReactNode; theme?: "dark" | "light" }) {
  return (
    <Reveal stagger={0.08} className={`max-w-[68ch] space-y-5 ${theme === "dark" ? "text-cream/85" : "text-ink-muted"}`}>
      {children}
    </Reveal>
  );
}
