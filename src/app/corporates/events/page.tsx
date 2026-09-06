import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { SubNav } from "@/components/site/SubNav";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EVENTS } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: { absolute: "Event testing kiosk and keynote | Olynixx" },
  description: EVENTS.heroLead,
};

export default function EventsPage() {
  return (
    <>
      <Hero>
        <Eyebrow>Events & keynotes</Eyebrow>
        <h1 className="ol-hero-title">{EVENTS.heroTitle}</h1>
        <p className="ol-lead">{EVENTS.heroLead}</p>
      </Hero>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/corporates", label: "Corporates" },
          { href: "/corporates/events", label: "Events & keynotes" },
        ]}
      />
      <SubNav items={CORP_SUBNAV} current="/corporates/events" />

      <Section narrow>
        <Eyebrow>On the floor</Eyebrow>
        <Title>{EVENTS.kioskTitle}</Title>
        <Lead>{EVENTS.kioskBody}</Lead>
      </Section>

      <Section surface="dark" narrow>
        <Eyebrow>The talk</Eyebrow>
        <Title>{EVENTS.keynoteTitle}</Title>
        {EVENTS.keynoteBody.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
      </Section>

      <Section narrow>
        <Eyebrow>Teams</Eyebrow>
        <Title>{EVENTS.workshopsTitle}</Title>
        <Lead>{EVENTS.workshopsBody}</Lead>
      </Section>

      <Section>
        <Eyebrow>{EVENTS.practicalEyebrow}</Eyebrow>
        <Title>{EVENTS.practicalTitle}</Title>
        <div className="ol-grid" style={{ marginTop: "var(--ol-sp-6)" }}>
          {EVENTS.practical.map((item) => (
            <article key={item.title} className="ol-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="light">
        <Eyebrow>What follows</Eyebrow>
        <Title>{EVENTS.programmeTitle}</Title>
        <Lead>{EVENTS.programmeBody}</Lead>
        <div className="ol-offer" style={{ marginTop: "var(--ol-sp-7)" }}>
          <p className="ol-eyebrow">{EVENTS.offerEyebrow}</p>
          <h3>{EVENTS.offerTitle}</h3>
          <p>{EVENTS.offerBody}</p>
          <p className="ol-tagline">{EVENTS.offerClose}</p>
        </div>
        <p className="ol-offer__note">{EVENTS.offerNote}</p>
      </Section>

      <section className="ol-section ol-dark">
        <div className="ol-container ol-cta-band">
          <h2>{EVENTS.cta}</h2>
          <div className="ol-actions">
            <Link className="ol-btn ol-btn--primary" href={contactHref("event")}>
              {EVENTS.ctaStation}
            </Link>
            <Link className="ol-btn ol-btn--secondary" href={contactHref("event")}>
              {EVENTS.ctaKeynote}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
