import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/lib/projects'

export const metadata = {
  title: 'Projects | Yuba Watershed Institute'
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-head text-3xl text-forest mb-6">Projects</h1>
      <p className="mb-8 max-w-3xl">
        Explore our active landscape resilience and restoration projects. Each project advances forest health,
        community safety, and watershed resilience across the Yuba River region.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map(p => (
          <article key={p.slug} className="rounded-2xl border p-4 hover:shadow-md transition-shadow">
            <Link href={`/projects/${p.slug}`} className="block group">
              {p.hero && (
                <div className="relative h-48 mb-4">
                  <Image src={p.hero} alt={p.title} fill className="object-cover rounded-xl" />
                </div>
              )}
              <h2 className="font-head text-xl text-forest group-hover:underline">{p.title}</h2>
              <p className="mt-2 text-sm">{p.summary}</p>
              <span className="inline-block mt-3 text-forest underline">Learn more →</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
