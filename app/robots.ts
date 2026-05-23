import type { MetadataRoute } from "next";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/admin/", "/sign-in/", "/sign-up/"]
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: seoConfig.url
  };
}
