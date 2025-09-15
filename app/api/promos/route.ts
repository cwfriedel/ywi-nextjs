import { NextResponse } from 'next/server'
import { readData, writeData, type PromoRecord, type PromoKind } from '@/lib/data'
import { isAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COLLECTION = 'promos'
const ALLOWED_KINDS: PromoKind[] = ['event', 'meeting', 'project', 'rfp']

function isOptionalString(value: unknown) {
  return value === undefined || typeof value === 'string'
}

function isOptionalBoolean(value: unknown) {
  return value === undefined || typeof value === 'boolean'
}

function isPromoRecord(value: unknown): value is PromoRecord {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>

  return (
    typeof record.id === 'string' &&
    typeof record.title === 'string' &&
    typeof record.blurb === 'string' &&
    typeof record.ctaLabel === 'string' &&
    typeof record.ctaHref === 'string' &&
    typeof record.kind === 'string' &&
    ALLOWED_KINDS.includes(record.kind as PromoKind) &&
    typeof record.start === 'string' &&
    isOptionalString(record.end) &&
    isOptionalBoolean(record.featured) &&
    isOptionalString(record.image) &&
    isOptionalBoolean(record.pinned)
  )
}

function isPromoArray(value: unknown): value is PromoRecord[] {
  return Array.isArray(value) && value.every(isPromoRecord)
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

async function persist(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch (error) {
    return jsonError('Invalid JSON body')
  }

  if (!isPromoArray(body)) {
    return jsonError('Expected an array of promo records')
  }

  try {
    const saved = await writeData(COLLECTION, body)
    return NextResponse.json(saved)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to write promos'
    return jsonError(message, 500)
  }
}

export async function GET() {
  try {
    const promos = await readData(COLLECTION)
    return NextResponse.json(promos)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load promos'
    return jsonError(message, 500)
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) return jsonError('Unauthorized', 401)
  return persist(request)
}

export async function PUT(request: Request) {
  if (!isAuthenticated()) return jsonError('Unauthorized', 401)
  return persist(request)
}
