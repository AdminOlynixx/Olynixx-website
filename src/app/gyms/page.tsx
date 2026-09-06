import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { TrustBar } from "@/components/site/IsoBlock";
import { ReadinessHub } from "@/components/site/ReadinessHub";
import { GYMS } from "@/content/gyms";
import { contactHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: { absolute: GYMS.metaTitle },
  description: GYMS.metaDescription,
};

export default function GymsPage() {
  return (
    <>
      <Hero>
        <Eyebrow>{GYMS.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{GYMS.heroTitle}</h1>
        <p className="ol-lead">{GYMS.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("club-licence")}>
            {GYMS.primaryCta}
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/praxis">
            {GYMS.secondaryCta}
          </Link>
        </p>
        <TrustBar items={GYMS.trust} />
      </Hero>

      <nav className="ol-switcher" aria-label="Gyms or spas">
        <a href="#gyms-track">{GYMS.selectorGyms}</a>
        <a href="#spa-track">{GYMS.selectorSpas}</a>
      </nav>

      <Section id="gyms-track" narrow>
        <Eyebrow>{GYMS.safetyEyebrow}</Eyebrow>
        <Title>{GYMS.safetyTitle}</Title>
        {GYMS.safety.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
        <p className="ol-small ol-muted">{GYMS.safetyNote}</p>
      </Section>

      <Section>
        <Eyebrow>{GYMS.personalEyebrow}</Eyebrow>
        <Title>{GYMS.personalTitle}</Title>
        <Lead>{GYMS.personal}</Lead>
        <Lead>{GYMS.personalClose}</Lead>
        <div className="ol-grid">
          {GYMS.models.map((model) => (
            <article key={model.title} className="ol-card">
              <h3>{model.title}</h3>
              <p>{model.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>{GYMS.recoveryEyebrow}</Eyebrow>
        <Title>{GYMS.recoveryTitle}</Title>
        {GYMS.recovery.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
        <div className="ol-grid">
          {GYMS.steered.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="spa-track">
        <Eyebrow>{GYMS.spaEyebrow}</Eyebrow>
        <Title>{GYMS.spaTitle}</Title>
        <Lead>{GYMS.spa}</Lead>
        <div className="ol-grid">
          {GYMS.spaCards.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="licence" surface="app">
        <Eyebrow>{GYMS.licenceEyebrow}</Eyebrow>
        <Title>{GYMS.licenceTitle}</Title>
        <div className="ol-grid">
          {GYMS.licence.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("club-licence")}>
            {GYMS.licenceCta}
          </Link>
        </p>
      </Section>

      <Section>
        <ReadinessHub />
      </Section>

      <Section narrow>
        <Eyebrow>{GYMS.coachesEyebrow}</Eyebrow>
        <Title>{GYMS.coachesTitle}</Title>
        <Lead>{GYMS.coaches}</Lead>
        <Lead>{GYMS.coachesClose}</Lead>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--secondary" href={contactHref("club-licence")}>
            {GYMS.networkCta}
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/praxis">
            {GYMS.praxisCta}
          </Link>
        </p>
      </Section>

      <Section>
        <Eyebrow>{GYMS.firstClubEyebrow}</Eyebrow>
        <Title>{GYMS.firstClubTitle}</Title>
        <Lead>{GYMS.firstClub}</Lead>
      </Section>

      <CtaBand
        title={GYMS.closeTitle}
        href={contactHref("club-licence")}
        label={GYMS.primaryCta}
        secondaryHref="/praxis"
        secondaryLabel={GYMS.closeSecondary}
      />
    </>
  );
}
