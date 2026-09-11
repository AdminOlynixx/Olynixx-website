import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { SubNav } from "@/components/site/SubNav";
import { Wireframe } from "@/components/site/Wireframe";
import { PureHealthBlock } from "@/components/site/PureHealthBlock";
import { CtaBand } from "@/components/site/CtaBand";
import { IsoShort, TrustBar } from "@/components/site/IsoBlock";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ProofStrip } from "@/components/site/ProofStrip";
import { CORPORATES } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";
import { JsonLd } from "@/components/site/JsonLd";
import { serviceJsonLd } from "@/lib/json-ld";
import { publishBest } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: CORPORATES.metaTitle },
  description: CORPORATES.metaDescription,
};

export default function CorporatesPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd()} />
      <Hero>
        <Eyebrow>{CORPORATES.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{CORPORATES.heroTitle}</h1>
        <p className="ol-lead">{CORPORATES.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot", "corporates-hero")}>
            {CORPORATES.primaryCta}
          </Link>
          <a className="ol-btn ol-btn--secondary" href="#pilot">
            {CORPORATES.secondaryCta}
          </a>
        </p>
        <TrustBar items={CORPORATES.trust} />
      </Hero>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/corporates", label: "Corporates" },
        ]}
      />
      <SubNav items={CORP_SUBNAV} current="/corporates" />

      <Section narrow>
        <p className="ol-claim">{CORPORATES.firstClaim}</p>
      </Section>

      <Section className="ol-tight-section">
        <Eyebrow>{CORPORATES.eventBandEyebrow}</Eyebrow>
        <Title>{CORPORATES.eventBandTitle}</Title>
        <Lead>{CORPORATES.eventBandBody}</Lead>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--secondary" href={contactHref("event", "corporates-event-band")}>
            {CORPORATES.eventsCta}
          </Link>
        </p>
      </Section>

      <Section narrow>
        <Eyebrow>{CORPORATES.gapEyebrow}</Eyebrow>
        <Title>{CORPORATES.gapTitle}</Title>
        {CORPORATES.gap.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section id="pilot">
        <Eyebrow>{CORPORATES.pilotEyebrow}</Eyebrow>
        <Title>{CORPORATES.pilotTitle}</Title>
        <Lead>{CORPORATES.pilotIntro}</Lead>
        <div className="ol-weeks">
          {CORPORATES.weeks.map((week) => (
            <article key={week.title} className="ol-card">
              <h3>{week.title}</h3>
              <p>{week.body}</p>
            </article>
          ))}
        </div>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot", "corporates-pilot")}>
            {CORPORATES.primaryCta}
          </Link>
        </p>
      </Section>

      <Section>
        <Eyebrow>{CORPORATES.systemEyebrow}</Eyebrow>
        <Title>{CORPORATES.systemTitle}</Title>
        <div className="ol-system">
          {CORPORATES.system.map((item, index) => (
            <article key={item.title} className="ol-system__item">
              <p className="ol-eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>{CORPORATES.tiersEyebrow}</Eyebrow>
        <Title>{CORPORATES.tiersTitle}</Title>
        <div className="ol-tiers">
          {CORPORATES.tiers.map((tier, index) => (
            <article key={tier.title} className={index === 0 ? "ol-card ol-tier ol-tier--dominant" : "ol-card ol-tier"}>
              <p className="ol-eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3>{tier.title}</h3>
              <p>{index === 2 && publishBest() ? CORPORATES.tier3Best : tier.body}</p>
              {index === 0 ? (
                <div className="ol-grid" style={{ marginBlockStart: "var(--s3)" }}>
                  <Wireframe title={CORPORATES.personalSlot} />
                  <Wireframe title={CORPORATES.boardroomSlot} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <ProofStrip items={CORPORATES.proof} />
      </Section>

      <Section narrow>
        <Eyebrow>{CORPORATES.resultsTitle}</Eyebrow>
        <Lead>{CORPORATES.resultsBody}</Lead>
      </Section>

      <Section surface="app">
        <Eyebrow>{CORPORATES.dashEyebrow}</Eyebrow>
        <Title>{CORPORATES.dashTitle}</Title>
        {CORPORATES.dash.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section narrow>
        <Eyebrow>{CORPORATES.rohEyebrow}</Eyebrow>
        <Title>{CORPORATES.rohTitle}</Title>
        {CORPORATES.roh.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section narrow>
        <IsoShort />
      </Section>

      <Section>
        <Eyebrow>{CORPORATES.eventsEyebrow}</Eyebrow>
        <Title>{CORPORATES.eventsTitle}</Title>
        {CORPORATES.events.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--secondary" href={contactHref("event", "corporates-events")}>
            {CORPORATES.eventsCta}
          </Link>
        </p>
        <PureHealthBlock />
      </Section>

      <CtaBand
        title={CORPORATES.closeTitle}
        standfirst={CORPORATES.closeStandfirst}
        href={contactHref("corporate-pilot", "corporates-close")}
        label={CORPORATES.primaryCta}
        secondaryHref={contactHref("event", "corporates-close-event")}
        secondaryLabel={CORPORATES.eventsCta}
      />
    </>
  );
}
