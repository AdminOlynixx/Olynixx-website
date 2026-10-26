import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { SPORT_ATHLETE as COPY } from "@/content/individuals";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { CardGrid } from "@/components/sections/CardGrid";
import { IndividualRouteSwitcher } from "@/components/sections/IndividualRouteSwitcher";
import { ReadinessTrace } from "@/components/sections/ReadinessTrace";
import { ScrubSteps } from "@/components/sections/ScrubSteps";

export const metadata: Metadata = withSocial({
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
}, "/individuals/sport-athlete");

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/individuals", label: "Individuals" },
  { href: "/individuals/sport-athlete", label: "Sport athlete" },
];

export default function SportAthletePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(CRUMBS)) }} />
      <PageHero
        breadcrumb={CRUMBS}
        eyebrow={COPY.eyebrow}
        title={COPY.heroTitle}
        lead={COPY.standfirst}
        primary={{ href: contactHref("sport-athlete", "sport-athlete-hero"), label: COPY.primaryCta }}
        secondary={{ href: "/technology", label: COPY.secondaryCta }}
        trust={COPY.trust}
      />
      <IndividualRouteSwitcher current="/individuals/sport-athlete" />

      <Section theme="light" eyebrow={COPY.gapEyebrow} title={COPY.gapTitle}>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Prose>
            {COPY.gap.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </Prose>
          <ReadinessTrace />
        </div>
      </Section>

      <Section theme="dark" eyebrow={COPY.measureEyebrow} title={COPY.measureTitle}>
        <CardGrid theme="dark" cols={2} numbered items={COPY.measure} />
      </Section>

      <Section theme="light" narrow eyebrow={COPY.wadaEyebrow} title={COPY.wadaTitle}>
        <Prose>
          <p>{COPY.wada}</p>
        </Prose>
      </Section>

      <Section theme="light" eyebrow={COPY.runEyebrow} title={COPY.runTitle} className="border-t border-rule">
        <ScrubSteps
          steps={COPY.run.map((p) => {
            const m = p.match(/^(Level (?:I{1,3}))\b\s*/);
            return m ? { label: m[1], body: p.slice(m[0].length) } : { label: "", body: p };
          })}
        />
        <div className="mt-14">
          <Prose>
            <p>{COPY.runNote}</p>
          </Prose>
        </div>
      </Section>

      <CtaBand
        title={COPY.closeTitle}
        href={contactHref("sport-athlete", "sport-athlete-close")}
        label={COPY.primaryCta}
      />
    </>
  );
}
