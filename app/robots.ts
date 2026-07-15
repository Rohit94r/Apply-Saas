import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/blog",
        "/blog/",
        "/prepare",
        "/prepare/",
        "/pyqs",
        "/pyqs/",
        "/mock-interview",
        "/mock-interview/"
      ],
      disallow: ["/api/", "/dashboard/", "/admin/", "/sign-in/", "/sign-up/", "/downloads"]
    },
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
