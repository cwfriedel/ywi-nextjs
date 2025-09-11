// app/events/[slug]/event.ics/route.ts
import { NextRequest } from "next/server";
import { getEventBySlug } from "@/lib/events"; // adjust if your file is "@/lib/events/events"

function parseTimeLabel(label?: string): { sh?: number; sm?: number; eh?: number; em?: number } {
  if (!label) return {};
  const [a, b] = label.split(/–|-/).map(s => s.trim()); // allow en dash or hyphen
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

function localIso(dateStr: string, h = 9, m = 0) {
  // Interpret as LOCAL time then convert to UTC ISO (so ICS is correct everywhere)
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace(".000Z", "Z");
}

function toICSDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const e: any = getEventBySlug(params.slug);
  if (!e) return new Response("Not found", { status: 404 });

  // Build start/end from your data (date + time), with fallbacks
  const { sh, sm, eh, em } = parseTimeLabel(e.time);
  const startISO =
    e.startISO ??
    (e.date && typeof sh === "number" ? localIso(e.date, sh!, sm!) : e.date ? localIso(e.date, 9, 0) : undefined);
  const endISO =
    e.endISO ??
    (e.date && typeof eh === "number" ? localIso(e.date, eh!, em!) : undefined);

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
