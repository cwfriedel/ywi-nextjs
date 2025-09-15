import { NextResponse } from 'next/server'
import { readData, writeData, type EventRecord } from '@/lib/data'
import { isAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COLLECTION = 'events'

function isOptionalString(value: unknown) {
  return value === undefined || typeof value === 'string'
}

function isEventRecord(value: unknown): value is EventRecord {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>

  return (
    typeof record.id === 'string' &&
    typeof record.title === 'string' &&
    typeof record.date === 'string' &&
    isOptionalString(record.slug) &&
    isOptionalString(record.time) &&
    isOptionalString(record.location) &&
    isOptionalString(record.blurb) &&
    isOptionalString(record.url) &&
    isOptionalString(record.contactName) &&
    isOptionalString(record.contactEmail) &&
    isOptionalString(record.contactPhone) &&
    isOptionalString(record.contactUrl)
  )
}

function isEventArray(value: unknown): value is EventRecord[] {
  return Array.isArray(value) && value.every(isEventRecord)
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

  if (!isEventArray(body)) {
    return jsonError('Expected an array of event records')
  }

  try {
    const saved = await writeData(COLLECTION, body)
    return NextResponse.json(saved)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to write events'
    return jsonError(message, 500)
  }
}

export async function GET() {
  try {
    const events = await readData(COLLECTION)
    return NextResponse.json(events)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load events'
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
