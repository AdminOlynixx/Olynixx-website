import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { TrustBar } from "@/components/site/IsoBlock";
import { DoorSwitcher } from "@/components/site/DoorSwitcher";
import { HUB } from "@/content/individuals";
import { contactHref } from "@/lib/cta";
import { publishLongevity } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: HUB.metaTitle },
  description: HUB.metaDescription,
};

export default function IndividualsHub() {
  const longevityLive = publishLongevity();
  const doors = longevityLive ? HUB.doors : HUB.doors.filter((d) => d.href !== "/individuals/longevity");
  const doorsTitle = longevityLive ? HUB.doorsTitle : "Two routes. One method.";

  return (
    <>
      <Hero>
        <Eyebrow>{HUB.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{HUB.heroTitle}</h1>
        <p className="ol-lead">{HUB.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("individual-intake")}>
            {HUB.primaryCta}
          </Link>
          <a className="ol-btn ol-btn--secondary" href="#routes">
            {HUB.secondaryCta}
          </a>
        </p>
        <TrustBar items={HUB.trust} />
      </Hero>
      <DoorSwitcher current="/individuals" />

      <Section narrow>
        <Eyebrow>{HUB.argumentEyebrow}</Eyebrow>
        <Title>{HUB.argumentTitle}</Title>
        {HUB.argument.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
      </Section>

      <Section id="routes">
        <Eyebrow>{HUB.doorsEyebrow}</Eyebrow>
        <Title>{doorsTitle}</Title>
        <div className="ol-grid">
          {doors.map((door) => (
            <Link key={door.href} href={door.href} className="ol-card ol-door">
              <h3>{door.title}</h3>
              <p>{door.body}</p>
              <span className="ol-btn ol-btn--text">{door.cta}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section surface="dark" narrow>
        <Eyebrow>{HUB.lineEyebrow}</Eyebrow>
        <Title>{HUB.lineTitle}</Title>
        {HUB.lineBody.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
      </Section>

      <Section>
        <Eyebrow>{HUB.methodEyebrow}</Eyebrow>
        <Title>{HUB.methodTitle}</Title>
        <div className="ol-grid">
          {HUB.method.map((step) => (
            <article key={step.title} className="ol-card">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="app">
        <Eyebrow>{HUB.levelsEyebrow}</Eyebrow>
        <Title>{HUB.levelsTitle}</Title>
        <div className="ol-levels">
          {HUB.levels.map((level) => (
            <article key={level.title} className="ol-card ol-level">
              <h3>{level.title}</h3>
              <p>{level.body}</p>
            </article>
          ))}
        </div>
        <p className="ol-muted" style={{ marginTop: "var(--s3)" }}>
          {HUB.levelsNote}
        </p>
      </Section>

      <CtaBand
        title={HUB.closeTitle}
        standfirst={HUB.closeStandfirst}
        href={contactHref("individual-intake")}
        label={HUB.primaryCta}
      />
    </>
  );
}
