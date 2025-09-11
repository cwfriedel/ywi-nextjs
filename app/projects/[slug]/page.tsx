import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'
import GalleryLightbox from './GalleryLightbox'
import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const p = await getProjectBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
openGraph: {
  title: p.title,
  description: p.summary,
  images: p.hero ? [p.hero] : undefined,
},
  };
}

export default function ProjectDetail({ params }: { params: { slug: string }}) {
  const proj = projects.find(p => p.slug === params.slug)
  if (!proj) return notFound()

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <h1 className="font-head text-3xl text-forest mb-4">{proj.title}</h1>

      {proj.hero ? (
        <div className="relative h-64 w-full mb-6">
          <Image src={proj.hero} alt={proj.title} fill className="object-cover rounded-2xl" />
        </div>
      ) : null}

      <p className="mb-6">{proj.summary}</p>

      <section className="mt-10">
        <h2 className="font-head text-2xl text-forest mb-3">Acres</h2>
        <p>{proj.acres ?? 'Details coming soon.'}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-head text-2xl text-forest mb-3">Map</h2>
        {proj.mapImage ? (
          <div className="relative w-full" style={{ aspectRatio: proj.mapAspect ?? '11 / 8.5' }}>
            <Image src={proj.mapImage} alt={`${proj.title} map`} fill className="object-cover rounded-xl" />
          </div>
        ) : (
          <p>Map coming soon.</p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-head text-2xl text-forest mb-3">Partners</h2>
        {proj.partnersLogos?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
            {proj.partnersLogos.map((logo, i) => (
              <div key={i} className="relative h-14 w-full">
                {logo.href ? (
                  <Link href={logo.href} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                    <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                  </Link>
                ) : (
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                )}
              </div>
            ))}
          </div>
        ) : proj.partners?.length ? (
          <ul className="list-disc pl-6 space-y-1">
            {proj.partners.map((partner, i) => <li key={i}>{partner}</li>)}
          </ul>
        ) : (
          <p>Partners will be listed here.</p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-head text-2xl text-forest mb-3">Milestones</h2>
        {proj.milestones?.length ? (
          <ul className="list-disc pl-6 space-y-1">
            {proj.milestones.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        ) : (
          <p>Milestones coming soon.</p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-head text-2xl text-forest mb-3">Photo Gallery</h2>
        {proj.gallery?.length ? (
          <GalleryLightbox images={proj.gallery} title={proj.title} />
        ) : (
          <p>Photos coming soon.</p>
        )}
      </section>

      {proj.externalUrl ? (
        <p className="mt-10">
          For more background and updates, visit{' '}
          <Link href={proj.externalUrl} className="underline text-forest" target="_blank" rel="noopener noreferrer">
            the original project page
          </Link>.
        </p>
      ) : null}
    </div>
  )
}
