import { noIndexPublicSite } from "@/lib/site-config";

export default function robots() {
  if (noIndexPublicSite()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" } };
}
