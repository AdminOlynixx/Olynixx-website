import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { BookCover } from "@/components/sections/BookCover";
import { IsoShort } from "@/components/sections/IsoBlock";
import { JsonLd } from "@/components/sections/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ABOUT } from "@/content/about";
import { contactHref } from "@/lib/cta";
import { bookJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Twenty-two years of readiness testing | Olynixx" },
  description: ABOUT.heroLead,
};

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[bookJsonLd(), breadcrumbJsonLd(crumbs)]} />
      <PageHero eyebrow="About" title={ABOUT.heroTitle} lead={ABOUT.heroLead} breadcrumb={crumbs} />

      <Section theme="light" eyebrow="Field record" title={ABOUT.timelineTitle}>
        <AboutTimeline entries={ABOUT.timeline} />
      </Section>

      <Section theme="dark" narrow eyebrow="One functional status" title={ABOUT.methodTitle}>
        <Reveal stagger={0.1} className="space-y-5 text-cream/85">
          {ABOUT.methodBody.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Reveal>
      </Section>

      <Section theme="light" eyebrow="Three commitments" title={ABOUT.standTitle}>
        <CardGrid items={ABOUT.stand} numbered cols={3} />
      </Section>

      <Section theme="dark" id="book">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal stagger={0.1} className="space-y-5">
            <p className="eyebrow">In print</p>
            <h2 className="text-[clamp(1.8125rem,3.4vw,2.5rem)] leading-[1.1]">{ABOUT.bookTitle}</h2>
            <p className="max-w-[60ch] text-cream/85">{ABOUT.bookBody}</p>
            <div className="pt-3">
              <Button href={contactHref("chapter-download", "about-book")} variant="secondary">
                Request chapter one
              </Button>
            </div>
          </Reveal>
          <BookCover name={ABOUT.bookName} year={ABOUT.bookYear} />
        </div>
      </Section>

      <Section theme="light" narrow eyebrow="The team" title={ABOUT.behindTitle}>
        <p className="text-ink-muted">{ABOUT.behindBody}</p>
        {/* Founder line is a removable fragment. Do not add personal names until written clearance. */}
      </Section>

      <Section theme="light" narrow className="!pt-0">
        <IsoShort />
      </Section>

      <CtaBand title={ABOUT.cta} href={contactHref("individual-intake", "about-cta")} label={ABOUT.ctaButton} />
    </>
  );
}
