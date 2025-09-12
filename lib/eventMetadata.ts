import { siteConfig } from "./siteConfig";

// Display-only range if you have ISO times
export function fmtRange(startISO?: string, endISO?: string) {
  if (!startISO) return "";
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;
  const optsDate: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const optsTime: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };
  if (!end || start.toDateString() === end.toDateString()) {
    return `${start.toLocaleDateString(undefined, optsDate)} • ${start.toLocaleTimeString(undefined, optsTime)}${
      end ? `–${end.toLocaleTimeString(undefined, optsTime)}` : ""
    }`;
  }
  return `${start.toLocaleDateString(undefined, optsDate)} ${start.toLocaleTimeString(
    undefined,
    optsTime,
  )} – ${end.toLocaleDateString(undefined, optsDate)} ${end.toLocaleTimeString(undefined, optsTime)}`;
}

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
