import { phaseShop } from "@/lib/site-config";

/** Pre-built shop paths. Returns null until PHASE_SHOP is flipped. */
export function shopHref(path: string, campaign: string, content: string): string | null {
  if (!phaseShop()) return null;
  const params = new URLSearchParams({
    utm_source: "olynixx-site",
    utm_medium: "referral",
    utm_campaign: campaign,
    utm_content: content,
  });
  return `${path}?${params.toString()}`;
}
