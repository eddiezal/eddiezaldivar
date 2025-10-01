import type { MetadataRoute } from "next";

const site = "https://www.eddiezaldivar.com";

// If you add new top-level pages, include them here.
const routes = [
  "",           // /
  "work",
  "essays",
  "hire",
  "about",
  "contact",
  "privacy",
  "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${site}/${path}`.replace(/\/$/, ""), // tidy double slashes
    lastModified: now,
    changeFrequency: path ? "weekly" : "daily",
    priority: path ? 0.7 : 1.0,
  }));
}
