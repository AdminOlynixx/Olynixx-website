import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { contactHref } from "@/lib/cta";
import { publishBest, publishDc, publishSean } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Sean Garnier × Olynixx | Readiness Ambassador" },
  description: "Sean Garnier, world freestyle football champion, is the Olynixx Readiness Ambassador.",
};

export default function SeanPage() {
  if (!publishSean()) notFound();

  return (
    <>
      <Hero>
        <Eyebrow>Sean Garnier × Olynixx</Eyebrow>
        <h1 className="ol-hero-title">Readiness Ambassador of the Gulf.</h1>
        <p className="ol-lead">
          The full Olynixx system in one body: complete physiological testing, a daily nervous-system read, guided recovery technology, altitude blocks. His real data as the story. Recover like a world champion. Measured.
        </p>
        <p className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={contactHref("sean", "sean-hero")}>
            Train on Sean's protocols
          </Link>
          <Link className="ol-btn ol-btn--secondary" href={contactHref("sean", "sean-measured")}>
            Get measured
          </Link>
        </p>
      </Hero>

      <Section narrow>
        <Eyebrow>The machine behind him</Eyebrow>
        <Title>Four technologies, one system.</Title>
        <Lead>
          MS Fit analysis (the baseline, mapped) · the Olynixx Sensor (his morning number) · {publishBest() ? "B-E-St microcurrent recovery" : "microcurrent recovery"} (travels with him) · Oxyterra altitude blocks (twice a year). No one else in the region doses training, recovery and altitude off daily physiological data.
        </Lead>
        {publishDc() ? (
          <p className="ol-small ol-muted">Daily nervous-system read includes DC potential, as exclusive agent for the region.</p>
        ) : null}
      </Section>

      <Section surface="dark" narrow>
        <Eyebrow>Follow the numbers</Eyebrow>
        <Title>The morning number. The recovery session. The altitude diary.</Title>
        <Lead>His data writes the story. Follow it, then train on the same protocols.</Lead>
      </Section>

      <CtaBand
        title="Train on Sean's protocols"
        href={contactHref("sean", "sean-close")}
        label="Train on Sean's protocols"
        secondaryHref={contactHref("sean", "sean-close-measure")}
        secondaryLabel="Get measured"
      />
    </>
  );
}
