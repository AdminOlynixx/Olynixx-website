import type { Metadata } from "next";
import { Hero, Section, Eyebrow } from "@/components/site/Section";
import { IsoBlock } from "@/components/site/IsoBlock";
import { LegalAlso } from "@/components/site/LegalDoc";
import { GOVERNANCE } from "@/content/legal";
import { ISO_LONG } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "Governance",
  description: GOVERNANCE.lead,
};

export default function GovernancePage() {
  return (
    <>
      <Hero compact>
        <Eyebrow>Governance</Eyebrow>
        <h1 className="ol-hero-title">{GOVERNANCE.title}</h1>
        <p className="ol-lead">{GOVERNANCE.lead}</p>
      </Hero>
      <Section>
        <div className="ol-legal">
          <p className="ol-legal__status">{GOVERNANCE.status}</p>
          <p className="ol-legal__body">{GOVERNANCE.body}</p>
          <ul className="ol-legal__certs">
            {ISO_LONG.items.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <span>Not yet issued</span>
              </li>
            ))}
          </ul>
          <p className="ol-small ol-muted">
            Certificate numbers, scope and issue dates: not yet issued.
          </p>
        </div>
      </Section>
      <Section surface="dark">
        <div className="ol-legal ol-legal--on-dark">
          <IsoBlock />
        </div>
      </Section>
      <Section>
        <div className="ol-legal">
          <LegalAlso
            links={[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms of use" },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
