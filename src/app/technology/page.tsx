import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { DeviceCard } from "@/components/sections/DeviceCard";
import { TechConvergence } from "@/components/sections/TechConvergence";
import { DashboardSplit } from "@/components/sections/DashboardSplit";
import { IsoShort } from "@/components/sections/IsoBlock";
import { JsonLd } from "@/components/sections/JsonLd";
import { TECHNOLOGY } from "@/content/technology";
import { NON_MEDICAL_STATEMENT } from "@/lib/legal-copy";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { publishBest, publishDc } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: TECHNOLOGY.metaTitle },
  description: TECHNOLOGY.metaDescription,
};

export default function TechnologyPage() {
  const msFit = TECHNOLOGY.devices[0];
  const oxyterra = TECHNOLOGY.devices[1];
  const rest = TECHNOLOGY.devices.slice(2).filter((d) => !(publishBest() && d.name === "Microcurrent"));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { href: "/", label: "Home" },
          { href: "/technology", label: "Technology" },
        ])}
      />
      <PageHero
        eyebrow={TECHNOLOGY.eyebrow}
        title={TECHNOLOGY.heroTitle}
        lead={TECHNOLOGY.standfirst}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/technology", label: "Technology" },
        ]}
      />

      <Section theme="light" eyebrow={TECHNOLOGY.measureEyebrow} title={TECHNOLOGY.measureTitle}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal stagger={0.1} className="space-y-5 text-ink-muted">
            {TECHNOLOGY.measure.map((para) => (
              <p key={para.slice(0, 28)}>{para}</p>
            ))}
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
              Nervous · Cardiovascular · Metabolic
            </p>
          </Reveal>
          <TechConvergence />
        </div>
      </Section>

      <Section theme="dark">
        <Reveal stagger={0.12} className="grid gap-5 md:grid-cols-2">
          <DeviceCard theme="dark" status={msFit.status} name={msFit.name} role={msFit.role} bullets={msFit.bullets} where={msFit.where} />
          <DeviceCard theme="dark" status={TECHNOLOGY.sensorStatus} name={TECHNOLOGY.sensorName} role={TECHNOLOGY.sensorBody} />
        </Reveal>
        {publishDc() ? (
          <Reveal stagger={0.1} className="mt-14 max-w-[68ch] space-y-4">
            <h2 className="text-[clamp(1.8125rem,3.4vw,2.5rem)] leading-[1.1]">{TECHNOLOGY.firstGulfTitle}</h2>
            <p className="text-cream/80">{TECHNOLOGY.firstGulfBody}</p>
            {TECHNOLOGY.poweredBy ? <p className="font-mono text-xs text-cream/60">{TECHNOLOGY.poweredBy}</p> : null}
          </Reveal>
        ) : null}
      </Section>

      <Section theme="light">
        <Reveal stagger={0.12} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <DeviceCard status={oxyterra.status} name={oxyterra.name} role={oxyterra.role} bullets={oxyterra.bullets} where={oxyterra.where} />
          </div>
          {publishBest() ? (
            <div className="md:col-span-2">
              <DeviceCard status={TECHNOLOGY.bestStatus} name={TECHNOLOGY.bestName} role={TECHNOLOGY.bestBody} />
            </div>
          ) : null}
          {rest.map((d) => (
            <DeviceCard key={d.name} status={d.status} name={d.name} role={d.role} bullets={d.bullets} where={d.where} />
          ))}
        </Reveal>
      </Section>

      <Section theme="dark" narrow eyebrow={TECHNOLOGY.principleEyebrow} title={TECHNOLOGY.principleTitle}>
        <Reveal stagger={0.1} className="space-y-8">
          <p className="text-cream/85">{TECHNOLOGY.principle}</p>
          <Button href={contactHref("systems", "tech-moat")}>{TECHNOLOGY.systemsCta}</Button>
        </Reveal>
      </Section>

      <Section theme="light" narrow title={TECHNOLOGY.ownTitle}>
        <Reveal stagger={0.1} className="space-y-8">
          <p className="text-ink-muted">{TECHNOLOGY.ownBody}</p>
          <Button href={contactHref("systems", "tech-own")}>{TECHNOLOGY.systemsCta}</Button>
        </Reveal>
      </Section>

      <Section theme="dark" narrow eyebrow={TECHNOLOGY.dataEyebrow} title={TECHNOLOGY.dataTitle}>
        <p className="text-cream/85">{TECHNOLOGY.data}</p>
      </Section>

      <Section theme="light" eyebrow={TECHNOLOGY.dashEyebrow} title={TECHNOLOGY.dashTitle}>
        <DashboardSplit personal={TECHNOLOGY.dash[0]} corporate={TECHNOLOGY.dash[1]} note={TECHNOLOGY.dash[2]} />
      </Section>

      <Section theme="dark" narrow>
        <IsoShort theme="dark" />
      </Section>

      <Section theme="light" narrow>
        <p className="border-y border-rule py-8 font-display text-xl leading-snug text-ink">{NON_MEDICAL_STATEMENT}</p>
      </Section>
    </>
  );
}
