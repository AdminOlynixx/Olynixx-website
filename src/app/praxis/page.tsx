import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { PRAXIS } from "@/content/praxis";
import { contactHref } from "@/lib/cta";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { publishBest } from "@/lib/site-config";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { CardGrid } from "@/components/sections/CardGrid";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { PraxisCourseFacts } from "@/components/sections/PraxisCourseFacts";
import { ScrubSteps } from "@/components/sections/ScrubSteps";

export const metadata: Metadata = withSocial({
  title: { absolute: "Olynixx Praxis: CPD and certification for UAE health professionals" },
  description: "Continuing education for UAE trainers, health coaches and nutritionists. Learn readiness testing, earn your certificate, deliver it.",
}, "/praxis");

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/praxis", label: "Praxis" },
];

export default function PraxisPage() {
  const hasFacts = Object.values(PRAXIS.facts).some((v) => v.trim().length > 0);
  const learn = [...PRAXIS.learn, ...(publishBest() ? [PRAXIS.learnBest] : [])];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(CRUMBS)) }} />
      <PageHero breadcrumb={CRUMBS} title={PRAXIS.heroTitle} lead={PRAXIS.heroLead}>
        <div className="mt-12 flex flex-col items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/olynixx-praxis-lockup-on-dark.svg" alt="Olynixx Praxis" height={96} className="h-20 w-auto max-w-full md:h-24" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/olynixx-praxis-strapline-on-dark.svg"
            alt="Learn + Certify + Deploy"
            width={420}
            height={48}
            className="h-auto w-[min(420px,100%)]"
          />
        </div>
      </PageHero>

      <Section theme="light" narrow eyebrow="The clock" title={PRAXIS.renewalTitle}>
        <Prose>
          <p>{PRAXIS.renewalBody}</p>
        </Prose>
      </Section>

      <Section theme="dark" eyebrow="The outcome" title={PRAXIS.walkAwayTitle}>
        <CardGrid theme="dark" numbered items={PRAXIS.walkAway.map((t) => ({ title: t }))} />
      </Section>

      <Section theme="light" eyebrow="The craft" title={PRAXIS.learnTitle}>
        <CardGrid cols={2} numbered items={learn.map((t) => ({ title: t }))} />
      </Section>

      <Section theme="dark" narrow eyebrow="UAE first" title={PRAXIS.whoTitle}>
        <Prose theme="dark">
          <p>{PRAXIS.whoBody}</p>
        </Prose>
      </Section>

      <Section theme="light" narrow eyebrow="Why Praxis" title={PRAXIS.whyTitle}>
        <Prose>
          <p>{PRAXIS.whyBody}</p>
        </Prose>
      </Section>

      <ProofStrip items={PRAXIS.proof} />

      {hasFacts ? (
        <Section theme="light" narrow eyebrow={PRAXIS.factsEyebrow} title={PRAXIS.factsTitle}>
          <PraxisCourseFacts facts={PRAXIS.facts} />
        </Section>
      ) : null}

      <Section theme="dark" eyebrow="Four steps" title={PRAXIS.pathwayTitle}>
        <ScrubSteps
          theme="dark"
          steps={PRAXIS.pathway.map((s) => ({ label: `Step ${s.step}`, title: s.title, body: s.body }))}
        />
      </Section>

      <CtaBand title={PRAXIS.cta} href={contactHref("praxis-certification", "praxis-close")} label={PRAXIS.ctaButton} />
    </>
  );
}
