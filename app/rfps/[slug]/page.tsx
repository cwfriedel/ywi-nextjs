// app/rfps/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getRfpBySlug } from "@/lib/rfps";

function fmt(d: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(d));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const rfp = getRfpBySlug(params.slug);
  if (!rfp) return {};
  return {
    title: rfp.title,
    description: rfp.summary,
    alternates: { canonical: `/rfps/${rfp.slug}` },
    openGraph: { title: rfp.title, description: rfp.summary },
  };
}

export default function RfpPage({ params }: { params: { slug: string } }) {
  const rfp = getRfpBySlug(params.slug);
  if (!rfp) return null;

  const latestAddenda = [...rfp.addenda].sort(
    (a, b) => +new Date(b.dateISO) - +new Date(a.dateISO)
  ).slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6">
        <p className="text-sm uppercase tracking-wide text-gray-500">Request for Proposals</p>
        <h1 className="mt-2 text-3xl font-semibold">{rfp.title}</h1>
        <p className="mt-3 text-lg text-gray-700">{rfp.summary}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <h2 className="mb-3 text-xl font-medium">At a glance</h2>
          <ul className="space-y-2 text-sm">
            <li><strong>Due:</strong> {fmt(rfp.dueISO)}</li>
            {rfp.acres && <li><strong>Project area:</strong> {rfp.acres} acres</li>}
            {rfp.funder && <li><strong>Funding:</strong> {rfp.funder}</li>}
            {rfp.treatments?.length ? (
              <li><strong>Treatments:</strong> {rfp.treatments.join(", ")}</li>
            ) : null}
            <li>
              <strong>How to submit:</strong>{" "}
              <a className="underline" href={`mailto:${rfp.submitEmail}`}>{rfp.submitEmail}</a>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="mb-3 text-xl font-medium">Downloads</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>

<Link
  className="underline"
  href={rfp.pdfUrl}                 // e.g., "/files/rfp-inimim-phase-3.pdf"
  target="_blank"                   // ← open in new tab
  rel="noopener noreferrer"         // ← security/perf best practice
  prefetch={false}                  // ← don't prefetch large PDFs
>
  Full RFP (PDF)
</Link>

            </li>
          </ul>
          <div className="mt-4">
            <Link className="inline-block rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              href={`/rfps/${rfp.slug}/addenda`}>
              View all Addenda & Q&A
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border p-5">
        <h2 className="mb-3 text-xl font-medium">Addenda & Q&A (latest)</h2>
        {latestAddenda.length === 0 ? (
          <p className="text-sm text-gray-600">No addenda have been posted yet.</p>
        ) : (
          <ul className="space-y-4">
            {latestAddenda.map((a) => (
              <li key={a.id} className="text-sm">
                <div className="font-medium">{a.title}</div>
                <div className="text-gray-600">{fmt(a.dateISO)}</div>
                {a.body && <p className="mt-1">{a.body}</p>}
                {a.fileUrl && (
                  <div className="mt-1">
                    <Link className="underline" href={a.fileUrl}>Download</Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Link className="underline text-sm" href={`/rfps/${rfp.slug}/addenda`}>
            See all addenda & Q&A →
          </Link>
        </div>
      </section>
    </main>
  );
}
