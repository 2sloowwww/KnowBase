import type { MetadataRoute } from "next";
import { getAllInvestigations } from "@/lib/data";

const SITE_URL = "https://knowbase.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/investigations`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/methodology`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const investigationRoutes: MetadataRoute.Sitemap = getAllInvestigations().map((inv) => ({
    url: `${SITE_URL}/investigations/${inv.slug}`,
    lastModified: inv.updatedDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...investigationRoutes];
}
