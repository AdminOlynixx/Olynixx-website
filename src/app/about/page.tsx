import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { ABOUT } from "@/content/about";
import { contactHref } from "@/lib/cta";
import { IsoShort } from "@/components/site/IsoBlock";
import { JsonLd } from "@/components/site/JsonLd";
import { bookJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Twenty-two years of readiness testing | Olynixx" },
  description: ABOUT.heroLead,
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={bookJsonLd()} />
      <Hero compact>
        <Eyebrow>About</Eyebrow>
        <h1 className="ol-hero-title">{ABOUT.heroTitle}</h1>
        <p className="ol-lead">{ABOUT.heroLead}</p>
      </Hero>

      <Section>
        <Eyebrow>Field record</Eyebrow>
        <Title>{ABOUT.timelineTitle}</Title>
        <div className="ol-timeline">
          {ABOUT.timeline.map((entry) => (
            <article key={entry.era} className="ol-timeline__item">
              <p className="ol-timeline__era">{entry.era}</p>
              <p>{entry.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="dark" narrow>
        <Eyebrow>One functional status</Eyebrow>
        <Title>{ABOUT.methodTitle}</Title>
        {ABOUT.methodBody.map((para) => (
          <Lead key={para.slice(0, 24)}>{para}</Lead>
        ))}
      </Section>

      <Section>
        <Eyebrow>Three commitments</Eyebrow>
        <Title>{ABOUT.standTitle}</Title>
        <div className="ol-about-stand">
          {ABOUT.stand.map((item, index) => (
            <article key={item.title} className="ol-about-stand__item">
              <p className="ol-eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="book">
        <div className="ol-about-book">
          <div>
            <Eyebrow>In print</Eyebrow>
            <Title>{ABOUT.bookTitle}</Title>
            <Lead>{ABOUT.bookBody}</Lead>
            <p className="ol-actions">
              <Link className="ol-btn ol-btn--secondary" href={contactHref("chapter-download", "about-book")}>
                Request chapter one
              </Link>
            </p>
          </div>
          <aside className="ol-about-cover" aria-label={`${ABOUT.bookName}, ${ABOUT.bookYear}`}>
            <p className="ol-eyebrow">{ABOUT.bookYear}</p>
            <p className="ol-about-cover__title">{ABOUT.bookName}</p>
          </aside>
        </div>
      </Section>

      <Section surface="dark" narrow>
        <Eyebrow>The team</Eyebrow>
        <Title>{ABOUT.behindTitle}</Title>
        <Lead>{ABOUT.behindBody}</Lead>
        {/* Founder line is a removable fragment. Do not add personal names until Louis supplies written clearance. */}
      </Section>

      <Section narrow>
        <IsoShort />
      </Section>

      <CtaBand title={ABOUT.cta} href={contactHref("individual-intake", "about-cta")} label={ABOUT.ctaButton} />
    </>
  );
}
