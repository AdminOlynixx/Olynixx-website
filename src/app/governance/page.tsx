import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { IsoBlock } from "@/components/sections/IsoBlock";
import { LegalAlso } from "@/components/sections/LegalDoc";
import { JsonLd } from "@/components/sections/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { GOVERNANCE } from "@/content/legal";
import { ISO_LONG } from "@/lib/legal-copy";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = withSocial({
  title: { absolute: "Governance | Olynixx" },
  description: GOVERNANCE.lead,
}, "/governance");

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/governance", label: "Governance" },
];

export default function GovernancePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero title={GOVERNANCE.title} lead={GOVERNANCE.lead} breadcrumb={crumbs} />

      <Section theme="light" narrow>
        <Reveal stagger={0.1} className="space-y-6">
          <p className="border-l-2 border-gold pl-5 font-display text-xl text-ink">{GOVERNANCE.status}</p>
          <p className="text-ink-muted">{GOVERNANCE.body}</p>
          <ul className="divide-y divide-rule border-y border-rule">
            {ISO_LONG.items.map((item) => (
              <li key={item} className="flex flex-wrap items-center justify-between gap-2 py-4 text-[15px]">
                <span>{item}</span>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">Not yet issued</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-muted">Certificate numbers, scope and issue dates: not yet issued.</p>
        </Reveal>
      </Section>

      <Section theme="dark" narrow>
        <IsoBlock />
      </Section>

      <Section theme="light" narrow className="!py-14">
        <LegalAlso
          links={[
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms of use" },
          ]}
        />
      </Section>
    </>
  );
}
