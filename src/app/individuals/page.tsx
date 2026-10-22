import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { HUB } from "@/content/individuals";
import { contactHref } from "@/lib/cta";
import { phaseShop, publishLongevity } from "@/lib/site-config";
import { shopHref } from "@/lib/shop";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Prose } from "@/components/sections/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { IndividualRouteSwitcher } from "@/components/sections/IndividualRouteSwitcher";
import { RouteCards } from "@/components/sections/RouteCards";
import { ScrubSteps } from "@/components/sections/ScrubSteps";
import { LevelLadder } from "@/components/sections/LevelLadder";

export const metadata: Metadata = withSocial({
  title: { absolute: HUB.metaTitle },
  description: HUB.metaDescription,
}, "/individuals");

export default function IndividualsHub() {
  const longevityLive = publishLongevity();
  const doors = longevityLive ? HUB.doors : HUB.doors.filter((d) => d.href !== "/individuals/longevity");
  const doorsTitle = longevityLive ? HUB.doorsTitle : "Two routes. One method.";
  const shop = shopHref("/shop", "individuals", "bridge");

  return (
    <>
      <PageHero
        eyebrow={HUB.eyebrow}
        title={HUB.heroTitle}
        lead={HUB.standfirst}
        primary={{ href: contactHref("individual-intake", "individuals-hero"), label: HUB.primaryCta }}
        secondary={{ href: "#routes", label: HUB.secondaryCta }}
        trust={HUB.trust}
      />
      <IndividualRouteSwitcher current="/individuals" />

      <Section theme="light" narrow eyebrow={HUB.argumentEyebrow} title={HUB.argumentTitle}>
        <Prose>
          {HUB.argument.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="light" id="routes" eyebrow={HUB.doorsEyebrow} title={doorsTitle} className="border-t border-rule">
        <RouteCards doors={doors} />
      </Section>

      <Section theme="dark" narrow>
        <Prose theme="dark">
          {HUB.lineBody.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section theme="light" eyebrow={HUB.methodEyebrow} title={HUB.methodTitle}>
        <ScrubSteps steps={HUB.method.map((s, i) => ({ label: `0${i + 1}`, title: s.title, body: s.body }))} />
      </Section>

      <Section theme="dark" eyebrow={HUB.levelsEyebrow} title={HUB.levelsTitle}>
        <LevelLadder levels={HUB.levels} priceNote={HUB.levelsPriceNote} note={HUB.levelsNote} theme="dark" />
      </Section>

      {phaseShop() ? (
        <Section theme="light" narrow title="Start tonight, or start with a conversation.">
          <Prose>
            <p>
              Some journeys need an intake talk first. The three levels above all do. Some you can start tonight: defined readiness programmes (device, protocol and guidance in one) are in the Olynixx shop. The book is there too. Either way, the first step is measured.
            </p>
          </Prose>
          <Reveal className="mt-8 flex flex-wrap gap-4">
            {shop ? (
              <Button href={shop} variant="secondary">
                Browse readiness programmes
              </Button>
            ) : null}
            <Button href={contactHref("individual-intake", "individuals-bridge")}>Book your free intake talk</Button>
          </Reveal>
        </Section>
      ) : null}

      <CtaBand
        title={HUB.closeTitle}
        standfirst={HUB.closeStandfirst}
        href={contactHref("individual-intake", "individuals-close")}
        label={HUB.primaryCta}
      />
    </>
  );
}
