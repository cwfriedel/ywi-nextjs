import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

async function writeData(filePath: string, contents: string) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, contents, 'utf8')
  } catch (error) {
    throw new Error(`Unable to write data: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function POST(request: Request, { params }: { params: { name: string } }) {
  const { name } = params

  if (!/^[A-Za-z0-9_-]+$/.test(name)) {
    return NextResponse.json({ error: 'Invalid dataset name.' }, { status: 400 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const filePath = path.join(DATA_DIR, `${name}.json`)

  try {
    const serialized = `${JSON.stringify(payload, null, 2)}\n`
    await writeData(filePath, serialized)
    return NextResponse.json({ message: 'Saved.' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save data.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
