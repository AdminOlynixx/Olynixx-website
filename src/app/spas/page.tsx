import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { GYMS } from "@/content/gyms";
import { contactHref } from "@/lib/cta";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = withSocial(
  {
    title: { absolute: "Guest readiness testing for spas | Olynixx" },
    description: "A one-minute readiness check at arrival steers the hour you already staffed and turns a nice visit into a measured one.",
  },
  "/spas",
);

const CRUMBS = [
  { href: "/", label: "Home" },
  { href: "/gyms", label: "Gyms, clubs & spas" },
  { href: "/spas", label: "Spas" },
];

/** Spas split out of /gyms into their own page (Louis, 25 Oct review). */
export default function SpasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(CRUMBS)) }} />
      <PageHero
        breadcrumb={CRUMBS}
        eyebrow={GYMS.spaEyebrow}
        title={GYMS.spaTitle}
        lead={GYMS.spa}
        primary={{ href: contactHref("club-licence", "spas-hero"), label: GYMS.primaryCta }}
        secondary={{ href: "/gyms", label: "For gyms and clubs" }}
      />

      <Section theme="light" title="What a spa gets">
        <CardGrid items={GYMS.spaCards} cols={4} numbered />
      </Section>

      <CtaBand
        title="Give every guest a number no other spa can give them."
        href={contactHref("club-licence", "spas-close")}
        label={GYMS.primaryCta}
      />
    </>
  );
}
