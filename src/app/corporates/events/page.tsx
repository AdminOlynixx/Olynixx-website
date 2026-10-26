import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { SectionSubNav } from "@/components/sections/SectionSubNav";
import { PageJsonLd } from "@/components/sections/PageJsonLd";
import { HeartbeatLine } from "@/components/sections/HeartbeatLine";
import { TiltCard } from "@/components/sections/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EVENTS } from "@/content/corporates";
import { CORP_SUBNAV } from "@/lib/nav";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { publishSean } from "@/lib/site-config";

export const metadata: Metadata = withSocial({
  title: { absolute: "Event testing kiosk and keynote | Olynixx" },
  description: EVENTS.heroLead,
}, "/corporates/events");

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/corporates", label: "Corporates" },
  { href: "/corporates/events", label: "Events & keynotes" },
];

export default function EventsPage() {
  return (
    <>
      <PageJsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow="Events & keynotes" title={EVENTS.heroTitle} lead={EVENTS.heroLead} breadcrumb={crumbs}>
        <HeartbeatLine />
      </PageHero>
      <SectionSubNav items={CORP_SUBNAV} current="/corporates/events" />

      <Section theme="light" narrow eyebrow="On the floor" title={EVENTS.kioskTitle}>
        <Prose>
          <p className="text-lg">{EVENTS.kioskBody}</p>
          {publishSean() && <p className="text-sm">{EVENTS.seanStation}</p>}
        </Prose>
      </Section>

      <Section theme="dark" narrow eyebrow="The talk" title={EVENTS.keynoteTitle}>
        <Prose theme="dark">
          {EVENTS.keynoteBody.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="light" narrow eyebrow="Teams" title={EVENTS.workshopsTitle}>
        <Prose>
          <p>{EVENTS.workshopsBody}</p>
        </Prose>
      </Section>

      <Section theme="dark" eyebrow={EVENTS.practicalEyebrow} title={EVENTS.practicalTitle}>
        <CardGrid items={EVENTS.practical} theme="dark" cols={4} numbered />
      </Section>

      <Section theme="light" eyebrow="What follows" title={EVENTS.programmeTitle} lead={EVENTS.programmeBody}>
        <Reveal>
          <TiltCard className="relative max-w-3xl overflow-hidden border border-gold bg-paper p-8 md:p-10">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
            <p className="eyebrow">{EVENTS.offerEyebrow}</p>
            <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight">{EVENTS.offerTitle}</h3>
            <p className="mt-4 text-ink-muted">{EVENTS.offerBody}</p>
            <p className="mt-6 font-display text-xl italic">{EVENTS.offerClose}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-gold-text">{EVENTS.offerNote}</p>
          </TiltCard>
        </Reveal>
      </Section>

      <section data-theme="dark" className="surface-dark relative overflow-hidden py-28 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,163,62,0.14),transparent_65%)]" />
        <Reveal stagger={0.1} className="container-ol relative flex flex-col items-center gap-6">
          <h2 className="max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.08]">{EVENTS.cta}</h2>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button href={contactHref("event", "events-station")}>{EVENTS.ctaStation}</Button>
            <Button href={contactHref("event", "events-keynote")} variant="secondary">
              {EVENTS.ctaKeynote}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
