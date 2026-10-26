import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
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
import { Faq } from "@/components/sections/Faq";
import { FAQ } from "@/content/faq";
import { FirstTwelveWeeks } from "@/components/sections/FirstTwelveWeeks";
import { PhotoSlot } from "@/components/sections/PhotoSlot";
import { SITE_PHOTOS } from "@/content/photos";
import { CORPORATES, FIRST_12 } from "@/content/corporates";

export const metadata: Metadata = withSocial({
  title: { absolute: "Workforce readiness testing in the UAE | Olynixx" },
  description: HOME.standfirst,
}, "/");

export default function Home() {
  // Certification card stays visible on the home page even while Praxis is hidden from nav (matches old site).
  const doors = HOME.doors;

  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="surface-dark relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(79,192,166,0.18),transparent_60%)]" />
        <div className="container-ol relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
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
          <PhotoSlot photo={SITE_PHOTOS.hero} sizes="(min-width: 1024px) 45vw, 100vw" priority />
        </div>
      </section>

      <Marquee items={CORPORATES.trust} />

      {/* The readiness principle */}
      <section data-theme="light" className="py-24">
        <div className="container-ol grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal stagger={0.1} className="max-w-[780px]">
            <p className="eyebrow">{HOME.readinessEyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.readinessTitle}</h2>
            <div className="mt-5 space-y-5 text-ink-muted">
              {HOME.readiness.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ol aria-label="Load, recovery, readiness" className="mt-8 flex flex-wrap items-center gap-3">
              {HOME.readinessSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="border border-rule bg-paper px-5 py-3 font-display text-xl">{step}</span>
                  {i < HOME.readinessSteps.length - 1 && (
                    <span aria-hidden className="font-mono text-gold-text">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-8 font-display text-2xl italic text-gold-text">{HOME.readinessClose}</p>
          </Reveal>
          <PhotoSlot photo={SITE_PHOTOS.readiness} />
        </div>
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

      <section data-theme="light" className="pt-24">
        <Reveal className="container-ol">
          <PhotoSlot photo={SITE_PHOTOS.steps} sizes="(min-width: 768px) 640px, 100vw" className="mx-auto max-w-[640px]" />
        </Reveal>
      </section>

      {/* Offer */}
      <section data-theme="light" className="py-24">
        <Reveal stagger={0.1} className="container-ol grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">{HOME.offerEyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.offerTitle}</h2>
            <p className="mt-4 max-w-[68ch] text-ink-muted">{HOME.offerBody}</p>
          </div>
          <div className="space-y-6">
            <PhotoSlot photo={SITE_PHOTOS.event} sizes="(min-width: 768px) 40vw, 100vw" />
            <Button href={contactHref("event", "home-offer")}>{HOME.offerCta}</Button>
          </div>
        </Reveal>
      </section>


      {/* Running */}
      <section data-theme="light" className="py-24">
        <div className="container-ol">
          <Reveal stagger={0.1} className="mb-10">
            <p className="eyebrow">{HOME.runningEyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.8125rem,3.4vw,2.5rem)]">{HOME.runningTitle}</h2>
          </Reveal>
          <Reveal stagger={0.12} className="grid gap-5 md:grid-cols-3">
            {HOME.running.map((r, i) => (
              <article key={r.title} className="border border-rule bg-paper p-7">
                <PhotoSlot
                  photo={[SITE_PHOTOS.fieldGovernment, SITE_PHOTOS.fieldClub, SITE_PHOTOS.fieldElite][i] ?? null}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="mb-5 aspect-[4/3]"
                />
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
        <div className="container-ol">
          <Reveal stagger={0.1} className="mb-10">
            <p className="eyebrow">{FIRST_12.eyebrow}</p>
          </Reveal>
          <FirstTwelveWeeks position="home-first-12" />
        </div>
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
          <PhotoSlot photo={SITE_PHOTOS.book} sizes="(min-width: 768px) 560px, 90vw" className="max-w-[560px]" />
          <Image src="/brand/olynixx-divider-on-light.svg" alt="" aria-hidden="true" width={160} height={12} />
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] italic">{HOME.bookTitle}</h2>
          <p className="max-w-lg text-ink-muted">{HOME.bookBody}</p>
          <Button href="/about#book" variant="secondary">
            Read the argument
          </Button>
        </Reveal>
      </section>

      {FAQ.home.length > 0 && (
        <section data-theme="light" className="py-24">
          <div className="container-ol">
            <Faq items={FAQ.home} />
          </div>
        </section>
      )}

      <CtaBand
        title={HOME.closing}
        href={contactHref("corporate-pilot", "home-close")}
        label={HOME.primaryCta}
      />
    </>
  );
}
