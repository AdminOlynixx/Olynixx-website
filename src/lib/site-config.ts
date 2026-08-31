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

export type EntityIdentity = {
  legalName: string;
  licence: string;
  trn: string;
  address: string;
};

export function entityIdentity(): EntityIdentity {
  return {
    legalName: process.env.SITE_ENTITY_NAME?.trim() || "",
    licence: process.env.SITE_ENTITY_LICENCE?.trim() || "",
    trn: process.env.SITE_ENTITY_TRN?.trim() || "",
    address: process.env.SITE_ENTITY_ADDRESS?.trim() || "",
  };
}

export function publicContact(): { email: string; phone: string; location: string } {
  return {
    email: process.env.SITE_CONTACT_EMAIL?.trim() || "",
    phone: process.env.SITE_CONTACT_PHONE?.trim() || "",
    location: "Dubai, UAE",
  };
}
