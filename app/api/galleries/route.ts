import { NextResponse } from 'next/server'
import { readData, writeData, type GalleryRecord } from '@/lib/data'
import { isAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COLLECTION = 'galleries'

function isOptionalString(value: unknown) {
  return value === undefined || typeof value === 'string'
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string')
}

function isGalleryRecord(value: unknown): value is GalleryRecord {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>

  return (
    typeof record.id === 'string' &&
    typeof record.title === 'string' &&
    isStringArray(record.images) &&
    isOptionalString(record.description)
  )
}

function isGalleryArray(value: unknown): value is GalleryRecord[] {
  return Array.isArray(value) && value.every(isGalleryRecord)
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

  if (!isGalleryArray(body)) {
    return jsonError('Expected an array of gallery records')
  }

  try {
    const saved = await writeData(COLLECTION, body)
    return NextResponse.json(saved)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to write galleries'
    return jsonError(message, 500)
  }
}

export async function GET() {
  try {
    const galleries = await readData(COLLECTION)
    return NextResponse.json(galleries)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load galleries'
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
