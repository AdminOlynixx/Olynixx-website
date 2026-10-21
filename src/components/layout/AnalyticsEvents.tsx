"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/** Which contact-form source tag maps to which custom event. */
const SOURCE_EVENT: Record<string, string> = {
  "corporate-pilot": "cta_pilot",
  event: "cta_event",
  "individual-intake": "cta_intake",
  "praxis-certification": "cta_praxis",
  "sensor-waitlist": "sensor_waitlist",
};

/**
 * Cookieless custom events for Vercel Web Analytics, from one delegated click listener:
 * whatsapp_click, tel_click, mailto_click and the cta_* events for contact-form entry links.
 * form_submit is sent from the contact form itself.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      const href = a?.getAttribute("href");
      if (!a || !href) return;
      try {
        if (href.startsWith("tel:")) return track("tel_click");
        if (href.startsWith("mailto:")) return track("mailto_click");
        if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return track("whatsapp_click");
        const url = new URL(href, window.location.origin);
        if (url.origin === window.location.origin && url.pathname === "/contact") {
          const source = url.searchParams.get("source") ?? "";
          const event = SOURCE_EVENT[source];
          if (event) track(event, { position: url.searchParams.get("pos") ?? "" });
        }
      } catch {
        // Analytics must never get in the way of a click.
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
