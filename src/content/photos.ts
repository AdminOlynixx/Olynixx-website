/** Founder photos. Alt text per the website brief. The sensor-session photo is on hold (partner branding) and is not in the repo. */

export const FOUNDER_PHOTOS = {
  headshot: {
    src: "/images/founder/founder-headshot.webp",
    alt: "Olynixx founder",
    width: 1149,
    height: 1369,
  },
  msfit: {
    src: "/images/founder/founder-msfit-kiosk.webp",
    alt: "Olynixx founder beside an MS Fit readiness kiosk",
    width: 1125,
    height: 1600,
  },
  oxyterra: {
    src: "/images/founder/founder-oxyterra-rs.webp",
    alt: "Olynixx founder beside an Oxyterra RS altitude training system",
    width: 1148,
    height: 1599,
  },
} as const;

/**
 * Site photography slots (Louis's tasks doc, 25 Oct 2026).
 *
 * Every slot points at a FIXED file name in /public/images. Today most of those files are flat cream
 * placeholders at the final crop. To go live with a real photo, replace the file with the real WebP
 * under the same name: no code change. Keep the same pixel size.
 *
 * Crops: "hero" slots 3:2 at 2400 x 1600, "card" slots 4:3 at 1200 x 900. WebP, under 300 KB.
 * Only images Louis sends for this brief. No stock photos, no logos or readable signage, no client data,
 * no medical imagery. The kiosk must be the Olynixx device.
 */
export type SitePhoto = { src: string; alt: string; width: number; height: number; ratio: "3/2" | "4/3" };

const HERO = { width: 2400, height: 1600, ratio: "3/2" } as const;
const CARD = { width: 1200, height: 900, ratio: "4/3" } as const;

export const SITE_PHOTOS = {
  // 1. Home hero, right side (replaces the globe)
  hero: {
    src: "/images/hero-kiosk-office.webp",
    alt: "Employee taking a one-minute readiness test at an Olynixx kiosk in an office lobby",
    ...HERO,
  },
  // 2. Home section 3, The Readiness Principle
  readiness: {
    src: "/images/readiness-recovery.webp",
    alt: "Person resting by a window in morning light",
    ...CARD,
  },
  // 3. Home section 5, Four steps. One loop.
  steps: {
    src: "/images/four-steps-phone-laptop.webp",
    alt: "Readiness report on a phone and Load & Risk dashboard on a laptop",
    ...CARD,
  },
  // 4. Home section 7, field card: Government
  fieldGovernment: {
    src: "/images/field-government.webp",
    alt: "Olynixx kiosk set up in a government building foyer",
    ...CARD,
  },
  // 5. Home section 7, field card: Testing club
  fieldClub: {
    src: "/images/field-karwan.webp",
    alt: "Olynixx kiosk on the gym floor at Karwan Health Club, Ajman",
    ...CARD,
  },
  // 6. Home section 7, field card: Elite sport
  fieldElite: {
    src: "/images/field-elite-sport.webp",
    alt: "Athlete during readiness testing with Olynixx coach",
    ...CARD,
  },
  // 7. Home section 6, 25 tests event offer
  event: {
    src: "/images/event-kiosk.webp",
    alt: "Employees queuing for readiness tests at a company event",
    ...CARD,
  },
  // 8. /individuals/everyday-health, hero
  everyday: {
    src: "/images/everyday-health-hero.webp",
    alt: "Adult walking outside in the early morning",
    ...HERO,
  },
  // 9. Home section 11 and About: Rest Is the New Sport. LIVE (real image, do not crop further).
  book: {
    src: "/images/book-rest-is-the-new-sport.webp",
    alt: "Rest Is the New Sport by Jef Louis Geys",
    ...CARD,
  },
} satisfies Record<string, SitePhoto>;
