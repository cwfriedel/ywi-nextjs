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
export function eventSlug(e: EventItem): string {
  if (e.slug) return e.slug.toLowerCase();
  if (e.id) return e.id.toLowerCase();
  return slugify(e.title);
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


