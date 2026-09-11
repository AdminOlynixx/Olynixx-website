import { Eyebrow, Title, Lead } from "@/components/site/Section";
import { READINESS_HUB } from "@/content/readiness-hub";

export function ReadinessHub() {
  return (
    <div className="ol-hub">
      <Eyebrow>{READINESS_HUB.eyebrow}</Eyebrow>
      <Title>{READINESS_HUB.title}</Title>
      <Lead>{READINESS_HUB.intro}</Lead>
      <div className="ol-grid">
        {READINESS_HUB.tiers.map((tier, index) => (
          <article key={tier.title} className="ol-card">
            <p className="ol-eyebrow">{String(index + 1).padStart(2, "0")}</p>
            <h3>{tier.title}</h3>
            <p>{tier.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
