import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { PhotoSlot } from "@/components/sections/PhotoSlot";
import { IsoShort } from "@/components/sections/IsoBlock";
import { JsonLd } from "@/components/sections/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ABOUT } from "@/content/about";
import { FOUNDER_PHOTOS, SITE_PHOTOS } from "@/content/photos";
import { contactHref } from "@/lib/cta";
import { bookJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = withSocial({
  title: { absolute: "Twenty-two years of readiness testing | Olynixx" },
  description: "22 years of readiness testing, from elite sport and special forces to boardrooms. One method, now running across the UAE.",
}, "/about");

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

      <Section theme="dark" narrow eyebrow="One clear status" title={ABOUT.methodTitle}>
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
            <p className="font-display text-xl italic text-gold-dark">{ABOUT.bookAuthorLine}</p>
            <p className="max-w-[60ch] text-cream/85">{ABOUT.bookBody}</p>
            <div className="pt-3">
              <Button href={contactHref("chapter-download", "about-book")} variant="secondary">
                Request chapter one
              </Button>
            </div>
          </Reveal>
          <div className="space-y-8">
            <PhotoSlot photo={SITE_PHOTOS.book} sizes="(min-width: 768px) 380px, 90vw" className="mx-auto max-w-[380px]" />
            <figure className="mx-auto max-w-[300px]">
              <Image
                src={FOUNDER_PHOTOS.headshot.src}
                alt={FOUNDER_PHOTOS.headshot.alt}
                width={FOUNDER_PHOTOS.headshot.width}
                height={FOUNDER_PHOTOS.headshot.height}
                sizes="300px"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-[50%_25%]"
              />
            </figure>
          </div>
        </div>
      </Section>

      <Section theme="light" narrow eyebrow="The team" title={ABOUT.behindTitle}>
        <p className="text-ink-muted">{ABOUT.behindBody}</p>
      </Section>

      <Section theme="light" narrow className="!pt-0">
        <IsoShort />
      </Section>

      <CtaBand title={ABOUT.cta} href={contactHref("individual-intake", "about-cta")} label={ABOUT.ctaButton} />
    </>
  );
}
