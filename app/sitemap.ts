import type { MetadataRoute } from "next";
import { getAllProjects, getAllWriting } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://wanweileee.github.io/my-portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, writing] = await Promise.all([
    getAllProjects(),
    getAllWriting(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/writing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.frontmatter.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const writingRoutes: MetadataRoute.Sitemap = writing.map((p) => ({
    url: `${BASE_URL}/writing/${p.frontmatter.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
