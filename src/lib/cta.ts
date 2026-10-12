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
] as const;

export type CtaSource = (typeof CTA_SOURCES)[number];

export const CONTACT_AUDIENCES = [
  { value: "individual", label: "Individual" },
  { value: "club-licence", label: "Gym or club" },
  { value: "corporate-pilot", label: "Corporate" },
  { value: "government", label: "Government" },
  { value: "praxis-certification", label: "Coach–certification" },
  { value: "event", label: "Event" },
  { value: "systems", label: "Systems" },
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
