import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const promos = await readData('promos');
  return NextResponse.json(promos);
}

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await request.json();
  await writeData('promos', data);
  return NextResponse.json({ ok: true });
}
