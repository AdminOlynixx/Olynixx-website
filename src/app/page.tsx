import type { Metadata } from "next";
import Image from "next/image";
import { HOME } from "@/content/home";
import { contactHref } from "@/lib/cta";
import { publishDc, publishSean } from "@/lib/site-config";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { DoorCards } from "@/components/sections/DoorCards";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { PinnedCycle } from "@/components/sections/PinnedCycle";
import { Marquee } from "@/components/sections/Marquee";
import { CORPORATES } from "@/content/corporates";

export const metadata: Metadata = {
  title: { absolute: "Workforce readiness testing in the UAE | Olynixx" },
  description: HOME.standfirst,
};

export default function Home() {
  // Certification card stays visible on the home page even while Praxis is hidden from nav (matches old site).
  const doors = HOME.doors;

  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="surface-dark relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(79,192,166,0.18),transparent_60%)]" />
        <div className="container-ol relative z-10 py-20 lg:py-24">
          <div>
          <p className="eyebrow mb-6">{HOME.spineAlt}</p>
          <SplitHeading
            as="h1"
            text={HOME.heroTitle}
            delay={0.2}
            className="max-w-3xl text-[clamp(2.375rem,4.6vw,4.25rem)] leading-[1.04] tracking-[-0.02em]"
          />
          <Reveal stagger={0.12} delay={0.8} className="mt-8 max-w-xl space-y-6">
            <p className="text-[clamp(1.1875rem,1.6vw,1.3125rem)] text-cream/85">{HOME.standfirst}</p>
            <p className="font-display text-xl italic text-gold-dark">{HOME.proofLine}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={contactHref("corporate-pilot", "hero")}>{HOME.primaryCta}</Button>
              <Button href="/individuals" variant="secondary">
                {HOME.secondaryCta}
              </Button>
            </div>
          </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={CORPORATES.trust} />

      {/* Offer */}
      <section data-theme="light" className="py-24">
        <Reveal stagger={0.1} className="container-ol grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">{HOME.offerEyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.offerTitle}</h2>
            <p className="mt-4 max-w-[68ch] text-ink-muted">{HOME.offerBody}</p>
          </div>
          <div>
            <Button href={contactHref("event", "home-offer")}>{HOME.offerCta}</Button>
          </div>
        </Reveal>
      </section>

      {/* What this actually is */}
      <section data-theme="light" className="pb-24">
        <Reveal stagger={0.1} className="container-ol max-w-[780px]">
          <p className="eyebrow">{HOME.actuallyEyebrow}</p>
          <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.actuallyTitle}</h2>
          <p className="mt-5 text-ink-muted">{HOME.actually}</p>
        </Reveal>
      </section>

      {/* Four doors */}
      <section data-theme="dark" className="surface-dark py-24">
        <div className="container-ol">
          <Reveal stagger={0.1} className="mb-12 max-w-2xl">
            <p className="eyebrow">{HOME.doorsEyebrow}</p>
            <p className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-snug">
              {HOME.doorsIntro}
            </p>
          </Reveal>
          <div className="text-ink">
            <DoorCards doors={doors} />
          </div>
        </div>
      </section>

      <PinnedCycle eyebrow="One cycle" title="Four steps. One loop." steps={CORPORATES.system} />

      {/* Running */}
      <section data-theme="light" className="py-24">
        <div className="container-ol">
          <Reveal stagger={0.1} className="mb-10">
            <p className="eyebrow">{HOME.runningEyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.runningTitle}</h2>
          </Reveal>
          <Reveal stagger={0.12} className="grid gap-5 md:grid-cols-3">
            {HOME.running.map((r) => (
              <article key={r.title} className="border border-rule bg-paper p-7">
                <h3 className="font-display text-2xl">{r.title}</h3>
                <p className="mt-3 text-[15px] text-ink-muted">{r.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <ProofStrip items={HOME.proof} />

      {/* First cycle */}
      <section data-theme="light" className="py-24">
        <Reveal stagger={0.1} className="container-ol max-w-[780px]">
          <p className="eyebrow">{HOME.proofEyebrow}</p>
          <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.proofTitle}</h2>
          <p className="mt-5 text-ink-muted">{HOME.proofBody}</p>
        </Reveal>
      </section>

      {publishSean() && (
        <section data-theme="dark" className="surface-dark py-24">
          <Reveal stagger={0.1} className="container-ol max-w-3xl">
            <p className="eyebrow">{HOME.seanEyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.seanTitle}</h2>
            <p className="mt-4 text-cream/80">{HOME.seanBody}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/sean">{HOME.seanFollow}</Button>
              <Button href={contactHref("sean", "home-band")} variant="secondary">
                {HOME.seanTrain}
              </Button>
            </div>
          </Reveal>
        </section>
      )}

      {/* Monitoring is not testing */}
      <section data-theme="dark" className="surface-dark py-28">
        <Reveal stagger={0.12} className="container-ol max-w-[860px]">
          <p className="eyebrow">Capacity, not history</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)]">{HOME.monitoringTitle}</h2>
          <p className="mt-6 text-lg text-cream/90">{HOME.firstClaim}</p>
          <p className="mt-5 text-cream/80">{HOME.monitoringBody}</p>
          <p className="mt-8 font-display text-2xl italic text-gold-dark">
            {publishDc() ? HOME.monitoringLineDc : HOME.monitoringLine}
          </p>
        </Reveal>
      </section>

      {/* Book */}
      <section data-theme="light" className="py-24">
        <Reveal stagger={0.1} className="container-ol flex flex-col items-center gap-5 text-center">
          <Image src="/brand/olynixx-divider-on-light.svg" alt="" width={160} height={12} />
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] italic">{HOME.bookTitle}</h2>
          <p className="max-w-lg text-ink-muted">{HOME.bookBody}</p>
          <Button href="/about#book" variant="secondary">
            Read the argument
          </Button>
        </Reveal>
      </section>

      <CtaBand
        title={HOME.closing}
        href={contactHref("corporate-pilot", "home-close")}
        label={HOME.primaryCta}
      />
    </>
  );
}
