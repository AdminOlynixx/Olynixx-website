import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { DoorSwitcher } from "@/components/site/DoorSwitcher";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { LevelCards } from "@/components/site/LevelCards";
import { LONGEVITY as COPY } from "@/content/individuals";
import { contactHref } from "@/lib/cta";
import { publishBest, publishDc } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
};

export default function LongevityPage() {
  return (
    <>
      <Hero>
        <h1 className="ol-hero-title">{COPY.heroTitle}</h1>
        <p className="ol-lead">{COPY.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("longevity", "longevity-hero")}>
            {COPY.primaryCta}
          </Link>
        </p>
      </Hero>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/individuals", label: "Individuals" },
          { href: "/individuals/longevity", label: "Longevity" },
        ]}
      />
      <DoorSwitcher current="/individuals/longevity" />

      <Section narrow>
        <Title>{COPY.problemEyebrow}</Title>
        {COPY.problem.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section surface="dark" narrow>
        <Title>{COPY.clinicEyebrow}</Title>
        {COPY.clinic.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section>
        <Eyebrow>{COPY.layersEyebrow}</Eyebrow>
        <Title>{COPY.layersTitle}</Title>
        <div className="ol-grid">
          {COPY.layers.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>{COPY.sensorEyebrow}</Eyebrow>
        <Title>{COPY.sensorTitle}</Title>
        <Lead>{COPY.sensorBody}</Lead>
        {publishDc() ? <Lead>{COPY.sensorDc}</Lead> : null}
      </Section>

      <Section surface="app" narrow>
        <Eyebrow>{COPY.systemsEyebrow}</Eyebrow>
        <Title>{COPY.systemsTitle}</Title>
        <Lead>{publishBest() ? COPY.systemsBodyBest : COPY.systemsBody}</Lead>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--secondary" href={contactHref("systems", "longevity-systems")}>
            {COPY.systemsCta}
          </Link>
        </p>
      </Section>

      <Section>
        <Eyebrow>{COPY.ladderEyebrow}</Eyebrow>
        <Title>{COPY.ladderTitle}</Title>
        {COPY.ladder.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
        <div style={{ marginTop: "var(--s4)" }}>
          <LevelCards />
        </div>
      </Section>

      <CtaBand
        title={COPY.closeTitle}
        href={contactHref("longevity", "longevity-close")}
        label={COPY.primaryCta}
      />
    </>
  );
}
