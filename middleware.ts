import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/token';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('user')?.value;
    const loginUrl = new URL('/admin/login', req.url);
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
    try {
      const verifiedUser = await verifyToken(token);
      if (!verifiedUser) {
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Error verifying token', error);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
