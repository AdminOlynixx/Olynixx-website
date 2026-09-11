import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { IsoShort } from "@/components/site/IsoBlock";
import { TECHNOLOGY } from "@/content/technology";
import { NON_MEDICAL_STATEMENT } from "@/lib/legal-copy";
import { contactHref } from "@/lib/cta";
import { publishBest, publishDc } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: TECHNOLOGY.metaTitle },
  description: TECHNOLOGY.metaDescription,
};

export default function TechnologyPage() {
  const msFit = TECHNOLOGY.devices[0];
  const oxyterra = TECHNOLOGY.devices[1];
  const rest = TECHNOLOGY.devices.slice(2).filter((device) => !(publishBest() && device.name === "Microcurrent"));

  return (
    <>
      <Hero>
        <Eyebrow>{TECHNOLOGY.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{TECHNOLOGY.heroTitle}</h1>
        <p className="ol-lead">{TECHNOLOGY.standfirst}</p>
      </Hero>

      <Section narrow>
        <Eyebrow>{TECHNOLOGY.measureEyebrow}</Eyebrow>
        <Title>{TECHNOLOGY.measureTitle}</Title>
        {TECHNOLOGY.measure.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section>
        <article className="ol-device ol-card">
          <p className="ol-status">{msFit.status}</p>
          <h3>{msFit.name}</h3>
          <p>{msFit.role}</p>
          <ul>
            {msFit.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="ol-small ol-muted">{msFit.where}</p>
        </article>
      </Section>

      <Section>
        <article className="ol-device ol-card">
          <p className="ol-status">{TECHNOLOGY.sensorStatus}</p>
          <h3>{TECHNOLOGY.sensorName}</h3>
          <Lead>{TECHNOLOGY.sensorBody}</Lead>
        </article>
        {publishDc() ? (
          <div className="ol-measure" style={{ marginBlockStart: "var(--s4)" }}>
            <Title>{TECHNOLOGY.firstGulfTitle}</Title>
            <Lead>{TECHNOLOGY.firstGulfBody}</Lead>
            {TECHNOLOGY.poweredBy ? <p className="ol-small ol-muted">{TECHNOLOGY.poweredBy}</p> : null}
          </div>
        ) : null}
      </Section>

      <Section>
        <article className="ol-device ol-card">
          <p className="ol-status">{oxyterra.status}</p>
          <h3>{oxyterra.name}</h3>
          <p>{oxyterra.role}</p>
          <ul>
            {oxyterra.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="ol-small ol-muted">{oxyterra.where}</p>
        </article>
      </Section>

      {publishBest() ? (
        <Section>
          <article className="ol-device ol-card">
            <p className="ol-status">{TECHNOLOGY.bestStatus}</p>
            <h3>{TECHNOLOGY.bestName}</h3>
            <Lead>{TECHNOLOGY.bestBody}</Lead>
          </article>
        </Section>
      ) : null}

      <Section>
        <div className="ol-device-grid">
          {rest.map((device) => (
            <article key={device.name} className="ol-device ol-card">
              <p className="ol-status">{device.status}</p>
              <h3>{device.name}</h3>
              <p>{device.role}</p>
              <ul>
                {device.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="ol-small ol-muted">{device.where}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section narrow>
        <Eyebrow>{TECHNOLOGY.principleEyebrow}</Eyebrow>
        <Title>{TECHNOLOGY.principleTitle}</Title>
        <Lead>{TECHNOLOGY.principle}</Lead>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("systems", "tech-moat")}>
            {TECHNOLOGY.systemsCta}
          </Link>
        </p>
      </Section>

      <Section surface="app" narrow>
        <Title>{TECHNOLOGY.ownTitle}</Title>
        <Lead>{TECHNOLOGY.ownBody}</Lead>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("systems", "tech-own")}>
            {TECHNOLOGY.systemsCta}
          </Link>
        </p>
      </Section>

      <Section surface="app" narrow>
        <Eyebrow>{TECHNOLOGY.dataEyebrow}</Eyebrow>
        <Title>{TECHNOLOGY.dataTitle}</Title>
        <Lead>{TECHNOLOGY.data}</Lead>
      </Section>

      <Section narrow>
        <Eyebrow>{TECHNOLOGY.dashEyebrow}</Eyebrow>
        <Title>{TECHNOLOGY.dashTitle}</Title>
        {TECHNOLOGY.dash.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
      </Section>

      <Section narrow>
        <IsoShort />
      </Section>

      <Section>
        <p className="ol-statement">{NON_MEDICAL_STATEMENT}</p>
      </Section>
    </>
  );
}
