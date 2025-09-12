// components/AddToCalendar.tsx
"use client";
import Link from "next/link";
import { parseTimeLabel, localToUtcISO } from "@/lib/eventTime";

function pad(n: number) { return String(n).padStart(2, "0"); }
function toUtcStamp(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
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

  const urlBuilders = {
    google: () =>
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encoded(title)}` +
      `&dates=${datesParam}` +
      `&details=${encoded(details)}` +
      `&location=${encoded(location)}` +
      `&ctz=${encodeURIComponent(timezone)}`,
    outlookLive: () =>
      `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent` +
      `&subject=${encoded(title)}` +
      `&startdt=${encodeURIComponent(startISO)}` +
      (endISO ? `&enddt=${encodeURIComponent(endISO)}` : ``) +
      `&body=${encoded(details)}` +
      `&location=${encoded(location)}`,
    outlookO365: () =>
      `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent` +
      `&subject=${encoded(title)}` +
      `&startdt=${encodeURIComponent(startISO)}` +
      (endISO ? `&enddt=${encodeURIComponent(endISO)}` : ``) +
      `&body=${encoded(details)}` +
      `&location=${encoded(location)}`,
    yahoo: () => {
      const dur = endISO ? `` : `&dur=0100`;
      return (
        `https://calendar.yahoo.com/?v=60&view=d&type=20` +
        `&title=${encoded(title)}` +
        `&st=${datesParam.split("/")[0]}` +
        (endISO ? `&et=${datesParam.split("/")[1]}` : dur) +
        `&desc=${encoded(details)}` +
        `&in_loc=${encoded(location)}`
      );
    },
  } as const;

  const labels: Record<keyof typeof urlBuilders, string> = {
    google: "Add to Google",
    outlookLive: "Add to Outlook.com",
    outlookO365: "Add to Office 365",
    yahoo: "Add to Yahoo",
  };

  // Apple: best is your .ics route (works on iOS/macOS)
  const appleHref = `/events/${slug}/event.ics`;

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(urlBuilders).map(([key, build]) => (
        <a
          key={key}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
          href={build()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {labels[key as keyof typeof labels]}
        </a>
      ))}
      <Link
        className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        href={appleHref}
        prefetch={false}
      >
        Download .ics (Apple)
      </Link>
    </div>
  );
}
