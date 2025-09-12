// app/events/[slug]/event.ics/route.ts
import { NextRequest } from "next/server";
import { getEventBySlug } from "@/lib/events"; // adjust if your file is "@/lib/events/events"
import { parseTimeLabel, localToUtcISO, toICSDate } from "@/lib/eventTime";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const e: any = getEventBySlug(params.slug);
  if (!e) return new Response("Not found", { status: 404 });

  // Build start/end from your data (date + time), with fallbacks
  const { sh, sm, eh, em } = parseTimeLabel(e.time);
  const startISO =
    e.startISO ??
    (e.date && typeof sh === "number" ? localToUtcISO(e.date, sh!, sm!) : e.date ? localToUtcISO(e.date, 9, 0) : undefined);
  const endISO =
    e.endISO ??
    (e.date && typeof eh === "number" ? localToUtcISO(e.date, eh!, em!) : undefined);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//YWI//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${(e.id ?? e.slug ?? params.slug)}@ywi`,
    ...(startISO ? [`DTSTART:${toICSDate(startISO)}`] : []),
    ...(endISO ? [`DTEND:${toICSDate(endISO)}`] : []),
    `SUMMARY:${e.title ?? "Event"}`,
    e.location || e.venue ? `LOCATION:${(e.location ?? e.venue).toString().replace(/\n/g, "\\n")}` : "",
    (e.description || e.blurb) ? `DESCRIPTION:${(e.description ?? e.blurb).toString().replace(/\n/g, "\\n")}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");

  return new Response(lines, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="${(e.slug ?? e.id ?? "event")}.ics"`,
      "cache-control": "no-store",
    },
  });
}
