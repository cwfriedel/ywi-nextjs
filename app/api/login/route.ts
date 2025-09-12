import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (await verifyUser(username, password)) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('user', username, { httpOnly: true, sameSite: 'lax', path: '/' });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
