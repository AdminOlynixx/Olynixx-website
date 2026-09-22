import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero, Section, Eyebrow } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/content/contact";
import { publicContact, telHref, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT.lead,
};

export default function ContactPage() {
  const details = publicContact();

  return (
    <>
      <Hero compact>
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
            {details.address ? <p>{details.address}</p> : null}
            {details.email ? (
              <p>
                <a href={`mailto:${details.email}`}>{details.email}</a>
              </p>
            ) : null}
            {details.phone ? (
              <p>
                <a href={telHref(details.phone)}>{details.phone}</a>
              </p>
            ) : null}
            {details.whatsapp ? (
              <p>
                <a href={whatsappHref(details.whatsapp)} target="_blank" rel="noopener noreferrer">
                  WhatsApp {details.whatsapp}
                </a>
              </p>
            ) : null}
            {details.mapUrl ? (
              <p>
                <a href={details.mapUrl} rel="noopener noreferrer">
                  Map
                </a>
              </p>
            ) : null}
            {details.sla ? <p className="ol-small">{details.sla}</p> : null}
            {details.calendar ? (
              <div className="ol-calendar">
                <iframe title="Book a conversation" src={details.calendar} loading="lazy" />
              </div>
            ) : null}
            <p className="ol-small ol-muted">{CONTACT.directNote}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
