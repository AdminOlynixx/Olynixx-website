/** Phase-1 routing keys. Door pages report separately via source. */
export const CTA_SOURCES = [
  "individual",
  "individual-intake",
  "corporate-athlete",
  "sport-athlete",
  "longevity",
  "athlete-referral",
  "praxis-certification",
  "club-licence",
  "corporate-pilot",
  "event",
  "government",
  "systems",
  "sean",
  "chapter-download",
  "sensor-waitlist",
] as const;

export type CtaSource = (typeof CTA_SOURCES)[number];

export const CONTACT_AUDIENCES = [
  { value: "individual", label: "Individual" },
  { value: "corporate-pilot", label: "Company" },
  { value: "government", label: "Government" },
  { value: "club-licence", label: "Gym, club or spa" },
  { value: "event", label: "Event or keynote" },
  { value: "praxis-certification", label: "Coach (Praxis)" },
  { value: "systems", label: "Recovery systems" },
] as const;

export type ContactAudience = (typeof CONTACT_AUDIENCES)[number]["value"];

const SOURCE_TO_AUDIENCE: Record<CtaSource, ContactAudience> = {
  individual: "individual",
  "individual-intake": "individual",
  "corporate-athlete": "individual",
  "sport-athlete": "individual",
  longevity: "individual",
  "athlete-referral": "club-licence",
  "praxis-certification": "praxis-certification",
  "club-licence": "club-licence",
  "corporate-pilot": "corporate-pilot",
  event: "event",
  government: "government",
  systems: "systems",
  sean: "individual",
  "chapter-download": "individual",
  "sensor-waitlist": "individual",
};

export function isCtaSource(value: string | null | undefined): value is CtaSource {
  return !!value && (CTA_SOURCES as readonly string[]).includes(value);
}

export function audienceFromSource(source: string | null): ContactAudience {
  if (isCtaSource(source)) return SOURCE_TO_AUDIENCE[source];
  if (CONTACT_AUDIENCES.some((item) => item.value === source)) {
    return source as ContactAudience;
  }
  return "individual";
}

export function contactHref(source: CtaSource, position = "primary"): string {
  return `/contact?source=${source}&pos=${encodeURIComponent(position)}`;
}

export function trackCta(event: string, payload: Record<string, string>) {
  if (typeof window === "undefined") return;
  const dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  dataLayer?.push({ event, ...payload });
}
