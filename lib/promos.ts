export type Promo = {
  id: string
  kind: 'event' | 'meeting' | 'project' | 'rfp'
  title: string
  blurb: string
  ctaLabel: string
  ctaHref: string
  start: string // ISO date; when to begin showing
  end?: string  // ISO date; when to stop showing (inclusive)
  featured?: boolean // if true, show as the big banner
  image?: string // optional hero image under /public/images
  pinned?: boolean // sort first
}

import promoData from '@/data/promos.json';

export const promos: Promo[] = promoData as Promo[];
