import { siteConfig } from "./siteConfig";

export function jsonLdForEvent(e: any, slug: string) {
  const start = e.startISO ?? e.date ?? e.start;
  const end = e.endISO ?? e.end ?? e.date;
  const location = e.venue ?? e.location ?? "";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: start,
    endDate: end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: location ? { "@type": "Place", name: location } : undefined,
    organizer: { "@type": "Organization", name: "Yuba Watershed Institute" },
    url: `${siteConfig.url}/events/${slug}`,
    description: e.summary ?? e.blurb ?? e.description ?? "",
  };
}
