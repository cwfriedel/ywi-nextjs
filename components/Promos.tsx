"use client"

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { type Promo } from '@/lib/promos'
import PromoLink from './PromoLink'

type Props = {
  limit?: number // max number of non-featured cards to show
  showBanner?: boolean // show the large featured banner if present
  storageKey?: string // key to store dismissals
}

function isActive(p: Promo, now: Date) {
  const start = new Date(p.start)
  const end = p.end ? new Date(p.end) : null
  return start <= now && (!end || now <= end)
}

function kindBadge(kind: Promo['kind']) {
  const map: Record<Promo['kind'], string> = {
    event: 'Event',
    meeting: 'Meeting',
    project: 'Project',
    rfp: 'RFP'
  }
  return map[kind]
}

export default function Promos({ limit = 3, showBanner = true, storageKey = 'ywi:dismissedPromos' }: Props) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const [data, setData] = useState<Promo[]>([])

  useEffect(() => {
    fetch('/api/promos')
      .then(res => res.json())
      .then((items: Promo[]) => setData(items))
      .catch(() => {})
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setDismissed(JSON.parse(raw))
    } catch {}
  }, [storageKey])

  const active = useMemo(() => {
    const now = new Date()
    return data.filter(p => isActive(p, now) && !dismissed.includes(p.id))
  }, [dismissed, data])

  const featured = showBanner ? active.find(p => p.featured) : undefined
  const rest = active
    .filter(p => p.id !== featured?.id)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  function dismiss(id?: string) {
    const ids = id ? [...new Set([...dismissed, id])] : active.map(p => p.id)
    setDismissed(ids)
    try { localStorage.setItem(storageKey, JSON.stringify(ids)) } catch {}
  }

  if (!featured && rest.length === 0) return null

  return (
    <div className="space-y-6">
      {featured && (
        <div className="relative overflow-hidden rounded-2xl border">
          {featured.image && (
            <div className="relative h-44 w-full">
              <Image src={featured.image} alt="" fill className="object-cover" />
            </div>
          )}
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide opacity-70">{kindBadge(featured.kind)}</div>
                <h3 className="font-head text-2xl text-forest mt-1">{featured.title}</h3>
                <p className="mt-2 max-w-2xl">{featured.blurb}</p>
                <PromoLink
                  href={featured.ctaHref}
                  label={featured.ctaLabel}
                  className="inline-block mt-3 underline text-forest"
                />
              </div>
              <button
                type="button"
                className="text-sm opacity-60 hover:opacity-100"
                aria-label="Dismiss announcement"
                onClick={() => dismiss(featured.id)}
              >
                Dismiss ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, limit).map(p => (
            <article key={p.id} className="rounded-2xl border p-4">
              <div className="text-xs uppercase tracking-wide opacity-70">{kindBadge(p.kind)}</div>
              <h4 className="font-head text-lg text-forest mt-1">{p.title}</h4>
              <p className="mt-1 text-sm">{p.blurb}</p>
              <PromoLink
                href={p.ctaHref}
                label={p.ctaLabel}
                className="inline-block mt-3 underline text-forest"
              />
            </article>
          ))}
        </div>
      )}

      <div className="text-right">
        <button
          type="button"
          className="text-xs underline opacity-70 hover:opacity-100"
          onClick={() => dismiss()}
        >
          Dismiss all
        </button>
      </div>
    </div>
  )
}
