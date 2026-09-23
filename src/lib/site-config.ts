/** Server-only site configuration. Signed public contact and entity have defaults so staging matches local. */

function envOr(key: string, fallback = ""): string {
  return process.env[key]?.trim() || fallback;
}

export function siteUrl(): string {
  return process.env.SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

export function noIndexPublicSite(): boolean {
  return process.env.NOINDEX !== "false";
}

/** HOLD until Louis confirms the partnership in writing. Default: unpublished. */
export function publishPureHealth(): boolean {
  return process.env.PUBLISH_PUREHEALTH === "true";
}

/** HOLD until Louis confirms vs Pura Longevity / PureHealth. Default: unpublished. */
export function publishLongevity(): boolean {
  return process.env.PUBLISH_LONGEVITY === "true";
}

export function publishIsoBadges(): boolean {
  return process.env.PUBLISH_ISO_BADGES === "true";
}

/** Rise Up Lifestyle Coaching L.L.C. fronts the site until the Olynixx entity at rebrand. Off only when set false. */
export function publishEntity(): boolean {
  return process.env.PUBLISH_ENTITY !== "false";
}

/** SW-DC. Partner name and first-in-the-Gulf DC-potential claim. */
export function publishDc(): boolean {
  return process.env.PUBLISH_DC === "true";
}

/** SW-BEST. B-E-St name and branded recovery. */
export function publishBest(): boolean {
  return process.env.PUBLISH_BEST === "true";
}

/** SW-PEMF. PEMF recovery system. No copy until the agreement signs. */
export function publishPemf(): boolean {
  return process.env.PUBLISH_PEMF === "true";
}

/** Praxis in header and footer. Stay false until CPD recognition is signed. */
export function publishPraxis(): boolean {
  return process.env.PUBLISH_PRAXIS === "true";
}

/** SW-SEAN. Ambassador band and /sean. */
export function publishSean(): boolean {
  return process.env.PUBLISH_SEAN === "true";
}

/** PHASE-SHOP. No live shop links until flipped. */
export function phaseShop(): boolean {
  return process.env.PHASE_SHOP === "true";
}

export type EntityIdentity = {
  legalName: string;
  licence: string;
  licenceIssuer: string;
  trn: string;
  address: string;
  jurisdiction: string;
  dataController: string;
};

const EMPTY_ENTITY: EntityIdentity = {
  legalName: "",
  licence: "",
  licenceIssuer: "",
  trn: "",
  address: "",
  jurisdiction: "",
  dataController: "",
};

function readEntityIdentity(): EntityIdentity {
  return {
    legalName: envOr("SITE_ENTITY_NAME", "Rise Up Lifestyle Coaching L.L.C."),
    licence: envOr("SITE_ENTITY_LICENCE", "860518"),
    licenceIssuer: envOr("SITE_ENTITY_LICENCE_ISSUER", "DED-Dubai"),
    trn: envOr("SITE_ENTITY_TRN", "100547489300003"),
    address: envOr(
      "SITE_ENTITY_ADDRESS",
      "Office F28, Commercial-8, Saih Shuaib 2, Dubai Industrial City, Dubai, United Arab Emirates",
    ),
    jurisdiction: envOr("SITE_ENTITY_JURISDICTION", "Dubai, United Arab Emirates"),
    dataController: envOr("SITE_ENTITY_DATA_CONTROLLER", "Rise Up Lifestyle Coaching L.L.C."),
  };
}

/** Public pages. Hidden only when PUBLISH_ENTITY=false. */
export function entityIdentity(): EntityIdentity {
  return publishEntity() ? readEntityIdentity() : EMPTY_ENTITY;
}

export type PublicContact = {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapUrl: string;
  sla: string;
  calendar: string;
  location: string;
};

export function publicContact(): PublicContact {
  return {
    email: envOr("SITE_CONTACT_EMAIL", "olynixx@outlook.com"),
    phone: envOr("SITE_CONTACT_PHONE", "058 599 7620"),
    whatsapp: envOr("SITE_CONTACT_WHATSAPP", "058 599 7620"),
    address: envOr("SITE_CONTACT_ADDRESS"),
    mapUrl: envOr("SITE_CONTACT_MAP"),
    sla: envOr("SITE_CONTACT_SLA"),
    calendar: envOr("SITE_CONTACT_CALENDAR"),
    location: "Dubai, UAE",
  };
}

function contactDigits(value: string): string {
  return value.replace(/[^\d]/g, "");
}

/** Same stored number. wa.me needs the country code when the public value is a UAE 0-number. */
export function whatsappHref(value: string): string {
  let digits = contactDigits(value);
  if (!digits) return value;
  if (digits.startsWith("0")) digits = `971${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

export function telHref(value: string): string {
  const digits = contactDigits(value);
  return digits ? `tel:${digits}` : value;
}
