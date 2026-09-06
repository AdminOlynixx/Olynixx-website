import Link from "next/link";
import type { Metadata } from "next";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { Lockup } from "@/components/brand/Lockup";
import { Spine } from "@/components/brand/Spine";
import { Divider } from "@/components/brand/Divider";
import { HOME } from "@/content/home";
import { contactHref } from "@/lib/cta";
import { JsonLd } from "@/components/site/JsonLd";
import { faqJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Workforce readiness testing in the UAE | Olynixx" },
  description: HOME.standfirst,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Hero>
        <Lockup product="master" layout="horizontal" ground="dark" height={48} priority />
        <div className="ol-hero-spine" aria-hidden>
          <Spine ground="dark" width={420} />
        </div>
        <p className="ol-visually-hidden">{HOME.spineAlt}</p>
        <h1 className="ol-hero-title">{HOME.heroTitle}</h1>
        <p className="ol-lead">{HOME.standfirst}</p>
        <p className="ol-tagline ol-tight">{HOME.proofLine}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot")}>
            {HOME.primaryCta}
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/individuals">
            {HOME.secondaryCta}
          </Link>
        </p>
      </Hero>

      <Section narrow>
        <Eyebrow>{HOME.actuallyEyebrow}</Eyebrow>
        <Title>{HOME.actuallyTitle}</Title>
        <Lead>{HOME.actually}</Lead>
      </Section>

      <Section>
        <Eyebrow>{HOME.doorsEyebrow}</Eyebrow>
        <Title>{HOME.doorsIntro}</Title>
        <div className="ol-grid">
          {HOME.doors.map((door) => (
            <Link key={door.title} href={door.href} className="ol-card ol-door">
              <h3>{door.title}</h3>
              <p>{door.body}</p>
              <span className="ol-btn ol-btn--text">{door.title}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>{HOME.runningEyebrow}</Eyebrow>
        <Title>{HOME.runningTitle}</Title>
        <div className="ol-grid">
          {HOME.running.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="ol-proof" role="list">
          {HOME.proof.map((item) => (
            <div key={item.label} className="ol-proof__item" role="listitem">
              <p className="ol-proof__value">{item.value}</p>
              <p className="ol-proof__label">{item.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="dark" narrow>
        <Eyebrow>Capacity, not history</Eyebrow>
        <Title>{HOME.monitoringTitle}</Title>
        <Lead>{HOME.monitoringBody}</Lead>
      </Section>

      <Section>
        <Divider />
        <div className="ol-measure">
          <Eyebrow>The book</Eyebrow>
          <Title>{HOME.bookTitle}</Title>
          <Lead>{HOME.bookBody}</Lead>
          <Link className="ol-btn ol-btn--text" href="/about#book">
            Read the argument
          </Link>
        </div>
      </Section>

      <CtaBand title={HOME.closing} href={contactHref("corporate-pilot")} label={HOME.primaryCta} />
    </>
  );
}
