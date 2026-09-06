import type { Metadata } from "next";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { IsoShort } from "@/components/site/IsoBlock";
import { TECHNOLOGY } from "@/content/technology";
import { NON_MEDICAL_STATEMENT } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: { absolute: TECHNOLOGY.metaTitle },
  description: TECHNOLOGY.metaDescription,
};

export default function TechnologyPage() {
  return (
    <>
      <Hero>
        <Eyebrow>{TECHNOLOGY.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{TECHNOLOGY.heroTitle}</h1>
        <p className="ol-lead">{TECHNOLOGY.standfirst}</p>
      </Hero>

      <Section narrow>
        <Eyebrow>{TECHNOLOGY.reservedEyebrow}</Eyebrow>
        <Title>{TECHNOLOGY.reservedTitle}</Title>
        <Lead>{TECHNOLOGY.reserved}</Lead>
      </Section>

      <Section narrow>
        <Eyebrow>{TECHNOLOGY.measureEyebrow}</Eyebrow>
        <Title>{TECHNOLOGY.measureTitle}</Title>
        {TECHNOLOGY.measure.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section narrow>
        <Eyebrow>{TECHNOLOGY.principleEyebrow}</Eyebrow>
        <Title>{TECHNOLOGY.principleTitle}</Title>
        <Lead>{TECHNOLOGY.principle}</Lead>
      </Section>

      <Section>
        <div className="ol-device-grid">
          {TECHNOLOGY.devices.map((device) => (
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
