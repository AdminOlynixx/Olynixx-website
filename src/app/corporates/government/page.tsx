import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { TextCards } from "@/components/sections/TextCards";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionSubNav } from "@/components/sections/SectionSubNav";
import { PageJsonLd } from "@/components/sections/PageJsonLd";
import { ScrollTimeline } from "@/components/sections/ScrollTimeline";
import { TimelineItem } from "@/components/sections/TimelineItem";
import { Reveal } from "@/components/motion/Reveal";
import { GOVERNMENT } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = withSocial({
  title: { absolute: "Government workforce readiness testing | Olynixx" },
  description: "Readiness programmes for UAE government workforces and senior leadership. Delivered on site, fully anonymised at cohort level.",
}, "/corporates/government");

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/corporates", label: "Corporates" },
  { href: "/corporates/government", label: "Government" },
];

export default function GovernmentPage() {
  const contract = GOVERNMENT.contract;
  return (
    <>
      <PageJsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow="Government & public sector" title={GOVERNMENT.heroTitle} lead={GOVERNMENT.heroLead} breadcrumb={crumbs} />
      <SectionSubNav items={CORP_SUBNAV} current="/corporates/government" />

      <Section theme="light" eyebrow="Anonymised record" title={GOVERNMENT.deliveredTitle}>
        <TextCards items={GOVERNMENT.delivered} cols={3} />
      </Section>

      <Section theme="dark" eyebrow="How we engage" title={GOVERNMENT.engageTitle} lead={GOVERNMENT.engageIntro}>
        <ScrollTimeline theme="dark">
          {GOVERNMENT.steps.map((s, i) => (
            <TimelineItem key={s.title} theme="dark" kicker={String(i + 1).padStart(2, "0")} title={s.title}>
              <p>{s.body}</p>
            </TimelineItem>
          ))}
        </ScrollTimeline>
        <Reveal className="mt-14 max-w-[68ch] space-y-4">
          <p className="text-cream/85">{GOVERNMENT.tiersSummary}</p>
          <Link href="/corporates#system" className="inline-block underline decoration-gold underline-offset-4 hover:text-gold-dark">
            {GOVERNMENT.tiersLink}
          </Link>
        </Reveal>
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
