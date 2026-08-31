/** Verbatim footer line. Sentence case. Never tracked uppercase. */
export const NON_MEDICAL_DISCLAIMER =
  "Olynixx provides lifestyle guidance based on non-medical data. No diagnosis, no treatment, no clinical claims. All testing devices used are non-medical. If a result suggests medical attention is needed, we say exactly that: see a doctor.";

export const NON_MEDICAL_STATEMENT =
  "All devices used by Olynixx are non-medical. Olynixx provides lifestyle guidance based on non-medical data — no diagnosis, no treatment, no clinical claims. If testing surfaces something that needs medical attention, we say exactly that: see a doctor.";

/** Approved ISO block — long form. Status line is never separated from the names. */
export const ISO_LONG = {
  eyebrow: "Built to be audited",
  title: "The standards layer",
  intro:
    "Workforce health data deserves more than good intentions. Olynixx is running a formal certification track with an accredited certification body, covering:",
  items: [
    "ISO/IEC 27001 — information security management",
    "ISO 45001 — occupational health and safety management",
    "ISO 45003 — psychological health and safety at work",
  ],
  status: "Status: certification in progress. Not yet certified. We will say so on this page until the certificates are issued.",
  close:
    "Alongside it we are completing registration under the Abu Dhabi Public Health Centre's occupational-health practitioner framework. Individual results belong to the individual, leadership reporting is anonymised by architecture, data is hosted in the UAE, and every change is governed and logged.",
} as const;

export const ISO_SHORT =
  "ISO 27001 · 45001 · 45003 — certification in progress with an accredited body. Not yet certified.";

export const ISO_FOLLOW =
  "We built the system to survive an audit, because that is what your compliance team should demand of anyone touching workforce health.";
