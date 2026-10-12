import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { CardGrid } from "@/components/sections/CardGrid";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { SectionSubNav } from "@/components/sections/SectionSubNav";
import { IsoShortLine } from "@/components/sections/IsoShortLine";
import { PageJsonLd } from "@/components/sections/PageJsonLd";
import { ScrollTimeline } from "@/components/sections/ScrollTimeline";
import { TimelineItem } from "@/components/sections/TimelineItem";
import { CycleLoop } from "@/components/sections/CycleLoop";
import { TiltCard } from "@/components/sections/TiltCard";
import { PersonalDashMock, LeadershipDashMock } from "@/components/sections/DashboardMocks";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CORPORATES } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { publishBest, publishPureHealth } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: CORPORATES.metaTitle },
  description: CORPORATES.metaDescription,
};

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/corporates", label: "Corporates" },
];

export default function CorporatesPage() {
  const tiers = CORPORATES.tiers.map((t, i) => (i === 2 && publishBest() ? CORPORATES.tier3Best : t.body));
  return (
    <>
      <PageJsonLd data={[serviceJsonLd(), breadcrumbJsonLd(crumbs)]} />
      <PageHero
        eyebrow={CORPORATES.eyebrow}
        title={CORPORATES.heroTitle}
        lead={CORPORATES.standfirst}
        primary={{ href: contactHref("corporate-pilot", "corporates-hero"), label: CORPORATES.primaryCta }}
        secondary={{ href: "#pilot", label: CORPORATES.secondaryCta }}
        trust={CORPORATES.trust}
        breadcrumb={crumbs}
      />
      <SectionSubNav items={CORP_SUBNAV} current="/corporates" />

      <Section theme="light" narrow>
        <Reveal>
          <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.25]">{CORPORATES.firstClaim}</p>
        </Reveal>
      </Section>

      <Section theme="dark" eyebrow={CORPORATES.eventBandEyebrow} title={CORPORATES.eventBandTitle} lead={CORPORATES.eventBandBody}>
        <Reveal>
          <Button href={contactHref("event", "corporates-event-band")} variant="secondary">
            {CORPORATES.eventsCta}
          </Button>
        </Reveal>
      </Section>

      <Section theme="light" narrow eyebrow={CORPORATES.gapEyebrow} title={CORPORATES.gapTitle}>
        <Prose>
          {CORPORATES.gap.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="dark" id="pilot" eyebrow={CORPORATES.pilotEyebrow} title={CORPORATES.pilotTitle} lead={CORPORATES.pilotIntro}>
        <ScrollTimeline theme="dark">
          {CORPORATES.weeks.map((w, i) => (
            <TimelineItem key={w.title} theme="dark" kicker={String(i + 1).padStart(2, "0")} title={w.title}>
              <p>{w.body}</p>
            </TimelineItem>
          ))}
        </ScrollTimeline>
        <Reveal className="mt-12">
          <Button href={contactHref("corporate-pilot", "corporates-pilot")}>{CORPORATES.primaryCta}</Button>
        </Reveal>
      </Section>

      <Section theme="light" eyebrow={CORPORATES.systemEyebrow} title={CORPORATES.systemTitle}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <CycleLoop theme="light" labels={CORPORATES.system.map((s) => s.title)} />
          <CardGrid items={CORPORATES.system} cols={2} numbered />
        </div>
      </Section>

      <Section theme="dark" eyebrow={CORPORATES.tiersEyebrow} title={CORPORATES.tiersTitle}>
        <div className="grid gap-5 lg:grid-cols-2">
          <TiltCard className="border border-gold-dark bg-cream/[0.06] p-7 lg:col-span-2">
            <p className="eyebrow mb-4">01</p>
            <h3 className="font-display text-2xl leading-tight">{CORPORATES.tiers[0].title}</h3>
            <p className="mt-3 max-w-[75ch] text-[15px] text-cream/75">{tiers[0]}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <PersonalDashMock caption={CORPORATES.personalSlot} />
              <LeadershipDashMock caption={CORPORATES.boardroomSlot} />
            </div>
          </TiltCard>
          {CORPORATES.tiers.slice(1).map((t, i) => (
            <TiltCard key={t.title} className="border border-cream/15 bg-cream/[0.04] p-7 transition-colors hover:border-gold-dark">
              <p className="eyebrow mb-4">{String(i + 2).padStart(2, "0")}</p>
              <h3 className="font-display text-2xl leading-tight">{t.title}</h3>
              <p className="mt-3 text-[15px] text-cream/75">{tiers[i + 1]}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      <ProofStrip items={CORPORATES.proof} />

      <Section theme="light" narrow eyebrow={CORPORATES.resultsTitle}>
        <Prose>
          <p className="text-lg">{CORPORATES.resultsBody}</p>
        </Prose>
      </Section>

      <Section theme="dark" eyebrow={CORPORATES.dashEyebrow} title={CORPORATES.dashTitle}>
        <div className="grid gap-12 lg:grid-cols-2">
          <Prose theme="dark">
            {CORPORATES.dash.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </Prose>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <PersonalDashMock caption={CORPORATES.personalSlot} />
            <LeadershipDashMock caption={CORPORATES.boardroomSlot} />
          </div>
        </div>
      </Section>

      <Section theme="light" narrow eyebrow={CORPORATES.rohEyebrow} title={CORPORATES.rohTitle}>
        <Prose>
          {CORPORATES.roh.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="dark" narrow>
        <IsoShortLine theme="dark" />
      </Section>

      <Section theme="light" eyebrow={CORPORATES.eventsEyebrow} title={CORPORATES.eventsTitle}>
        <Prose>
          {CORPORATES.events.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </Prose>
        <Reveal className="mt-8">
          <Button href={contactHref("event", "corporates-events")} variant="secondary">
            {CORPORATES.eventsCta}
          </Button>
        </Reveal>
        {publishPureHealth() && (
          <div className="mt-16 border-t border-rule pt-10">
            <Reveal stagger={0.1} className="max-w-3xl">
              <p className="eyebrow">National scale</p>
              <h3 className="mt-3 font-display text-3xl">{CORPORATES.pureHealthTitle}</h3>
              <p className="mt-4 text-ink-muted">{CORPORATES.pureHealthBody}</p>
            </Reveal>
          </div>
        )}
      </Section>

      <CtaBand
        title={CORPORATES.closeTitle}
        standfirst={CORPORATES.closeStandfirst}
        href={contactHref("corporate-pilot", "corporates-close")}
        label={CORPORATES.primaryCta}
        secondary={{ href: contactHref("event", "corporates-close-event"), label: CORPORATES.eventsCta }}
      />
    </>
  );
}
