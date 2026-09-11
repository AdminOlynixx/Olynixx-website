import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { TrustBar } from "@/components/site/IsoBlock";
import { DoorSwitcher } from "@/components/site/DoorSwitcher";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SPORT_ATHLETE as COPY } from "@/content/individuals";
import { contactHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
};

export default function SportAthletePage() {
  return (
    <>
      <Hero>
        <Eyebrow>{COPY.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{COPY.heroTitle}</h1>
        <p className="ol-lead">{COPY.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("sport-athlete", "sport-athlete-hero")}>
            {COPY.primaryCta}
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/technology">
            {COPY.secondaryCta}
          </Link>
        </p>
        <TrustBar items={COPY.trust} />
      </Hero>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/individuals", label: "Individuals" },
          { href: "/individuals/sport-athlete", label: "Sport athlete" },
        ]}
      />
      <DoorSwitcher current="/individuals/sport-athlete" />

      <Section narrow>
        <Eyebrow>{COPY.gapEyebrow}</Eyebrow>
        <Title>{COPY.gapTitle}</Title>
        {COPY.gap.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section surface="dark">
        <Eyebrow>{COPY.measureEyebrow}</Eyebrow>
        <Title>{COPY.measureTitle}</Title>
        <div className="ol-grid">
          {COPY.measure.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section narrow>
        <Eyebrow>{COPY.wadaEyebrow}</Eyebrow>
        <Title>{COPY.wadaTitle}</Title>
        <Lead>{COPY.wada}</Lead>
      </Section>

      <Section surface="app">
        <Eyebrow>{COPY.runEyebrow}</Eyebrow>
        <Title>{COPY.runTitle}</Title>
        {COPY.run.map((para) => (
          <Lead key={para.slice(0, 20)}>{para}</Lead>
        ))}
        <Lead>{COPY.runNote}</Lead>
      </Section>

      <section className="ol-section ol-dark">
        <div className="ol-container ol-cta-band">
          <h2>{COPY.closeTitle}</h2>
          <div className="ol-actions">
            <Link className="ol-btn ol-btn--primary" href={contactHref("sport-athlete", "sport-athlete-close")}>
              {COPY.primaryCta}
            </Link>
            <Link className="ol-btn ol-btn--secondary" href={contactHref("athlete-referral", "sport-athlete-club")}>
              {COPY.clubCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
