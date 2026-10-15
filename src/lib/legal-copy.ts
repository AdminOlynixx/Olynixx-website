/** Verbatim footer line. Sentence case. Never tracked uppercase. */
export const NON_MEDICAL_DISCLAIMER =
  "Olynixx provides lifestyle guidance based on non-medical data. No diagnosis, no treatment, no clinical claims. We operate our instruments in non-medical settings only and make no diagnostic claims from them. If a result suggests medical attention is needed, we say exactly that: see a doctor.";

export const NON_MEDICAL_STATEMENT =
  "The manufacturer of our readiness kiosk has confirmed that MS FIT is classified as General Wellness, not a medical device under EU Regulation 2017/745, and that declaration is on file. We operate accordingly: the kiosk is used for readiness and lifestyle guidance, never for diagnosis.";

/** Approved ISO block. Long form. Status line is never separated from the names. */
export const ISO_LONG = {
  eyebrow: "Built to be audited",
  title: "The standards layer",
  intro:
    "Workforce health data deserves more than good intentions. Olynixx is running a formal certification track with an accredited certification body, covering:",
  items: [
    "ISO/IEC 27001. Information security management",
    "ISO 45001. Occupational health and safety management",
    "ISO 45003. Psychological health and safety at work",
  ],
  status: "Status: certification in progress. Not yet certified. We will say so on this page until the certificates are issued.",
  close:
    "Alongside it we are completing registration under the Abu Dhabi Public Health Centre's occupational-health practitioner framework. Individual results belong to the individual, leadership reporting is anonymised by architecture, and data is hosted in the UAE.",
} as const;

export const ISO_SHORT =
  "ISO 27001 · 45001 · 45003. Certification in progress with an accredited body. Not yet certified. Scope: workforce readiness testing and reporting.";

export const ISO_FOLLOW =
  "We built the system to survive an audit, because that is what your compliance team should demand of anyone touching workforce health.";
