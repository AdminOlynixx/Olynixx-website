import Link from "next/link";
import type { Metadata } from "next";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { Lockup } from "@/components/brand/Lockup";
import { Spine } from "@/components/brand/Spine";
import { Divider } from "@/components/brand/Divider";
import { HOME } from "@/content/home";
import { contactHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: "Olynixx | Readiness + Recovery = Perform",
  description: HOME.promise,
};

export default function HomePage() {
  return (
    <>
      <Hero center>
        <Lockup product="master" layout="stacked" ground="dark" className="ol-hero-lockup" height={180} priority />
        <Spine ground="dark" width={720} />
        <h1 className="ol-visually-hidden">{HOME.spineAlt}</h1>
        <p className="ol-lead" style={{ marginTop: "var(--ol-sp-6)" }}>
          {HOME.promise}
        </p>
        <p className="ol-tagline">{HOME.proofLine}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("individual")}>
            {HOME.primaryCta}
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/corporates">
            {HOME.secondaryCta}
          </Link>
        </p>
      </Hero>

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

      <Section surface="dark" narrow>
        <div className="ol-center">
          <Eyebrow>Capacity, not history</Eyebrow>
          <Title>{HOME.monitoringTitle}</Title>
          <Lead>{HOME.monitoringBody}</Lead>
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
        <Divider />
        <div className="ol-center ol-measure" style={{ marginInline: "auto" }}>
          <Eyebrow>The book</Eyebrow>
          <Title>{HOME.bookTitle}</Title>
          <Lead>{HOME.bookBody}</Lead>
          <Link className="ol-btn ol-btn--text" href="/about#book">
            Read the argument
          </Link>
        </div>
      </Section>

      <CtaBand title={HOME.closing} href={contactHref("individual")} label={HOME.primaryCta} />
    </>
  );
}
