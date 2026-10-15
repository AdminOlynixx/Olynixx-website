import type { Metadata } from "next";

/** Default share card: 1200 x 630, brand green, logo and the Olynixx line. */
export const OG_IMAGE = {
  url: "/brand/olynixx-og-card.png",
  width: 1200,
  height: 630,
  alt: "Olynixx. Readiness + Recovery = Perform",
} as const;

/**
 * Adds canonical, Open Graph and Twitter tags to a page's metadata.
 * Next replaces (not merges) openGraph per page, so every page builds its own set here.
 * `path` is the page path, for example "/corporates". Resolved against metadataBase in the root layout.
 */
export function withSocial(meta: Metadata, path: string): Metadata {
  const title =
    typeof meta.title === "string"
      ? meta.title
      : meta.title && "absolute" in meta.title
        ? meta.title.absolute
        : undefined;
  const description = meta.description ?? undefined;

  return {
    ...meta,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: "Olynixx",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
