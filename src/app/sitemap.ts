import type { MetadataRoute } from "next";
import { publishLongevity, publishPraxis, publishSean, siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "/",
    "/corporates",
    "/corporates/events",
    "/corporates/government",
    "/gyms",
    "/individuals",
    "/individuals/everyday-health",
    "/individuals/corporate-athlete",
    "/individuals/sport-athlete",
    ...(publishLongevity() ? ["/individuals/longevity"] : []),
    ...(publishSean() ? ["/sean"] : []),
    ...(publishPraxis() ? ["/praxis"] : []),
    "/technology",
    "/about",
    "/contact",
    "/governance",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
