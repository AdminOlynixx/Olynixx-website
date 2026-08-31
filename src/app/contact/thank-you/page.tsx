import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/site/Section";
import { THANK_YOU } from "@/content/legal";

export const metadata: Metadata = {
  title: "Thank you",
  description: THANK_YOU.lead,
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Hero center compact>
      <p className="ol-eyebrow">Contact</p>
      <h1 className="ol-hero-title">{THANK_YOU.title}</h1>
      <p className="ol-lead">{THANK_YOU.lead}</p>
      <p className="ol-lead">{THANK_YOU.next}</p>
      <p className="ol-actions">
        <Link className="ol-btn ol-btn--primary" href="/">
          Home
        </Link>
        <Link className="ol-btn ol-btn--secondary" href="/individuals">
          For individuals
        </Link>
      </p>
    </Hero>
  );
}
