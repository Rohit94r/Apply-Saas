import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.title,
    short_name: seoConfig.name,
    description: seoConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e9",
    theme_color: "#184f7d",
    icons: [
      {
        src: "/symbol.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
