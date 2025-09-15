import EventCalendar from '@/components/EventCalendar'
import { upcoming } from '@/lib/events'
import { allEvents } from '@/lib/events.server'
export default async function EventsPage(){
  const events = await allEvents()
  const list = upcoming(events)
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="font-head text-3xl text-forest mb-6">Events</h1>
      <p className="mb-6">See what’s coming up. The calendar below highlights monthly events; scroll for upcoming dates.</p>
      <EventCalendar events={events} />
      <h2 className="font-head text-2xl text-forest mt-10 mb-4">All Upcoming Events</h2>
      {list.length > 0 ? (
        <ul className="space-y-3">
          {list.map(e => (
            <li key={e.id}>
              {e.title} — {new Date(e.date).toLocaleDateString()}
              {e.location && ` (${e.location})`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events.</p>
      )}
    </div>
  )
}
