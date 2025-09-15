'use client'
import { useMemo, useState } from 'react'
import { EventItem, eventsForMonth } from '@/lib/events'

type Event = EventItem & { description?: string }

export default function EventCalendar({ events }: { events: Event[] }) {
  const [monthOffset, setMonthOffset] = useState(0)

  const current = useMemo(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  }, [monthOffset])

  const monthEvents = useMemo(() => {
    const m = current.getMonth()
    const y = current.getFullYear()
    return eventsForMonth(events, y, m)
  }, [current, events])

  const monthName = current.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <button className="px-3 py-2 rounded-lg border border-stone/30" onClick={()=>setMonthOffset(m=>m-1)}>Prev</button>
        <h3 className="font-head text-xl text-forest">{monthName}</h3>
        <button className="px-3 py-2 rounded-lg border border-stone/30" onClick={()=>setMonthOffset(m=>m+1)}>Next</button>
      </div>
      {monthEvents.length===0 ? (
        <p className="text-stone">No events this month. Check the list below for upcoming dates.</p>
      ):(
        <ul className="space-y-3">
          {monthEvents.map((e,i)=>{
            const d = new Date(e.date)
            const dateLabel = d.toLocaleDateString(undefined, { weekday:'short', month:'short', day:'numeric' })
            return (
              <li key={i} className="border border-stone/20 rounded-xl p-4 flex items-center gap-4">
                <div className="text-center px-3 py-2 rounded-lg bg-paper border border-stone/20">
                  <div className="text-xs uppercase text-stone/70">{d.toLocaleString('default',{month:'short'})}</div>
                  <div className="text-xl font-bold text-forest">{String(d.getDate()).padStart(2,'0')}</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-forest">{e.title}</div>
                  <div className="text-sm text-stone">{dateLabel}{e.location?` · ${e.location}`:''}</div>
                  {e.description && <p className="text-sm mt-1">{e.description}</p>}
                </div>
                {e.url && <a className="btn-primary text-sm" href={e.url}>Details</a>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
