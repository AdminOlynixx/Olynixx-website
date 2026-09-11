import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { TrustBar } from "@/components/site/IsoBlock";
import { DoorSwitcher } from "@/components/site/DoorSwitcher";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CORPORATE_ATHLETE as COPY } from "@/content/individuals";
import { contactHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
};

export default function CorporateAthletePage() {
  return (
    <>
      <Hero>
        <Eyebrow>{COPY.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{COPY.heroTitle}</h1>
        <p className="ol-lead">{COPY.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-athlete", "corporate-athlete-hero")}>
            {COPY.primaryCta}
          </Link>
          <a className="ol-btn ol-btn--secondary" href="#measure">
            {COPY.secondaryCta}
          </a>
        </p>
        <TrustBar items={COPY.trust} />
      </Hero>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/individuals", label: "Individuals" },
          { href: "/individuals/corporate-athlete", label: "Corporate athlete" },
        ]}
      />
      <DoorSwitcher current="/individuals/corporate-athlete" />

      <Section narrow>
        <Eyebrow>{COPY.loadEyebrow}</Eyebrow>
        <Title>{COPY.loadTitle}</Title>
        {COPY.load.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section id="measure" surface="dark" narrow>
        <Eyebrow>{COPY.readEyebrow}</Eyebrow>
        <Title>{COPY.readTitle}</Title>
        {COPY.read.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <Section>
        <Eyebrow>{COPY.runEyebrow}</Eyebrow>
        <Title>{COPY.runTitle}</Title>
        <div className="ol-grid">
          {COPY.run.map((item) => (
            <article key={item} className="ol-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
        <Lead>{COPY.runNote}</Lead>
      </Section>

      <Section surface="app" narrow>
        <Eyebrow>{COPY.privacyEyebrow}</Eyebrow>
        <Title>{COPY.privacyTitle}</Title>
        <Lead>{COPY.privacy}</Lead>
      </Section>

      <Section narrow>
        <Eyebrow>{COPY.execEyebrow}</Eyebrow>
        <Title>{COPY.execTitle}</Title>
        {COPY.exec.map((para) => (
          <Lead key={para.slice(0, 28)}>{para}</Lead>
        ))}
      </Section>

      <section className="ol-section ol-dark">
        <div className="ol-container ol-cta-band">
          <h2>{COPY.closeTitle}</h2>
          <div className="ol-actions">
            <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-athlete", "corporate-athlete-close")}>
              {COPY.primaryCta}
            </Link>
            <Link className="ol-btn ol-btn--secondary" href="/corporates">
              {COPY.corpCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
