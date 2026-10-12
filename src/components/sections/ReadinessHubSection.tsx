import { READINESS_HUB } from "@/content/readiness-hub";
import { Section } from "@/components/sections/Section";
import { CardGrid } from "@/components/sections/CardGrid";

/** Base / Advanced / Complete. Each card carries a 1-2-3 segment meter. */
export function ReadinessHubSection({ theme = "light" }: { theme?: "dark" | "light" }) {
  const items = READINESS_HUB.tiers.map((t, i) => ({
    ...t,
    kicker: String(i + 1).padStart(2, "0"),
    extra: (
      <div aria-hidden className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((s) => (
          <span key={s} className={`h-1.5 flex-1 ${s <= i ? "bg-gold" : theme === "dark" ? "bg-cream/15" : "bg-rule"}`} />
        ))}
      </div>
    ),
  }));
  return (
    <Section theme={theme} eyebrow={READINESS_HUB.eyebrow} title={READINESS_HUB.title} lead={READINESS_HUB.intro}>
      <CardGrid items={items} theme={theme} cols={3} />
    </Section>
  );
}
