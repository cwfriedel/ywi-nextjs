import { NextResponse } from 'next/server'
import { readData, writeData, type StaffMember } from '@/lib/data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COLLECTION = 'staff'

function isOptionalString(value: unknown) {
  return value === undefined || typeof value === 'string'
}

function isStaffMember(value: unknown): value is StaffMember {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>

  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    typeof record.role === 'string' &&
    isOptionalString(record.email) &&
    isOptionalString(record.headshot) &&
    isOptionalString(record.bio)
  )
}

function isStaffArray(value: unknown): value is StaffMember[] {
  return Array.isArray(value) && value.every(isStaffMember)
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

  if (!isStaffArray(body)) {
    return jsonError('Expected an array of staff records')
  }

  try {
    const saved = await writeData(COLLECTION, body)
    return NextResponse.json(saved)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to write staff records'
    return jsonError(message, 500)
  }
}

export async function GET() {
  try {
    const staff = await readData(COLLECTION)
    return NextResponse.json(staff)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load staff records'
    return jsonError(message, 500)
  }
}

export async function POST(request: Request) {
  return persist(request)
}

export async function PUT(request: Request) {
  return persist(request)
}
