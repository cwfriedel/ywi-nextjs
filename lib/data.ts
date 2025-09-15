import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export type PromoKind = 'event' | 'meeting' | 'project' | 'rfp'

export type EventRecord = {
  id: string
  slug?: string
  title: string
  date: string
  time?: string
  location?: string
  blurb?: string
  url?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  contactUrl?: string
}

export type StaffMember = {
  id: string
  name: string
  role: string
  email?: string
  headshot?: string
  bio?: string
}

export type PromoRecord = {
  id: string
  kind: PromoKind
  title: string
  blurb: string
  ctaLabel: string
  ctaHref: string
  start: string
  end?: string
  featured?: boolean
  image?: string
  pinned?: boolean
}

export type GalleryRecord = {
  id: string
  title: string
  images: string[]
  description?: string
}

type CollectionMap = {
  events: EventRecord[]
  staff: StaffMember[]
  promos: PromoRecord[]
  galleries: GalleryRecord[]
}

export type CollectionKey = keyof CollectionMap
export type CollectionValue<K extends CollectionKey> = CollectionMap[K]

const DB_FILENAME = 'content.sqlite'
const DB_PATH = path.join(process.cwd(), 'data', DB_FILENAME)

const DEFAULT_DATA: CollectionMap = {
  events: [
    {
      id: 'bid-walk-2025',
      slug: 'bid-walk-2025',
      title: 'Pre-Proposal Field Meeting',
      date: '2025-09-17',
      time: '10:00 AM – 12:00 PM',
      location: '17894 Tyler Foote Rd, Nevada City, CA 95959',
      blurb: 'For contractors bidding on 263-acre timber harvest.',
      url: '/events/bid-walk-2025',
      contactName: 'Chris Friedel',
      contactEmail: 'chris@yubawatershedinstitute.org'
    },
    {
      id: 'forest-health-roundtable-2025',
      slug: 'forest-health-roundtable-2025',
      title: 'Forest Health Roundtable',
      date: '2025-10-24',
      time: '9:00 AM – 3:00 PM',
      location: 'Nevada City, CA',
      blurb: 'Regional partners share project updates and funding opportunities.',
      url: '/events/forest-health-roundtable-2025'
    },
    {
      id: 'fungus-foray-2025',
      slug: 'fungus-foray-2025',
      title: 'Fungus Foray',
      date: '2025-11-08',
      location: 'Nevada City, CA',
      blurb: 'Guided mushroom identification in the ’Inimim Forest.',
      url: '/events/fungus-foray'
    }
  ],
  staff: [
    {
      id: 'chris-friedel',
      name: 'Chris Friedel',
      role: 'Executive Director',
      email: 'chris@yubawatershedinstitute.org',
      headshot: '/images/people/chris.jpg',
      bio: 'Chris Friedel is the Executive Director of the Yuba Watershed Institute, where he has led day-to-day operations and major forest health initiatives since 2018. With nearly two decades of experience in ecological restoration, Chris has worked across both public and private lands in California as a vegetation ecologist, project manager, and nonprofit leader.'
    },
    {
      id: 'theo-fitanides',
      name: 'Theo Fitanides',
      role: 'Field Technician',
      email: 'theo@yubawatershedinstitute.org',
      headshot: '/images/people/theo.jpg',
      bio: 'Theo Fitanides is a Forestry Technician with the Yuba Watershed Institute, bringing more than a decade of experience in botany, habitat restoration, and native plant cultivation. He has worked with organizations including Sierra Streams Institute, East Bay Regional Park District’s Botanic Garden, and the California Native Plant Society’s Native Here Nursery.'
    }
  ],
  promos: [
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
  ],
  galleries: [
    {
      id: 'fungus-foray',
      title: 'Fungus Foray Highlights',
      description: 'Scenes from past Fungus Foray events in the ’Inimim Forest.',
      images: [
        '/images/fungus-foray/foray.jpg',
        '/images/fungus-foray/boletus-appendiculatus.jpg',
        '/images/fungus-foray/sorting.jpg',
        '/images/fungus-foray/tables-1.jpeg',
        '/images/fungus-foray/tables-3.jpeg'
      ]
    },
    {
      id: 'forest-restoration',
      title: 'Forest Restoration Projects',
      description: 'Fuel reduction and ecological thinning work led by YWI and partners.',
      images: [
        '/images/plantation.jpg',
        '/images/community.jpg',
        '/images/river.jpg',
        '/images/fuels.jpg'
      ]
    }
  ]
}

let isInitialized = false

function ensureDatabase() {
  if (isInitialized) return

  const dir = path.dirname(DB_PATH)
  fs.mkdirSync(dir, { recursive: true })

  const setupSql = `
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS collections (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `

  runSql(setupSql)
  isInitialized = true
}

function runSql(sql: string) {
  const statement = sql.trim()
  if (!statement) return

  const result = spawnSync('sqlite3', [DB_PATH], {
    input: statement,
    encoding: 'utf8'
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    const message = result.stderr || result.stdout || 'sqlite3 command failed'
    throw new Error(message)
  }
}

function queryJson<T>(sql: string): T {
  const statement = sql.trim()
  if (!statement) {
    throw new Error('SQL query cannot be empty')
  }

  const result = spawnSync('sqlite3', ['-json', DB_PATH, statement], {
    encoding: 'utf8'
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    const message = result.stderr || result.stdout || 'sqlite3 query failed'
    throw new Error(message)
  }

  if (!result.stdout) {
    return [] as T
  }

  return JSON.parse(result.stdout) as T
}

function escapeSqlString(value: string) {
  return value.replace(/'/g, "''")
}

function readRaw(key: CollectionKey): string | undefined {
  const escapedKey = escapeSqlString(key)
  const rows = queryJson<{ value: unknown }[]>(`SELECT value FROM collections WHERE key = '${escapedKey}' LIMIT 1;`)
  if (!Array.isArray(rows) || rows.length === 0) return undefined
  const value = rows[0]?.value
  return typeof value === 'string' ? value : JSON.stringify(value)
}

function writeRaw(key: CollectionKey, json: string) {
  const escapedKey = escapeSqlString(key)
  const escapedValue = escapeSqlString(json)
  const sql = `
    INSERT INTO collections (key, value, updated_at)
    VALUES ('${escapedKey}', '${escapedValue}', CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value,
      updated_at = CURRENT_TIMESTAMP;
  `
  runSql(sql)
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export async function readData<K extends CollectionKey>(key: K): Promise<CollectionValue<K>> {
  ensureDatabase()
  const raw = readRaw(key)
  if (!raw) {
    const fallback = clone(DEFAULT_DATA[key])
    writeRaw(key, JSON.stringify(fallback))
    return fallback
  }

  return JSON.parse(raw) as CollectionValue<K>
}

export async function writeData<K extends CollectionKey>(key: K, value: CollectionValue<K>): Promise<CollectionValue<K>> {
  ensureDatabase()
  const payload = clone(value)
  writeRaw(key, JSON.stringify(payload))
  return payload
}
