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
import { ProofStrip } from "@/components/site/ProofStrip";
import { faqJsonLd } from "@/lib/json-ld";
import { phaseShop, publishDc, publishLongevity, publishSean } from "@/lib/site-config";
import { shopHref } from "@/lib/shop";

export const metadata: Metadata = {
  title: { absolute: "Workforce readiness testing in the UAE | Olynixx" },
  description: HOME.standfirst,
};

export default function HomePage() {
  const doors = HOME.doors.map((door) =>
    door.href === "/individuals" && publishLongevity()
      ? { ...door, body: "Corporate athlete, sport athlete or longevity. A user guide to your body, built on your data." }
      : door,
  );
  const bookHref = phaseShop() ? shopHref("/shop/book", "home", "book") ?? "/about#book" : "/about#book";

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
          <Link className="ol-btn ol-btn--primary" href={contactHref("corporate-pilot", "home-hero")}>
            {HOME.primaryCta}
          </Link>
          <Link className="ol-btn ol-btn--secondary" href="/individuals">
            {HOME.secondaryCta}
          </Link>
        </p>
      </Hero>

      <Section className="ol-tight-section" id="offer">
        <Eyebrow>{HOME.offerEyebrow}</Eyebrow>
        <Title>{HOME.offerTitle}</Title>
        <Lead>{HOME.offerBody}</Lead>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("event", "home-25-test")}>
            {HOME.offerCta}
          </Link>
        </p>
      </Section>

      <Section narrow>
        <Eyebrow>{HOME.actuallyEyebrow}</Eyebrow>
        <Title>{HOME.actuallyTitle}</Title>
        <Lead>{HOME.actually}</Lead>
      </Section>

      <Section>
        <Eyebrow>{HOME.doorsEyebrow}</Eyebrow>
        <Title>{HOME.doorsIntro}</Title>
        <div className="ol-grid">
          {doors.map((door) => (
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
        <ProofStrip items={HOME.proof} />
      </Section>

      <Section narrow>
        <Eyebrow>{HOME.proofEyebrow}</Eyebrow>
        <Title>{HOME.proofTitle}</Title>
        <Lead>{HOME.proofBody}</Lead>
      </Section>

      {publishSean() ? (
        <Section surface="app">
          <div className="ol-sean-band">
            <div>
              <Eyebrow>{HOME.seanEyebrow}</Eyebrow>
              <Title>{HOME.seanTitle}</Title>
              <Lead>{HOME.seanBody}</Lead>
              <p className="ol-actions">
                <Link className="ol-btn ol-btn--primary" href="/sean">
                  {HOME.seanFollow}
                </Link>
                <Link className="ol-btn ol-btn--secondary" href={contactHref("sean", "home-ambassador")}>
                  {HOME.seanTrain}
                </Link>
              </p>
            </div>
          </div>
        </Section>
      ) : null}

      <Section surface="dark" narrow>
        <Eyebrow>Capacity, not history</Eyebrow>
        <Title>{HOME.monitoringTitle}</Title>
        <p className="ol-claim">{HOME.firstClaim}</p>
        <Lead>{HOME.monitoringBody}</Lead>
        <Lead>{publishDc() ? HOME.monitoringLineDc : HOME.monitoringLine}</Lead>
      </Section>

      <Section>
        <Divider />
        <div className="ol-measure">
          <Eyebrow>The book</Eyebrow>
          <Title>{HOME.bookTitle}</Title>
          <Lead>{HOME.bookBody}</Lead>
          <Link className="ol-btn ol-btn--text" href={bookHref}>
            Read the argument
          </Link>
        </div>
      </Section>

      <CtaBand title={HOME.closing} href={contactHref("corporate-pilot", "home-close")} label={HOME.primaryCta} />
    </>
  );
}
