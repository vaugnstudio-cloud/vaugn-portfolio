import type { MetadataRoute } from "next";
import { detailProjects } from "@/data/projects";
import { insights } from "@/data/insights";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
    "/healthcare",
    "/hospitality",
    "/resources",
    "/insights",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = detailProjects.map((p) => ({
    url: `${SITE_URL}/work/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightRoutes = insights.map((i) => ({
    url: `${SITE_URL}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...insightRoutes];
}
