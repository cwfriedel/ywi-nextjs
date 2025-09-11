// app/rfps/[slug]/addenda/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getRfpBySlug } from "@/lib/rfps";

function fmt(d: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" })
    .format(new Date(d));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const rfp = getRfpBySlug(params.slug);
  return {
    title: rfp ? `Addenda & Q&A – ${rfp.title}` : "Addenda & Q&A",
    alternates: { canonical: `/rfps/${params.slug}/addenda` },
  };
}

export default function RfpAddendaPage({ params }: { params: { slug: string } }) {
  const rfp = getRfpBySlug(params.slug);
  if (!rfp) return null;

  const items = [...rfp.addenda].sort((a, b) => +new Date(b.dateISO) - +new Date(a.dateISO));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link className="text-sm underline" href={`/rfps/${rfp.slug}`}>&larr; Back to RFP</Link>
      <h1 className="mt-2 text-2xl font-semibold">Addenda & Q&A</h1>
      <p className="mt-1 text-gray-700">{rfp.title}</p>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-gray-600">No addenda posted.</p>
      ) : (
        <ul className="mt-6 space-y-6">
          {items.map((a) => (
            <li key={a.id} className="rounded-xl border p-4">
              <div className="text-sm text-gray-600">{fmt(a.dateISO)}</div>
              <h2 className="mt-1 text-lg font-medium">{a.title}</h2>
              {a.body && <p className="mt-2 text-sm">{a.body}</p>}
              {a.fileUrl && (
                <div className="mt-2">
                  <Link className="underline text-sm" href={a.fileUrl}>Download file</Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
