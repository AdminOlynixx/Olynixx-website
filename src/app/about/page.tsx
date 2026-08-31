import type { Metadata } from "next";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { ABOUT } from "@/content/about";
import { contactHref } from "@/lib/cta";
import { IsoBlock } from "@/components/site/IsoBlock";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.heroLead,
};

export default function AboutPage() {
  return (
    <>
      <Hero center compact>
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
        <div className="ol-center">
          <Eyebrow>One functional status</Eyebrow>
          <Title>{ABOUT.methodTitle}</Title>
          {ABOUT.methodBody.map((para) => (
            <Lead key={para.slice(0, 24)}>{para}</Lead>
          ))}
        </div>
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
          </div>
          <aside className="ol-about-cover" aria-label={`${ABOUT.bookName}, ${ABOUT.bookYear}`}>
            <p className="ol-eyebrow">{ABOUT.bookYear}</p>
            <p className="ol-about-cover__title">{ABOUT.bookName}</p>
          </aside>
        </div>
      </Section>

      <Section surface="dark" narrow>
        <div className="ol-center">
          <Eyebrow>The team</Eyebrow>
          <Title>{ABOUT.behindTitle}</Title>
          <Lead>{ABOUT.behindBody}</Lead>
        </div>
        {/* Founder line is a removable fragment. Do not add personal names until Louis supplies written clearance. */}
      </Section>

      <Section narrow>
        <IsoBlock />
      </Section>

      <CtaBand title={ABOUT.cta} href={contactHref("individual")} label={ABOUT.ctaButton} />
    </>
  );
}
