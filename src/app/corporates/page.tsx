import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { SubNav } from "@/components/site/SubNav";
import { MediaSlot } from "@/components/site/MediaSlot";
import { PureHealthBlock } from "@/components/site/PureHealthBlock";
import { CtaBand } from "@/components/site/CtaBand";
import { IsoBlock, TrustBar } from "@/components/site/IsoBlock";
import { CORPORATES } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: { absolute: CORPORATES.metaTitle },
  description: CORPORATES.metaDescription,
};

export default function CorporatesPage() {
  return (
    <>
      <Hero>
        <Eyebrow>{CORPORATES.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{CORPORATES.heroTitle}</h1>
        <p className="ol-lead">{CORPORATES.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot")}>
            {CORPORATES.primaryCta}
          </Link>
          <a className="ol-btn ol-btn--secondary" href="#pilot">
            {CORPORATES.secondaryCta}
          </a>
        </p>
        <TrustBar items={CORPORATES.trust} />
      </Hero>
      <SubNav items={CORP_SUBNAV} current="/corporates" />

      <Section narrow>
        <Eyebrow>{CORPORATES.gapEyebrow}</Eyebrow>
        <Title>{CORPORATES.gapTitle}</Title>
        {CORPORATES.gap.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section id="pilot" surface="dark">
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
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot")}>
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

      <Section surface="app">
        <Eyebrow>{CORPORATES.dashEyebrow}</Eyebrow>
        <Title>{CORPORATES.dashTitle}</Title>
        {CORPORATES.dash.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
        <div className="ol-grid">
          <MediaSlot label={CORPORATES.personalSlot} />
          <MediaSlot label={CORPORATES.boardroomSlot} />
        </div>
      </Section>

      <Section narrow>
        <Eyebrow>{CORPORATES.rohEyebrow}</Eyebrow>
        <Title>{CORPORATES.rohTitle}</Title>
        {CORPORATES.roh.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section surface="dark" narrow>
        <IsoBlock follow />
      </Section>

      <Section>
        <Eyebrow>{CORPORATES.eventsEyebrow}</Eyebrow>
        <Title>{CORPORATES.eventsTitle}</Title>
        {CORPORATES.events.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--secondary" href={contactHref("event")}>
            {CORPORATES.eventsCta}
          </Link>
        </p>
        <PureHealthBlock />
      </Section>

      <CtaBand
        title={CORPORATES.closeTitle}
        standfirst={CORPORATES.closeStandfirst}
        href={contactHref("corporate-pilot")}
        label={CORPORATES.primaryCta}
        secondaryHref={contactHref("event")}
        secondaryLabel={CORPORATES.eventsCta}
      />
    </>
  );
}
