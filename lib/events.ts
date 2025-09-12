export type EventItem = {
  id: string;
  slug?: string;
  title: string;
  date: string;        // ISO date, e.g. "2025-11-08"
  time?: string;       // "10:00 AM – 2:00 PM"
  location?: string;
  blurb?: string;
  url?: string;        // optional detail/RSVP link
  contactName?: string;   // NEW (optional)
  contactEmail?: string;  // NEW (optional)
  contactPhone?: string;  // NEW (optional)
  contactUrl?: string;    // NEW (optional)
};

export const EVENTS: EventItem[] = [
  // Example seed data; replace with your real events
//  {
//    id: "fungus-foray-2026",
//    title: "Annual Fungus Foray",
//    date: "2025-11-08",
//    time: "9:00 AM – 2:00 PM",
//    location: "Nevada City, CA",
//    blurb: "Guided mushroom identification and forest ecology.",
//    url: "/events/fungus-foray",
//  },
//  {
//    id: "workday-fuels-1101",
//    title: "Stewardship Workday: Fuels Reduction",
//    date: "2025-10-12",
//    time: "9:00 AM – 12:00 PM",
//    location: "Yuba River watershed",
//    blurb: "Hands-on fuels reduction to improve forest health.",
//  },
  // …
  {
    id: "bid-walk-2025",
    title: "Pre-Proposal Field Meeting",
    date: "2025-09-17",
    time: "10:00 AM – 12:00 PM",
    location: "17894 Tyler Foote Rd, Nevada City, CA 95959",
    blurb: "For contractors bidding on 263-acre timber harvest.",
    url: "/events/bid-walk-2025",
    contactName: "Chris Friedel",
    contactEmail: "chris@yubawatershedinstitute.org"
  }
];
// Create a safe, URL-friendly slug
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")  // remove punctuation
    .replace(/\s+/g, "-")      // spaces → dashes
    .replace(/-+/g, "-");      // collapse dashes
}

// Determine the canonical slug for an event
function eventSlug(e: EventItem): string {
  if (e.slug) return e.slug.toLowerCase();
  if (e.id) return e.id.toLowerCase();
  return slugify(e.title);
}

// Precompute a lookup table of events by slug
const EVENT_LOOKUP: Record<string, EventItem> = Object.fromEntries(
  EVENTS.map(e => [eventSlug(e), e])
);

export function getEventBySlug(slug: string): EventItem | undefined {
  return EVENT_LOOKUP[slug.toLowerCase()];
}


export function sortByDateAsc<T extends { date: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function eventsForMonth<T extends { date: string }>(list: T[], year: number, month: number): T[] {
  return sortByDateAsc(
    list.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
  );
}

export function upcoming(list: EventItem[], from = new Date()) {
  const t0 = new Date(from.toDateString()).getTime();
  return sortByDateAsc(list).filter(e => new Date(e.date).getTime() >= t0);
}

export function nextN(list: EventItem[], n = 3) {
  return upcoming(list).slice(0, n);
}

export function allEvents(): EventItem[] { return EVENTS; }

