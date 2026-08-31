import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Title, Lead } from "@/components/site/Section";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  description: PRIVACY.lead,
};

export default function PrivacyPage() {
  return (
    <>
      <Hero>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="ol-hero-title">{PRIVACY.title}</h1>
        <p className="ol-lead">{PRIVACY.lead}</p>
      </Hero>
      {PRIVACY.sections.map((section) => (
        <Section key={section.title} narrow>
          <Title>{section.title}</Title>
          {section.body.map((para) => (
            <Lead key={para.slice(0, 32)}>{para}</Lead>
          ))}
        </Section>
      ))}
      <Section narrow>
        <p className="ol-small ol-muted">
          Also see <Link href="/terms">terms of use</Link> and{" "}
          <Link href="/governance">governance</Link>.
        </p>
      </Section>
    </>
  );
}
