import EventCalendar from '@/components/EventCalendar'

export default function EventsPage(){
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="font-head text-3xl text-forest mb-6">Events</h1>
      <p className="mb-6">See what’s coming up. The calendar below highlights monthly events; scroll for upcoming dates.</p>
      <EventCalendar />
      <h2 className="font-head text-2xl text-forest mt-10 mb-4">All Upcoming Events</h2>
      <ul className="space-y-3">
        <li>Annual Fungus Foray — cancelled for 2025 (Nevada City)</li>
      </ul>
    </div>
  )
}
