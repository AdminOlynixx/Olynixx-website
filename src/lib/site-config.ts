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

/** HOLD until Jef confirms the launch name (or this one) may go public. */
export function publishEntity(): boolean {
  return process.env.PUBLISH_ENTITY === "true";
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
    location: "Dubai, UAE",
  };
}
