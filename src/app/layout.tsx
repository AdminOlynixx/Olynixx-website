import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";
import { PageTransition } from "@/components/motion/PageTransition";
import { OrgJsonLd } from "@/components/layout/OrgJsonLd";
import { noIndexPublicSite, siteUrl } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/seo";

const newsreader = localFont({
  src: [
    { path: "../../public/fonts/Newsreader-Variable.woff2", style: "normal" },
    { path: "../../public/fonts/Newsreader-Italic-Variable.woff2", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = localFont({
  src: [
    { path: "../../public/fonts/IBMPlexSans-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/IBMPlexSans-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/IBMPlexSans-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "../../public/fonts/IBMPlexMono-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/IBMPlexMono-Medium.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

const DEFAULT_TITLE = "Olynixx | Readiness + Recovery = Perform";
const DEFAULT_DESCRIPTION =
  "Olynixx measures what your body can actually deliver today. Then it coaches the decisions that change it. Tested, not guessed. Verified by retest.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    type: "website",
    siteName: "Olynixx",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  // Belt and braces: preview and staging deployments also say noindex in the page head.
  robots: noIndexPublicSite() ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <OrgJsonLd />
        <SmoothScroll />
        <Cursor />
        <SceneBackdrop />
        <PageTransition />
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
