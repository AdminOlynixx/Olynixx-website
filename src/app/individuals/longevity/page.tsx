import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { notFound } from "next/navigation";
import { LONGEVITY as COPY, HUB } from "@/content/individuals";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { publishBest, publishDc, publishLongevity } from "@/lib/site-config";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { CardGrid } from "@/components/sections/CardGrid";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { IndividualRouteSwitcher } from "@/components/sections/IndividualRouteSwitcher";
import { LayerStack } from "@/components/sections/LayerStack";
import { LevelLadder } from "@/components/sections/LevelLadder";

export const metadata: Metadata = withSocial({
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
}, "/individuals/longevity");

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/individuals", label: "Individuals" },
  { href: "/individuals/longevity", label: "Longevity" },
];

export default function LongevityPage() {
  if (!publishLongevity()) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(CRUMBS)) }} />
      <PageHero
        breadcrumb={CRUMBS}
        title={COPY.heroTitle}
        lead={COPY.standfirst}
        primary={{ href: contactHref("longevity", "longevity-hero"), label: COPY.primaryCta }}
      />
      <IndividualRouteSwitcher current="/individuals/longevity" />

      <Section theme="light" narrow title={COPY.problemEyebrow}>
        <Prose>
          {COPY.problem.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="dark" narrow title={COPY.clinicEyebrow}>
        <Prose theme="dark">
          {COPY.clinic.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="light" eyebrow={COPY.layersEyebrow} title={COPY.layersTitle}>
        <CardGrid items={COPY.layers} numbered />
        <LayerStack labels={COPY.layers.map((l) => l.title)} />
      </Section>

      <Section theme="dark" eyebrow={COPY.sensorEyebrow} title={COPY.sensorTitle}>
        <Prose theme="dark">
          <p>{COPY.sensorBody}</p>
          {publishDc() ? <p>{COPY.sensorDc}</p> : null}
        </Prose>
      </Section>

      <Section theme="light" narrow eyebrow={COPY.systemsEyebrow} title={COPY.systemsTitle}>
        <Prose>
          <p>{publishBest() ? COPY.systemsBodyBest : COPY.systemsBody}</p>
        </Prose>
        <Reveal className="mt-8">
          <Button href={contactHref("systems", "longevity-systems")} variant="secondary">
            {COPY.systemsCta}
          </Button>
        </Reveal>
      </Section>

      <Section theme="dark" eyebrow={COPY.ladderEyebrow} title={COPY.ladderTitle}>
        <Prose theme="dark">
          {COPY.ladder.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
        <div className="mt-12">
          <LevelLadder levels={HUB.levels} priceNote={HUB.levelsPriceNote} theme="dark" />
        </div>
      </Section>

      <CtaBand title={COPY.closeTitle} href={contactHref("longevity", "longevity-close")} label={COPY.primaryCta} />
    </>
  );
}
