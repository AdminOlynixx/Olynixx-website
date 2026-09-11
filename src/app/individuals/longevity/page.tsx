import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { TrustBar } from "@/components/site/IsoBlock";
import { DoorSwitcher } from "@/components/site/DoorSwitcher";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { HUB, LONGEVITY as COPY } from "@/content/individuals";
import { TECHNOLOGY } from "@/content/technology";
import { contactHref } from "@/lib/cta";
import { publishBest, publishDc, publishLongevity } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
};

export default function LongevityPage() {
  /* HOLD: Louis supplies copy by Friday 18 September. Do not invent. */
  if (!publishLongevity()) notFound();

  const daily = HUB.levels[1];

  return (
    <>
      <Hero>
        <Eyebrow>{COPY.eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{COPY.heroTitle}</h1>
        <p className="ol-lead">{COPY.standfirst}</p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("longevity", "longevity-hero")}>
            {COPY.primaryCta}
          </Link>
          <a className="ol-btn ol-btn--secondary" href="#method">
            {COPY.secondaryCta}
          </a>
        </p>
        <TrustBar items={COPY.trust} />
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
        <Eyebrow>{COPY.meanEyebrow}</Eyebrow>
        <Title>{COPY.meanTitle}</Title>
        {COPY.mean.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
      </Section>

      <Section surface="dark">
        <Eyebrow>{COPY.notEyebrow}</Eyebrow>
        <Title>{COPY.notTitle}</Title>
        <div className="ol-grid">
          {COPY.not.map((item) => (
            <article key={item} className="ol-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="method">
        <Eyebrow>{COPY.methodEyebrow}</Eyebrow>
        <Title>{COPY.methodTitle}</Title>
        <div className="ol-grid">
          {COPY.method.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>{TECHNOLOGY.sensorStatus}</Eyebrow>
        <Title>{TECHNOLOGY.sensorName}</Title>
        <Lead>{daily.body}</Lead>
        {publishDc() ? (
          <>
            <Title>{TECHNOLOGY.firstGulfTitle}</Title>
            <Lead>{TECHNOLOGY.firstGulfBody}</Lead>
          </>
        ) : null}
      </Section>

      <Section surface="app" narrow>
        <Title>{TECHNOLOGY.ownTitle}</Title>
        <Lead>{TECHNOLOGY.ownBody}</Lead>
        {publishBest() ? <Lead>{TECHNOLOGY.bestBody}</Lead> : null}
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--secondary" href={contactHref("systems", "longevity-systems")}>
            {TECHNOLOGY.systemsCta}
          </Link>
        </p>
      </Section>

      <Section surface="app" narrow>
        <Eyebrow>{COPY.timeEyebrow}</Eyebrow>
        <Title>{COPY.timeTitle}</Title>
        {COPY.time.map((para) => (
          <Lead key={para.slice(0, 20)}>{para}</Lead>
        ))}
        <p className="ol-tagline">{COPY.timeClose}</p>
      </Section>

      <CtaBand
        title={COPY.closeTitle}
        standfirst={COPY.closeStandfirst}
        href={contactHref("longevity", "longevity-close")}
        label={COPY.primaryCta}
      />
    </>
  );
}
