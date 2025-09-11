import Image from 'next/image'
import Link from 'next/link'
import LightboxGallery from '@/components/LightboxGallery'
import { fungusForayGallery, treeRingsIssues, bookVendors, type BookVendor } from '@/lib/programs'
import BuyNowPayPal from '@/components/BuyNowPayPal'

export const metadata = { title: 'Education & Field Programs | YWI' }

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-head text-3xl text-forest mb-4">Education & Field Programs</h1>
      <p className="max-w-3xl mb-10">
        We host walks, talks, and hands-on learning that connect people to place—from the annual <em>Fungus Foray</em> to guided field days,
        classroom resources, and our long-running journal <em>Tree Rings</em>.
      </p>

      {/* Fungus Foray Gallery */}
      <section className="mt-10">
        <h2 className="font-head text-2xl text-forest mb-3">Fungus Foray Photo Gallery</h2>
        <LightboxGallery images={fungusForayGallery} title="Fungus Foray" />
      </section>

      {/* Tree Rings Issues */}
      <section id="tree-rings" className="mt-12">
        <h2 className="font-head text-2xl text-forest mb-3">Tree Rings Journal</h2>
        <p className="mb-4 max-w-3xl">
          <em>Tree Rings</em> is the journal of the Yuba Watershed Institute. Browse selected issues below; view online or download a PDF.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {treeRingsIssues.map(issue => (
            <article key={issue.id} className="rounded-2xl border p-4">
              <div className="flex gap-4 items-center">
                <div className="relative h-24 w-20 shrink-0 bg-neutral-100 rounded-md overflow-hidden">
                  {issue.cover ? (
                    <Image src={issue.cover} alt={`${issue.title} cover`} fill className="object-cover" sizes="80px" />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-xs opacity-60">No cover</div>
                  )}
                </div>
                <div>
                  <h3 className="font-head text-lg text-forest">{issue.title}</h3>
                  <div className="text-sm opacity-80">Year: {issue.year}</div>
                  <div className="mt-2 flex gap-3">
                    <a href={issue.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline text-forest">View PDF</a>
                    <a href={issue.pdfUrl} download className="underline">Download</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Book purchase */}
      <section className="mt-12">
        <h2 className="font-head text-2xl text-forest mb-3">Buy the Book: <em>The Nature of This Place</em></h2>
        <div className="rounded-2xl border p-4 md:p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative h-48 w-36 shrink-0 bg-neutral-100 rounded-md overflow-hidden">
            {/* Replace with a local cover image if available */}
            <Image src="/images/notp.webp" alt="The Nature of This Place cover (placeholder)" fill className="object-cover" sizes="144px" />
          </div>
          <div className="flex-1">
            <p className="max-w-3xl">
              A curated selection of essays, poems, photographs, and drawings from <em>Tree Rings</em> (1991–2010),
              edited by Bruce Boyd and Liese Greensfelder, foreword by Gary Snyder. Published by Comstock Bonanza Press.
            </p>
 
            {/* Direct PayPal product checkout link */}
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <a
                href="https://www.paypal.com/ncp/payment/24ZWSAJ4FVEEC"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Buy the Book
              </a>

              {/* Keep external vendor option if desired */}
              {bookVendors?.length ? bookVendors.map((v: BookVendor, i) => (
  <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" className="...">
    <span>Buy from {v.name}</span>
    {v.price ? <span className="text-forest font-medium">{v.price}</span> : null}
  </a>
)) : null}
            </div>

            <p className="text-xs mt-2 opacity-70">
              Shipping and any applicable tax are calculated at checkout by PayPal based on your shipping address.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

