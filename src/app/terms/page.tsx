import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Title, Lead, Eyebrow } from "@/components/site/Section";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of use",
  description: TERMS.lead,
};

export default function TermsPage() {
  return (
    <>
      <Hero>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="ol-hero-title">{TERMS.title}</h1>
        <p className="ol-lead">{TERMS.lead}</p>
      </Hero>
      {TERMS.sections.map((section) => (
        <Section key={section.title} narrow>
          <Title>{section.title}</Title>
          {section.body.map((para) => (
            <Lead key={para.slice(0, 32)}>{para}</Lead>
          ))}
        </Section>
      ))}
      <Section narrow>
        <p className="ol-small ol-muted">
          Also see <Link href="/privacy">privacy</Link>.
        </p>
      </Section>
    </>
  );
}
