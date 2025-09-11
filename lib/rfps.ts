// lib/rfps.ts
export type Addendum = {
  id: string;
  dateISO: string;       // e.g., "2025-09-25T23:59:00Z"
  title: string;
  body?: string;         // optional in-page text
  fileUrl?: string;      // optional PDF/doc link
};

export type Rfp = {
  slug: string;
  title: string;
  summary: string;
  dueISO: string;        // submission deadline (UTC ISO string)
  submitEmail: string;
  pdfUrl: string;        // link to full PDF
  acres?: number | string;
  funder?: string;
  treatments?: string[];
  status: "open" | "closed" | "awarded";
  updatedAt: string;     // for sitemap/SEO
  addenda: Addendum[];
};

const RFPS: Rfp[] = [
  {
    slug: "inimim-phase-3",
    title: "‘Inimim Forest Restoration Project – Phase 3 Timber Harvest RFP",
    summary:
      "Contractors are invited to submit proposals for a 263-acre timber harvest with a mix of marked units and designation-by-prescription.",
    dueISO: "2025-10-03T23:59:00Z",
    submitEmail: "chris@yubawatershedinstitute.org",
    pdfUrl: "/rfp/ywi-rfp-timber-harvest-2025.pdf",
    acres: 253,
    funder: "Sierra Nevada Conservancy",
    treatments: ["Timber harvest", "Slash piling (no mastication)"],
    status: "open",
    updatedAt: "2025-09-10T00:00:00Z",
    addenda: [
      {
        id: "add-1",
        dateISO: "2025-09-20T19:00:00Z",
        title: "Addendum 1: Pre-bid site walk details & map",
        fileUrl: "/files/addendum-1-inimim-phase-3.pdf",
      },
      {
        id: "qa-1",
        dateISO: "2025-09-22T17:00:00Z",
        title: "Q&A #1: Pile burning responsibilities & coordination with CAL FIRE",
        body:
          "BLM/CAL FIRE will conduct pile burning under a separate agreement; contractor is responsible for creating piles only.",
      },
    ],
  },
];

export function allRfps(): Rfp[] {
  return RFPS;
}

export function getRfpBySlug(slug: string): Rfp | undefined {
  return RFPS.find((r) => r.slug === slug);
}
