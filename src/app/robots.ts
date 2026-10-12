import type { MetadataRoute } from "next";
import { noIndexPublicSite, siteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (noIndexPublicSite()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
