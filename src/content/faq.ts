/**
 * FAQ entries per page, rendered as an on-page FAQ and as FAQPage structured data.
 * Louis approves the wording first (client copy rules apply: no medical-sounding claims).
 * An empty list renders nothing, so pages are unchanged until entries are added.
 */
export type FaqItem = { q: string; a: string };

export const FAQ: Record<"home" | "corporates" | "everydayHealth", readonly FaqItem[]> = {
  home: [],
  corporates: [],
  everydayHealth: [],
};
