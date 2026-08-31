import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, Eyebrow, Lead } from "@/components/site/Section";
import { IsoBlock } from "@/components/site/IsoBlock";
import { GOVERNANCE } from "@/content/legal";

export const metadata: Metadata = {
  title: "Governance",
  description: GOVERNANCE.lead,
};

export default function GovernancePage() {
  return (
    <>
      <Hero>
        <Eyebrow>Governance</Eyebrow>
        <h1 className="ol-hero-title">{GOVERNANCE.title}</h1>
        <p className="ol-lead">{GOVERNANCE.lead}</p>
      </Hero>
      <Section narrow>
        <p className="ol-iso__status">{GOVERNANCE.status}</p>
        <Lead>{GOVERNANCE.body}</Lead>
        <p className="ol-small ol-muted" style={{ marginTop: "var(--s4)" }}>
          Certificate numbers, scope and issue dates: not yet issued.
        </p>
      </Section>
      <Section surface="dark" narrow>
        <IsoBlock />
      </Section>
      <Section narrow>
        <p className="ol-small ol-muted">
          Related: <Link href="/privacy">privacy</Link> · <Link href="/terms">terms</Link>
        </p>
      </Section>
    </>
  );
}
