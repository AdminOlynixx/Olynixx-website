import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { EVERYDAY_HEALTH as COPY } from "@/content/individuals";
import { SITE_PHOTOS } from "@/content/photos";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PhotoSlot } from "@/components/sections/PhotoSlot";
import { ScrubSteps } from "@/components/sections/ScrubSteps";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = withSocial(
  {
    title: { absolute: COPY.metaTitle },
    description: COPY.metaDescription,
  },
  "/individuals/everyday-health",
);

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/individuals", label: "Individuals" },
  { href: "/individuals/everyday-health", label: "Everyday health" },
];

/** Third Individuals route, for non-athletes. Entry is Level I only; the main button goes to the free intake talk. */
export default function EverydayHealthPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(CRUMBS)) }} />
      <PageHero
        breadcrumb={CRUMBS}
        eyebrow={COPY.eyebrow}
        title={COPY.heroTitle}
        lead={COPY.intro}
        primary={{ href: contactHref("individual-intake", "everyday-health-hero"), label: COPY.primaryCta }}
      />

      <Section theme="light" title={COPY.isThisYouTitle}>
        <CardGrid items={COPY.isThisYou} cols={3} />
        <PhotoSlot photo={SITE_PHOTOS.everyday} className="mt-12 max-h-[480px]" />
      </Section>

      <Section theme="dark" title={COPY.howTitle}>
        <ScrubSteps
          theme="dark"
          steps={COPY.how.map((s, i) => ({ label: `0${i + 1}`, title: s.title, body: s.body }))}
        />
      </Section>

      <Section theme="light" narrow title={COPY.getTitle}>
        <Reveal as="ul" stagger={0.08} className="space-y-3 text-ink-muted">
          {COPY.get.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-gold" />
              {item}
            </li>
          ))}
        </Reveal>
        <Reveal stagger={0.1} className="mt-12 space-y-4 border-t border-rule pt-8">
          <p className="font-display text-2xl">{COPY.readinessLink}</p>
          <p className="text-sm text-ink-muted">{COPY.disclaimer}</p>
        </Reveal>
      </Section>

      <CtaBand
        title={COPY.heroTitle}
        href={contactHref("individual-intake", "everyday-health-close")}
        label={COPY.primaryCta}
      />
    </>
  );
}
