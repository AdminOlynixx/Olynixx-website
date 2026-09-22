/** Server-only site configuration. Empty strings ship as placeholders, never invented names. */

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

/** Rise Up Lifestyle Coaching L.L.C. fronts the site until the Olynixx entity at rebrand. */
export function publishEntity(): boolean {
  return process.env.PUBLISH_ENTITY === "true";
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
    legalName: process.env.SITE_ENTITY_NAME?.trim() || "",
    licence: process.env.SITE_ENTITY_LICENCE?.trim() || "",
    licenceIssuer: process.env.SITE_ENTITY_LICENCE_ISSUER?.trim() || "",
    trn: process.env.SITE_ENTITY_TRN?.trim() || "",
    address: process.env.SITE_ENTITY_ADDRESS?.trim() || "",
    jurisdiction: process.env.SITE_ENTITY_JURISDICTION?.trim() || "",
    dataController: process.env.SITE_ENTITY_DATA_CONTROLLER?.trim() || "",
  };
}

/** Public pages. Empty until PUBLISH_ENTITY=true. Never invent a registration status. */
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
    email: process.env.SITE_CONTACT_EMAIL?.trim() || "",
    phone: process.env.SITE_CONTACT_PHONE?.trim() || "",
    whatsapp: process.env.SITE_CONTACT_WHATSAPP?.trim() || "",
    address: process.env.SITE_CONTACT_ADDRESS?.trim() || "",
    mapUrl: process.env.SITE_CONTACT_MAP?.trim() || "",
    sla: process.env.SITE_CONTACT_SLA?.trim() || "",
    calendar: process.env.SITE_CONTACT_CALENDAR?.trim() || "",
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
