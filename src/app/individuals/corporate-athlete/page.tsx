import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { CORPORATE_ATHLETE as COPY } from "@/content/individuals";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { IndividualRouteSwitcher } from "@/components/sections/IndividualRouteSwitcher";
import { ReadinessDiagram } from "@/components/sections/ReadinessDiagram";
import { ScrubSteps } from "@/components/sections/ScrubSteps";

export const metadata: Metadata = withSocial({
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
}, "/individuals/corporate-athlete");

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/individuals", label: "Individuals" },
  { href: "/individuals/corporate-athlete", label: "Corporate athlete" },
];

export default function CorporateAthletePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(CRUMBS)) }} />
      <PageHero
        breadcrumb={CRUMBS}
        eyebrow={COPY.eyebrow}
        title={COPY.heroTitle}
        lead={COPY.standfirst}
        primary={{ href: contactHref("corporate-athlete", "corporate-athlete-hero"), label: COPY.primaryCta }}
        secondary={{ href: "#measure", label: COPY.secondaryCta }}
        trust={COPY.trust}
      />
      <IndividualRouteSwitcher current="/individuals/corporate-athlete" />

      <Section theme="light" narrow eyebrow={COPY.loadEyebrow} title={COPY.loadTitle}>
        <Prose>
          {COPY.load.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="dark" id="measure" eyebrow={COPY.readEyebrow} title={COPY.readTitle}>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Prose theme="dark">
            {COPY.read.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </Prose>
          <ReadinessDiagram />
        </div>
      </Section>

      <Section theme="light" eyebrow={COPY.runEyebrow} title={COPY.runTitle}>
        <ScrubSteps
          steps={COPY.run.map((item, i) => {
            const cut = item.indexOf(". ");
            return cut === -1
              ? { label: `0${i + 1}`, body: item }
              : { label: `0${i + 1}`, title: item.slice(0, cut), body: item.slice(cut + 2) };
          })}
        />
        <div className="mt-14">
          <Prose>
            <p>{COPY.runNote}</p>
          </Prose>
        </div>
      </Section>

      <Section theme="dark" narrow eyebrow={COPY.privacyEyebrow} title={COPY.privacyTitle}>
        <Prose theme="dark">
          <p>{COPY.privacy}</p>
        </Prose>
      </Section>

      <Section theme="light" narrow eyebrow={COPY.execEyebrow} title={COPY.execTitle}>
        <Prose>
          {COPY.exec.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <CtaBand
        title={COPY.closeTitle}
        href={contactHref("corporate-athlete", "corporate-athlete-close")}
        label={COPY.primaryCta}
        secondary={{ href: "/corporates", label: COPY.corpCta }}
      />
    </>
  );
}
