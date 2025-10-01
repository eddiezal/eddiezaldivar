import type { MetadataRoute } from "next";

const site = "https://www.eddiezaldivar.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/drafts"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
