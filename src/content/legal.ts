/** Staging legal copy. Entity stays unpublished until PUBLISH_ENTITY=true. Email and phone stay empty until confirmed. */

export const PRIVACY = {
  title: "Privacy",
  lead: "How we handle the information you give us on this site, and the information a test produces.",
  sections: [
    {
      title: "This notice",
      body: [
        "This page covers the public Olynixx website and the contact form on it. Testing programmes, club licences and corporate pilots are contracted separately, with the same architecture described below.",
        "Olynixx provides lifestyle guidance based on non-medical data. Nothing here is a diagnosis, a treatment, or a clinical record.",
      ],
    },
    {
      title: "What the contact form collects",
      body: [
        "Name, email, and optionally organisation, phone and a message. We also record the page that sent you (the source tag) so the enquiry reaches the right conversation.",
        "We use that information only to respond to you. We do not sell it, and we do not use it for advertising lists.",
      ],
    },
    {
      title: "Test data, when you are in a programme",
      body: [
        "Individual results belong to the individual. Leadership reporting is anonymised at the point of aggregation, not by a promise afterwards. Executive results never enter a workforce aggregate.",
        "Test data is processed and hosted in the UAE. Access is governed, logged and reviewed.",
      ],
    },
    {
      title: "How long we keep an enquiry",
      body: [
        "Website enquiries are kept only as long as needed to route and answer them, then archived or deleted according to the operating process in force at the time.",
      ],
    },
    {
      title: "Your choices",
      body: [
        "You can ask what we hold from a website enquiry, ask us to correct it, or ask us to delete it. Use the contact form, or the public email once it is published on this site.",
      ],
    },
  ],
} as const;

export const TERMS = {
  title: "Terms of use",
  lead: "The public website is information, not a contract for testing, licensing or coaching.",
  sections: [
    {
      title: "What this site is",
      body: [
        "These pages describe Olynixx programmes. They are not medical advice, not a diagnosis, and not an offer that becomes binding when you send the form. A programme starts only when both sides have agreed it in writing.",
      ],
    },
    {
      title: "Non-medical",
      body: [
        "We operate our instruments in non-medical settings only and make no diagnostic claims from them. Guidance is lifestyle guidance based on non-medical data. If a result suggests medical attention is needed, we say exactly that: see a doctor.",
      ],
    },
    {
      title: "Accuracy",
      body: [
        "We take care with claims. Certification status, named partners and published numbers are written as they stand today. ISO 27001, 45001 and 45003 are a certification track in progress with an accredited body. Not yet certified.",
      ],
    },
    {
      title: "Intellectual property",
      body: [
        "The Olynixx name, lockups, copy and method descriptions on this site belong to Olynixx. Do not copy them for another product or pitch without written permission.",
      ],
    },
    {
      title: "The form",
      body: [
        "Sending the contact form is a request for a conversation. It is not a booking until a coach confirms it.",
      ],
    },
  ],
} as const;

export const GOVERNANCE = {
  title: "Governance",
  lead: "Certificate numbers, scope and issue dates will live on this page when the certificates are issued.",
  status: "ISO 27001 · 45001 · 45003 — certification in progress with an accredited body. Not yet certified.",
  body: "Until then, the approved standards wording on Corporates, Technology and About is the only public statement. Certificate numbers, scope and issue dates will be published on this page when the certificates are issued — one place for a procurement reader to check.",
} as const;

export const THANK_YOU = {
  title: "We have your enquiry.",
  lead: "A coach will route this to the right conversation. Nobody sells you a programme from this page.",
  next: "Meanwhile, you can read how the method runs, or go back to the page you came from.",
} as const;
