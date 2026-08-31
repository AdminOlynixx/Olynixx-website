import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero, Section, Eyebrow } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/content/contact";
import { publicContact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT.lead,
};

export default function ContactPage() {
  const details = publicContact();

  return (
    <>
      <Hero center compact>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="ol-hero-title">{CONTACT.title}</h1>
        <p className="ol-lead">{CONTACT.lead}</p>
      </Hero>

      <Section>
        <div className="ol-contact">
          <div className="ol-contact__form">
            <Suspense fallback={<p className="ol-muted">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="ol-contact__direct">
            <Eyebrow>{CONTACT.directEyebrow}</Eyebrow>
            <p className="ol-contact__place">{details.location}</p>
            {details.email ? (
              <p>
                <a href={`mailto:${details.email}`}>{details.email}</a>
              </p>
            ) : null}
            {details.phone ? (
              <p>
                <a href={`tel:${details.phone}`}>{details.phone}</a>
              </p>
            ) : null}
            <p className="ol-small ol-muted">{CONTACT.directNote}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
