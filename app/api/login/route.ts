import { NextResponse } from 'next/server';
import { verifyUser, createToken } from '@/lib/auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (await verifyUser(username, password)) {
    const res = NextResponse.json({ ok: true });
    const token = await createToken(username);
    res.cookies.set('user', token, { httpOnly: true, sameSite: 'lax', path: '/' });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
