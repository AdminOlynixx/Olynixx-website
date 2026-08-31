import type { Metadata } from "next";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { Lockup } from "@/components/brand/Lockup";
import { PRAXIS } from "@/content/praxis";
import { contactHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: "Olynixx Praxis",
  description: PRAXIS.heroLead,
};

export default function PraxisPage() {
  return (
    <>
      <Hero center>
        <Lockup product="praxis" ground="dark" className="ol-hero-lockup" height={180} priority />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="ol-hero-strapline"
          src="/brand/olynixx-praxis-strapline-on-dark.svg"
          alt="Learn + Certify + Deploy"
        />
        <h1 className="ol-hero-title" style={{ marginTop: "var(--s4)" }}>
          {PRAXIS.heroTitle}
        </h1>
        <p className="ol-lead">{PRAXIS.heroLead}</p>
        <p className="ol-small ol-muted" style={{ marginTop: "var(--ol-sp-4)" }}>
          {PRAXIS.programmeName} is the programme delivered inside Olynixx Praxis.
        </p>
      </Hero>

      <Section narrow>
        <Eyebrow>The clock</Eyebrow>
        <Title>{PRAXIS.renewalTitle}</Title>
        <Lead>{PRAXIS.renewalBody}</Lead>
      </Section>

      <Section surface="dark">
        <Eyebrow>The outcome</Eyebrow>
        <Title>{PRAXIS.walkAwayTitle}</Title>
        <div className="ol-grid" style={{ marginTop: "var(--ol-sp-6)" }}>
          {PRAXIS.walkAway.map((item) => (
            <article key={item} className="ol-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>The craft</Eyebrow>
        <Title>{PRAXIS.learnTitle}</Title>
        <div className="ol-grid" style={{ marginTop: "var(--ol-sp-6)" }}>
          {PRAXIS.learn.map((item, index) => (
            <article key={item} className="ol-card">
              <p className="ol-eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="app" narrow>
        <Eyebrow>UAE first</Eyebrow>
        <Title>{PRAXIS.whoTitle}</Title>
        <Lead>{PRAXIS.whoBody}</Lead>
      </Section>

      <Section narrow>
        <Eyebrow>Why Praxis</Eyebrow>
        <Title>{PRAXIS.whyTitle}</Title>
        <Lead>{PRAXIS.whyBody}</Lead>
      </Section>

      <Section surface="dark">
        <Eyebrow>Four steps</Eyebrow>
        <Title>{PRAXIS.pathwayTitle}</Title>
        <div className="ol-system" style={{ marginTop: "var(--ol-sp-7)" }}>
          {PRAXIS.pathway.map((step) => (
            <article key={step.title} className="ol-system__item">
              <p className="ol-eyebrow">{step.step}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand title={PRAXIS.cta} href={contactHref("praxis-certification")} label={PRAXIS.ctaButton} />
    </>
  );
}
