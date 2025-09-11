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

export const promos: Promo[] = [
  {
    id: 'rfp-fuels-contractor',
    kind: 'rfp',
    title: 'Request for Proposals: 263-Acre Timber Harvest in Nevada County',
    blurb: 'Submit proposals for a 263-acre timber harvest. Key dates, submission, and live Addenda/Q&A.',
    ctaLabel: 'View RFP details',
    ctaHref: '/rfps/inimim-phase-3',
    start: '2025-09-11',
    end: '2025-10-15',
    featured: true,
    image: '/images/plantation-1.jpg',
    pinned: true
  },
  {
    id: 'fungus-foray-2025',
    kind: 'event',
    title: 'Fungus Foray',
    blurb: 'Unfortunately, the Yuba Watershed Fungus Foray and Wild Mushroom Exposition will not be happening in 2025. See photos from past events and get more info.',
    ctaLabel: 'Read more',
    ctaHref: '/programs#fungus-foray',
    start: '2025-01-01',
    end: '2025-12-31',
    pinned: true
  },
  {
    id: 'south-yuba-rim-highlights',
    kind: 'project',
    title: 'South Yuba Rim Project Highlights',
    blurb: 'Landscape-scale fuel reduction on the South Yuba River rim—learn about scope, partners, and timelines.',
    ctaLabel: 'Read more',
    ctaHref: '/projects/south-yuba-rim',
    start: '2025-01-01',
    end: '2026-12-31'
  },
  {
    id: 'little-deer-creek-highlights',
    kind: 'project',
    title: 'Little Deer Creek Project Highlights',
    blurb: 'Forest resilience treatments to protect communities and critical infrastructure near Nevada City.',
    ctaLabel: 'Read more',
    ctaHref: '/projects/little-deer-creek',
    start: '2025-01-01',
    end: '2026-12-31'
  }
]
