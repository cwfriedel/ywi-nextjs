import type { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
import { allEvents } from "@/lib/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.yubawatershedinstitute.org";
  return [
    { url: `${base}/`, lastModified: new Date() },
...allProjects().map(p => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() })),
...allEvents().map(e => ({ url: `${base}/events/${e.slug ?? e.id}`, lastModified: new Date(e.date) })),
  ];
}
