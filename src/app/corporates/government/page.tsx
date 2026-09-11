import type { Metadata } from "next";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { SubNav } from "@/components/site/SubNav";
import { CtaBand } from "@/components/site/CtaBand";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CORPORATES, GOVERNMENT } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";
import { entityIdentity, publishBest } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Government workforce readiness testing | Olynixx" },
  description: GOVERNMENT.heroLead,
};

export default function GovernmentPage() {
  const entity = entityIdentity();
  const contract = GOVERNMENT.contract.map((item, index) =>
    index === 0 && entity.legalName
      ? `The trading entity for a UAE contract is ${entity.legalName.replace(/\.$/, "")}.`
      : item,
  );
  return (
    <>
      <Hero>
        <Eyebrow>Government & public sector</Eyebrow>
        <h1 className="ol-hero-title">{GOVERNMENT.heroTitle}</h1>
        <p className="ol-lead">{GOVERNMENT.heroLead}</p>
      </Hero>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/corporates", label: "Corporates" },
          { href: "/corporates/government", label: "Government" },
        ]}
      />
      <SubNav items={CORP_SUBNAV} current="/corporates/government" />

      <Section>
        <Eyebrow>Anonymised record</Eyebrow>
        <Title>{GOVERNMENT.deliveredTitle}</Title>
        <div className="ol-grid" style={{ marginTop: "var(--ol-sp-6)" }}>
          {GOVERNMENT.delivered.map((item) => (
            <article key={item} className="ol-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="dark">
        <Eyebrow>Pilot first, always</Eyebrow>
        <Title>{GOVERNMENT.engageTitle}</Title>
        <Lead>{GOVERNMENT.engageIntro}</Lead>
        <div className="ol-arc" style={{ marginTop: "var(--ol-sp-7)" }}>
          {GOVERNMENT.steps.map((step, index) => (
            <article key={step.title} className="ol-arc__step">
              <p className="ol-eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <div className="ol-tiers">
          {GOVERNMENT.layers.map((layer, index) => (
            <article key={layer.title} className={index === 0 ? "ol-card ol-tier ol-tier--dominant" : "ol-card ol-tier"}>
              <h3>{layer.title}</h3>
              <p>{index === 2 && publishBest() ? CORPORATES.tier3Best : layer.body}</p>
            </article>
          ))}
        </div>
        <p className="ol-tagline" style={{ marginTop: "var(--ol-sp-6)" }}>
          {GOVERNMENT.close}
        </p>
      </Section>

      <Section narrow>
        <Eyebrow>Data handling</Eyebrow>
        <Title>{GOVERNMENT.governanceTitle}</Title>
        <Lead>{GOVERNMENT.governanceBody}</Lead>
      </Section>

      <Section>
        <Eyebrow>{GOVERNMENT.contractEyebrow}</Eyebrow>
        <Title>{GOVERNMENT.contractTitle}</Title>
        <div className="ol-grid" style={{ marginTop: "var(--ol-sp-6)" }}>
          {contract.map((item) => (
            <article key={item.slice(0, 32)} className="ol-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand title={GOVERNMENT.cta} href={contactHref("government", "government-close")} label={GOVERNMENT.cta} />
    </>
  );
}
