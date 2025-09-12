// app/events/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events";            // adjust if your path is "@/lib/events/events"
import AddToCalendar from "@/components/AddToCalendar";   // <-- import at top (once)
import { jsonLdForEvent } from "@/lib/eventMetadata";

const DATE_OPTS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "long",
  day: "numeric",
  year: "numeric",
};

type Params = { params: { slug: string } };

// Display-only range if you have ISO times
function fmtRange(startISO?: string, endISO?: string) {
  if (!startISO) return "";
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;
  const optsDate: Intl.DateTimeFormatOptions = { weekday: "short", month: "long", day: "numeric", year: "numeric" };
  const optsTime: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };
  if (!end || start.toDateString() === end.toDateString()) {
    return `${start.toLocaleDateString(undefined, optsDate)} • ${start.toLocaleTimeString(undefined, optsTime)}${end ? `–${end.toLocaleTimeString(undefined, optsTime)}` : ""}`;
  }
  return `${start.toLocaleDateString(undefined, optsDate)} ${start.toLocaleTimeString(undefined, optsTime)} – ${end.toLocaleDateString(undefined, optsDate)} ${end.toLocaleTimeString(undefined, optsTime)}`;
}

// Metadata
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const e = getEventBySlug(params.slug);
  if (!e) return {};
  const venue = (e as any).venue ?? e.location;
  const desc =
    (e as any).summary ?? e.blurb ?? (e as any).description ?? (venue ? `Event at ${venue}` : "Event details");
  return {
    title: e.title,
    description: desc,
    alternates: { canonical: `/events/${params.slug}` },
    openGraph: { title: e.title, description: desc },
  };
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const e: any = getEventBySlug(params.slug);
  if (!e) return notFound();

  const slug = e.slug ?? params.slug;
  const venue = e.venue ?? e.location ?? "";

  // Prefer your label (date + time) for display; fall back to ISO range
  const dateObj = e.date ? new Date(e.date) : undefined;
  const dateLabel = dateObj ? dateObj.toLocaleDateString(undefined, DATE_OPTS) : "";
  const human =
    e.whenHuman ??
    (e.time && dateLabel
      ? `${dateLabel} • ${e.time}`
      : fmtRange(e.startISO ?? e.date ?? e.start, e.endISO ?? e.end));

  const metaLine = [human, venue].filter(Boolean).join(" · ");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-6">
        <Link href="/events" className="text-sm underline">
          &larr; Back to Events
        </Link>
      </nav>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-wide text-gray-500">Event</p>
        <h1 className="mt-1 text-3xl font-semibold">{e.title}</h1>
        {metaLine && <p className="mt-2 text-gray-700">{metaLine}</p>}
      </header>

      {e.image && (
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl">
          <Image src={e.image} alt={e.title} fill className="object-cover" />
        </div>
      )}

      {(e.summary || e.blurb || e.description) && (
        <article className="max-w-none leading-relaxed text-gray-800">
          <p>{e.summary ?? e.blurb ?? e.description}</p>
        </article>
      )}

      {/* Actions: Add-to-Calendar + Map */}
      <div className="mt-8 flex flex-col gap-3">
        <AddToCalendar
          title={e.title}
          date={e.date}                               // "YYYY-MM-DD"
          time={e.time}                               // "10:00 AM – 12:00 PM"
          location={venue}
          details={e.summary ?? e.blurb ?? e.description}
          slug={slug}                                 // used by /events/[slug]/event.ics
          timezone="America/Los_Angeles"
        />
        {venue && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(venue)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Open map
          </a>
        )}
      </div>

      {/* Details */}
      <section className="mt-10 rounded-2xl border p-5">
        <h2 className="text-lg font-medium">Details</h2>
        <dl className="mt-3 divide-y divide-gray-100">
          {human && (
            <div className="grid grid-cols-[8rem_1fr] gap-x-4 py-2">
              <dt className="text-gray-500">When</dt>
              <dd>{human}</dd>
            </div>
          )}
          {venue && (
            <div className="grid grid-cols-[8rem_1fr] gap-x-4 py-2">
              <dt className="text-gray-500">Where</dt>
              <dd>{venue}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdForEvent(e, slug)) }}
      />
    </main>
  );
}

