import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { TextCards } from "@/components/sections/TextCards";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionSubNav } from "@/components/sections/SectionSubNav";
import { PageJsonLd } from "@/components/sections/PageJsonLd";
import { ScrollTimeline } from "@/components/sections/ScrollTimeline";
import { TimelineItem } from "@/components/sections/TimelineItem";
import { TiltCard } from "@/components/sections/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { CORPORATES, GOVERNMENT } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { entityIdentity, publishBest } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Government workforce readiness testing | Olynixx" },
  description: GOVERNMENT.heroLead,
};

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/corporates", label: "Corporates" },
  { href: "/corporates/government", label: "Government" },
];

export default function GovernmentPage() {
  const entity = entityIdentity();
  const contract = GOVERNMENT.contract.map((item, index) =>
    index === 0 && entity.legalName
      ? `The trading entity for a UAE contract is ${entity.legalName.replace(/\.$/, "")}.`
      : item,
  );
  return (
    <>
      <PageJsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow="Government & public sector" title={GOVERNMENT.heroTitle} lead={GOVERNMENT.heroLead} breadcrumb={crumbs} />
      <SectionSubNav items={CORP_SUBNAV} current="/corporates/government" />

      <Section theme="light" eyebrow="Anonymised record" title={GOVERNMENT.deliveredTitle}>
        <TextCards items={GOVERNMENT.delivered} cols={3} />
      </Section>

      <Section theme="dark" eyebrow="Pilot first, always" title={GOVERNMENT.engageTitle} lead={GOVERNMENT.engageIntro}>
        <ScrollTimeline theme="dark">
          {GOVERNMENT.steps.map((s, i) => (
            <TimelineItem key={s.title} theme="dark" kicker={String(i + 1).padStart(2, "0")} title={s.title}>
              <p>{s.body}</p>
            </TimelineItem>
          ))}
        </ScrollTimeline>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {GOVERNMENT.layers.map((layer, i) => (
            <TiltCard
              key={layer.title}
              className={`border p-7 ${
                i === 0 ? "border-gold-dark bg-cream/[0.06] lg:col-span-2" : "border-cream/15 bg-cream/[0.04]"
              }`}
            >
              <h3 className="font-display text-2xl leading-tight">{layer.title}</h3>
              <p className="mt-3 max-w-[75ch] text-[15px] text-cream/75">
                {i === 2 && publishBest() ? CORPORATES.tier3Best : layer.body}
              </p>
            </TiltCard>
          ))}
        </div>
        <Reveal className="mt-12">
          <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] italic text-gold-dark">{GOVERNMENT.close}</p>
        </Reveal>
      </Section>

      <Section theme="light" narrow eyebrow="Data handling" title={GOVERNMENT.governanceTitle}>
        <Prose>
          <p className="text-lg">{GOVERNMENT.governanceBody}</p>
        </Prose>
      </Section>

      <Section theme="light" eyebrow={GOVERNMENT.contractEyebrow} title={GOVERNMENT.contractTitle}>
        <TextCards items={contract} cols={2} />
      </Section>

      <CtaBand title={GOVERNMENT.cta} href={contactHref("government", "government-close")} label={GOVERNMENT.cta} />
    </>
  );
}
