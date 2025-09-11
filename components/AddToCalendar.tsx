// components/AddToCalendar.tsx
"use client";
import Link from "next/link";

function pad(n: number) { return String(n).padStart(2, "0"); }
function toUtcStamp(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

// Parse "10:00 AM – 12:00 PM" (en dash or hyphen)
function parseTimeLabel(label?: string): { sh?: number; sm?: number; eh?: number; em?: number } {
  if (!label) return {};
  const [a, b] = label.split(/–|-/).map(s => s.trim());
  const toHM = (s?: string) => {
    if (!s) return {};
    const m = s.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (!m) return {};
    let h = parseInt(m[1], 10);
    const min = m[2] ? parseInt(m[2], 10) : 0;
    const ap = m[3].toUpperCase();
    if (ap === "PM" && h !== 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;
    return { h, min };
  };
  const s = toHM(a);
  const e = toHM(b);
  return { sh: (s as any).h, sm: (s as any).min, eh: (e as any).h, em: (e as any).min };
}

// Interpret as local time, output correct UTC for URLs
function localToUtcISO(dateStr: string, h = 9, m = 0) {
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
}

export default function AddToCalendar({
  title, date, time, location, details, slug, timezone = "America/Los_Angeles"
}: {
  title: string;
  date: string;            // "YYYY-MM-DD"
  time?: string;           // "10:00 AM – 12:00 PM"
  location?: string;
  details?: string;
  slug: string;            // for your .ics route
  timezone?: string;       // for Google display (optional)
}) {
  const { sh, sm, eh, em } = parseTimeLabel(time);
  const startISO = localToUtcISO(date, typeof sh === "number" ? sh! : 9, typeof sm === "number" ? sm! : 0);
  const endISO   = typeof eh === "number" ? localToUtcISO(date, eh!, em || 0) : undefined;

  const datesParam = endISO
    ? `${toUtcStamp(new Date(startISO))}/${toUtcStamp(new Date(endISO))}`
    : `${toUtcStamp(new Date(startISO))}/${toUtcStamp(new Date(new Date(startISO).getTime() + 60*60*1000))}`; // default 1h

  const encoded = (s?: string) => encodeURIComponent(s ?? "");

  // Google Calendar
  const googleHref =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encoded(title)}` +
    `&dates=${datesParam}` +
    `&details=${encoded(details)}` +
    `&location=${encoded(location)}` +
    `&ctz=${encodeURIComponent(timezone)}`;

  // Outlook.com (consumer)
  const outlookLiveHref =
    `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent` +
    `&subject=${encoded(title)}` +
    `&startdt=${encodeURIComponent(startISO)}` +
    (endISO ? `&enddt=${encodeURIComponent(endISO)}` : ``) +
    `&body=${encoded(details)}` +
    `&location=${encoded(location)}`;

  // Office 365 / Outlook for work/school
  const outlookO365Href =
    `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent` +
    `&subject=${encoded(title)}` +
    `&startdt=${encodeURIComponent(startISO)}` +
    (endISO ? `&enddt=${encodeURIComponent(endISO)}` : ``) +
    `&body=${encoded(details)}` +
    `&location=${encoded(location)}`;

  // Yahoo
  // Yahoo needs start + duration OR end; we’ll pass duration if no end time was parsed
  const dur = endISO ? `` : `&dur=0100`; // 1 hour
  const yahooHref =
    `https://calendar.yahoo.com/?v=60&view=d&type=20` +
    `&title=${encoded(title)}` +
    `&st=${datesParam.split("/")[0]}` +
    (endISO ? `&et=${datesParam.split("/")[1]}` : dur) +
    `&desc=${encoded(details)}` +
    `&in_loc=${encoded(location)}`;

  // Apple: best is your .ics route (works on iOS/macOS)
  const appleHref = `/events/${slug}/event.ics`;

  return (
    <div className="flex flex-wrap gap-2">
      <a className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" href={googleHref} target="_blank" rel="noopener noreferrer">Add to Google</a>
      <a className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" href={outlookLiveHref} target="_blank" rel="noopener noreferrer">Add to Outlook.com</a>
      <a className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" href={outlookO365Href} target="_blank" rel="noopener noreferrer">Add to Office 365</a>
      <a className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" href={yahooHref} target="_blank" rel="noopener noreferrer">Add to Yahoo</a>
      <Link className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" href={appleHref} prefetch={false}>Download .ics (Apple)</Link>
    </div>
  );
}
