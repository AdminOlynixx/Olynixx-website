import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { CycleLoop } from "@/components/sections/CycleLoop";
import { TiltCard } from "@/components/sections/TiltCard";
import { ReadinessHubSection } from "@/components/sections/ReadinessHubSection";
import { LoadCapacityMock } from "@/components/sections/DashboardMocks";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GYMS } from "@/content/gyms";
import { contactHref } from "@/lib/cta";
import { publishBest } from "@/lib/site-config";

export const metadata: Metadata = withSocial({
  title: { absolute: GYMS.metaTitle },
  description: GYMS.metaDescription,
}, "/gyms");

export default function GymsPage() {
  const named = (text: string) =>
    publishBest() ? text.replaceAll("Olynixx recovery systems", "B-E-St microcurrent recovery") : text;
  const loopLabels = GYMS.recoveryTitle.split(/\.\s*/).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={GYMS.eyebrow}
        title={GYMS.heroTitle}
        lead={GYMS.standfirst}
        primary={{ href: contactHref("club-licence", "gyms-hero"), label: GYMS.primaryCta }}
        secondary={{ href: "/praxis", label: GYMS.secondaryCta }}
        trust={GYMS.trust}
      />

      <nav aria-label="Gyms or spas" data-theme="light" className="relative z-10 border-b border-rule bg-cream/90 backdrop-blur">
        <ul className="container-ol flex gap-2 py-2">
          {[
            { href: "#gyms-track", label: GYMS.selectorGyms },
            { href: "#spa-track", label: GYMS.selectorSpas },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-[44px] items-center border-b-2 border-transparent px-4 text-sm text-ink-muted hover:border-gold hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section theme="light" id="gyms-track" eyebrow={GYMS.safetyEyebrow} title={GYMS.safetyTitle}>
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <Prose>
              {GYMS.safety.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Prose>
            <Reveal>
              <p className="max-w-[68ch] border-l-2 border-gold pl-5 text-sm text-ink-muted">{GYMS.safetyNote}</p>
            </Reveal>
          </div>
          <LoadCapacityMock caption={GYMS.safetyTitle} />
        </div>
      </Section>

      <Section theme="dark" eyebrow={GYMS.personalEyebrow} title={GYMS.personalTitle}>
        <Prose theme="dark">
          <p>{GYMS.personal}</p>
          <p>{GYMS.personalClose}</p>
        </Prose>
        <Reveal stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-2">
          {GYMS.models.map((m, i) => (
            <TiltCard
              key={m.title}
              className={`border p-7 ${i === 1 ? "border-gold-dark bg-cream/[0.06]" : "border-cream/15 bg-cream/[0.03]"}`}
            >
              <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display text-2xl leading-tight">{m.title}</h3>
              <p className="mt-3 text-[15px] text-cream/75">{m.body}</p>
            </TiltCard>
          ))}
        </Reveal>
      </Section>

      <Section theme="light" eyebrow={GYMS.recoveryEyebrow} title={GYMS.recoveryTitle}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Prose>
            {GYMS.recovery.map((p) => (
              <p key={p.slice(0, 24)}>{named(p)}</p>
            ))}
          </Prose>
          <CycleLoop theme="light" labels={loopLabels} />
        </div>
      </Section>

      <Section theme="dark" narrow eyebrow={GYMS.recoveryZoneEyebrow} title={GYMS.recoveryZoneTitle}>
        <Prose theme="dark">
          <p>{named(GYMS.recoveryZone)}</p>
        </Prose>
      </Section>

      <Section theme="light" eyebrow={GYMS.incomeEyebrow} title={GYMS.incomeTitle}>
        <Prose>
          <p>{named(GYMS.income)}</p>
        </Prose>
        <Reveal className="mt-8 mb-12">
          <Button href={contactHref("systems", "gyms-systems")} variant="secondary">
            Ask about systems
          </Button>
        </Reveal>
        <CardGrid items={GYMS.steered} cols={4} numbered />
      </Section>

      <Section theme="dark" id="spa-track" eyebrow={GYMS.spaEyebrow} title={GYMS.spaTitle} lead={GYMS.spa}>
        <CardGrid items={GYMS.spaCards} theme="dark" cols={4} numbered />
      </Section>

      <Section theme="light" id="licence" eyebrow={GYMS.licenceEyebrow} title={GYMS.licenceTitle}>
        <CardGrid items={GYMS.licence} cols={3} numbered />
        <Reveal className="mt-10">
          <Button href={contactHref("club-licence", "gyms-licence")}>{GYMS.licenceCta}</Button>
        </Reveal>
      </Section>

      <ReadinessHubSection theme="dark" />

      <Section theme="light" narrow eyebrow={GYMS.coachesEyebrow} title={GYMS.coachesTitle}>
        <Prose>
          <p>{GYMS.coaches}</p>
          <p>{GYMS.coachesClose}</p>
        </Prose>
        <Reveal className="mt-8 flex flex-wrap gap-4">
          <Button href={contactHref("club-licence", "gyms-network")} variant="secondary">
            {GYMS.networkCta}
          </Button>
          <Button href="/praxis" variant="secondary">
            {GYMS.praxisCta}
          </Button>
        </Reveal>
      </Section>

      <ProofStrip items={GYMS.proof} />

      <Section theme="light" eyebrow={GYMS.firstClubEyebrow} title={GYMS.firstClubTitle}>
        <Prose>
          <p className="text-lg">{GYMS.firstClub}</p>
        </Prose>
      </Section>

      <CtaBand
        title={GYMS.closeTitle}
        href={contactHref("club-licence", "gyms-close")}
        label={GYMS.primaryCta}
        secondary={{ href: "/praxis", label: GYMS.closeSecondary }}
      />
    </>
  );
}
