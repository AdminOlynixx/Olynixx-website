import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/sections/JsonLd";
import type { FaqItem } from "@/content/faq";

/** On-page FAQ with FAQPage structured data. Renders nothing while the list is empty. */
export function Faq({ items, title = "Common questions", theme = "light" }: { items: readonly FaqItem[]; title?: string; theme?: "dark" | "light" }) {
  if (items.length === 0) return null;
  const dark = theme === "dark";
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
      <Reveal stagger={0.08} className="max-w-3xl space-y-4">
        <h2 className="text-[clamp(1.8125rem,3.4vw,2.5rem)] leading-[1.1]">{title}</h2>
        <dl className={`divide-y ${dark ? "divide-cream/15" : "divide-rule"}`}>
          {items.map((i) => (
            <div key={i.q} className="py-5">
              <dt className="font-display text-xl">{i.q}</dt>
              <dd className={`mt-2 ${dark ? "text-cream/80" : "text-ink-muted"}`}>{i.a}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </>
  );
}
