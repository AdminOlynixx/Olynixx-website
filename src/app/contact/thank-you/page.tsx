import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { THANK_YOU } from "@/content/legal";

export const metadata: Metadata = {
  title: { absolute: "Thank you | Olynixx" },
  description: THANK_YOU.lead,
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={THANK_YOU.title}
        lead={THANK_YOU.lead}
        primary={{ href: "/", label: "Home" }}
        secondary={{ href: "/individuals", label: "For individuals" }}
      />
      <Section theme="light" narrow>
        <p className="text-ink-muted">{THANK_YOU.next}</p>
      </Section>
    </>
  );
}
