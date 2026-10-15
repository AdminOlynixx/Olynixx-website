import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { notFound } from "next/navigation";
import { contactHref } from "@/lib/cta";
import { publishBest, publishDc, publishSean } from "@/lib/site-config";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { ReadinessGauge } from "@/components/sections/ReadinessDiagram";

export const metadata: Metadata = withSocial({
  title: { absolute: "Sean Garnier × Olynixx | Readiness Ambassador" },
  description: "Sean Garnier, world freestyle football champion, is the Olynixx Readiness Ambassador.",
}, "/sean");

export default function SeanPage() {
  if (!publishSean()) notFound();

  return (
    <>
      <PageHero
        eyebrow="Sean Garnier × Olynixx"
        title="Readiness Ambassador of the Gulf."
        lead="The full Olynixx system in one body: complete physiological testing, a daily nervous-system read, guided recovery technology, altitude blocks. His real data as the story. Recover like a world champion. Measured."
        primary={{ href: contactHref("sean", "sean-hero"), label: "Train on Sean's protocols" }}
        secondary={{ href: contactHref("sean", "sean-measured"), label: "Get measured" }}
      />

      <Section theme="light" narrow eyebrow="The machine behind him" title="Four technologies, one system.">
        <Prose>
          <p>
            MS Fit analysis (the baseline, mapped) · the Olynixx Sensor (his morning number) · {publishBest() ? "B-E-St microcurrent recovery" : "microcurrent recovery"} (travels with him) · Oxyterra altitude blocks (twice a year). No one else in the region doses training, recovery and altitude off daily physiological data.
          </p>
          {publishDc() ? (
            <p className="text-sm">Daily nervous-system read includes DC potential, as exclusive agent for the region.</p>
          ) : null}
        </Prose>
      </Section>

      <Section
        theme="dark"
        eyebrow="Follow the numbers"
        title="The morning number. The recovery session. The altitude diary."
        lead="His data writes the story. Follow it, then train on the same protocols."
      >
        <ReadinessGauge label="THE MORNING NUMBER" />
      </Section>

      <CtaBand
        title="Train on Sean's protocols"
        href={contactHref("sean", "sean-close")}
        label="Train on Sean's protocols"
        secondary={{ href: contactHref("sean", "sean-close-measure"), label: "Get measured" }}
      />
    </>
  );
}
