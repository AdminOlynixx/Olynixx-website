import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/site/Motion";
import { JsonLd } from "@/components/site/JsonLd";
import { organizationJsonLd } from "@/lib/json-ld";
import { noIndexPublicSite, publishLongevity, siteUrl } from "@/lib/site-config";
import "@/styles/olynixx-fonts.css";
import "@/styles/olynixx-tokens.css";
import "@/styles/olynixx-base.css";
import "@/styles/site.css";

const url = siteUrl();
const title = "Olynixx | Readiness + Recovery = Perform";
const description =
  "Olynixx measures what your body can actually deliver today — and coaches the decisions that change it. Tested, not guessed. Verified by retest.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s | Olynixx",
  },
  description,
  applicationName: "Olynixx",
  icons: {
    icon: [{ url: "/brand/olynixx-favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/olynixx-appicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url,
    siteName: "Olynixx",
    title,
    description,
    images: [{ url: "/brand/olynixx-og-card.png", width: 1200, height: 630, alt: "Olynixx" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/olynixx-og-card.png"],
  },
  robots: noIndexPublicSite()
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="ol-motion">
      <head>
        <link
          rel="preload"
          href="/fonts/Newsreader-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <noscript>
          <style>{`.ol-section > .ol-container { opacity: 1 !important; transform: none !important; animation: none !important; pointer-events: auto !important; }`}</style>
        </noscript>
        <a className="ol-skip" href="#content">
          Skip to content
        </a>
        <Header longevityLive={publishLongevity()} />
        <JsonLd data={organizationJsonLd()} />
        <main id="content" className="ol-main">
          {children}
        </main>
        <Motion />
        <Footer />
      </body>
    </html>
  );
}
