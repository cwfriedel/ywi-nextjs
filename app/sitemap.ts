import type { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
import { allEvents } from "@/lib/events.server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.yubawatershedinstitute.org";
  const events = await allEvents();
  return [
    { url: `${base}/`, lastModified: new Date() },
    ...allProjects().map(p => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() })),
    ...events.map(e => ({ url: `${base}/events/${e.slug ?? e.id}`, lastModified: new Date(e.date) })),
  ];
}
