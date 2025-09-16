import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const galleries = await readData('galleries');
  return NextResponse.json(galleries);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await request.json();
  await writeData('galleries', data);
  return NextResponse.json({ ok: true });
}
