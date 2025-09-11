import Hero from '@/components/Hero'
import Image from 'next/image'
import Link from 'next/link'

// Upcoming events
import { EVENTS, nextN } from '@/lib/events'

// Current topics (events, meetings, project highlights, RFPs)
import Promos from '@/components/Promos'

// NEW: Mailchimp embed bar
import NewsletterBar from '@/components/NewsletterBar'

export default function HomePage(){
  // Next 3 upcoming events
  const items = nextN(EVENTS, 3)

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card">
          <h2 className="font-head text-2xl text-forest mb-3">Our Work</h2>
          <p className="text-stone mb-4">
            We advance forest resilience and watershed health through stewardship projects such as fuels reduction and forest restoration, alongside educational events and publications.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {['fuels','river','community'].map((n,i)=>(
              <div key={i} className="rounded-xl overflow-hidden border border-stone/20">
                <Image src={`/images/${n}.jpg`} alt="" width={800} height={600} className="h-40 w-full object-cover" />
              </div>
            ))}
          </div>

          <Link className="btn-primary mt-5 inline-block" href="/our-work">Explore Projects</Link>
        </div>

        <div className="card">
          <h2 className="font-head text-2xl text-forest mb-3">Upcoming Events</h2>

          <ul className="space-y-4">
            {items.length === 0 && (
              <li className="text-stone">No upcoming events at the moment. Check back soon!</li>
            )}

            {items.map(e => {
              const d = new Date(e.date)
              const dateLabel = d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
              const meta = [e.location].filter(Boolean).join(' · ')
              return (
                <li key={e.id}>
                  <div className="font-semibold text-forest">{e.title}</div>
                  <div className="text-sm text-stone">{dateLabel}{meta ? ` · ${meta}` : ''}</div>
                </li>
              )
            })}
          </ul>

          <Link className="btn-primary mt-5 inline-block" href="/events">View Calendar</Link>
        </div>
      </section>

      {/* Newsletter signup (Mailchimp embed) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-2">
        <NewsletterBar
          action="https://yubawatershedinstitute.us11.list-manage.com/subscribe/post?u=2cc5a0520f65ef2d95af80021&amp;id=915ee074ab&amp;f_id=00e31be0f0"
          title="Get YWI updates"
          subtitle="Occasional emails on projects, events, and Tree Rings."
        />
      </section>

      {/* Featured announcements / highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Promos showBanner limit={3} />
      </section>

      <section className="bg-forest/95 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="font-head text-3xl">Join a community of stewards</h3>
            <p className="mt-2 text-white/90">
              Become a member to sustain stewardship and education in the Yuba River watershed.
            </p>
          </div>
          <Link href="/membership" className="btn-primary">Become a Member</Link>
        </div>
      </section>
    </div>
  )
}

