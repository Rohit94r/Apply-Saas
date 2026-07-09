import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blog", "/blog/"],
      disallow: ["/api/", "/dashboard/", "/admin/", "/sign-in/", "/sign-up/"]
    },
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
