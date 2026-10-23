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
 * Site photography slots from the homepage brief (22 Oct 2026). Louis supplies the files.
 * A slot set to null renders nothing and leaves no gap, so pages look right before the photos arrive.
 * To place one: put the WebP in /public/images, then fill in { src, alt, width, height } here.
 * Specs: WebP, under 300 KB, 2400px wide for full-width slots, 1200px for cards, alt text on every image.
 * Never use stethoscopes, white coats, hospital rooms, blood tests or medical charts.
 */
export type SitePhoto = { src: string; alt: string; width: number; height: number };

export const SITE_PHOTOS: Record<
  | "hero" // right side of the hero, 2400 wide: employee at the MS Fit kiosk in an office lobby, mid-test. Real office, business clothes, face can be side-on.
  | "readiness" // 1200 wide: calm recovery moment, person resting in morning light. No beds, no hospital, no white coats.
  | "steps" // 2400 wide: phone showing the readiness report + laptop showing the Load & Risk dashboard. Demo data only.
  | "fieldGovernment" // 1200 wide: kiosk set-up on site. No faces, no logos, no government branding without approval.
  | "fieldClub" // 1200 wide: Karwan Ajman floor with the kiosk.
  | "fieldElite" // 1200 wide: athlete during testing.
  | "event" // 1200 wide: kiosk at a company event, people queuing. Shows "we come to you".
  | "book" // 1200 wide: book cover mock-up of Rest Is the New Sport (cover file from Louis).
  | "everyday", // 1200 wide: ordinary adult, 35-55, everyday clothes, at the kiosk or walking outside in the morning. Not sporty, not gym, not clinical.
  SitePhoto | null
> = {
  hero: null,
  readiness: null,
  steps: null,
  fieldGovernment: null,
  fieldClub: null,
  fieldElite: null,
  event: null,
  book: null,
  everyday: null,
};
