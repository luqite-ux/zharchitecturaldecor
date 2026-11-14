import { NextResponse, type NextRequest } from 'next/server'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from '@/lib/service-status'
import { SESSION_COOKIE } from '@/lib/admin-session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const publicAdmin = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
  if (!publicAdmin && pathname.startsWith('/admin') && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('reason', 'unauthorized')
    return NextResponse.redirect(url)
  }
  if (!isServiceGuardExcludedPath(request.nextUrl.pathname)) {
    const available = await isWebsiteServiceAvailable(request)
    if (!available) return NextResponse.rewrite(new URL('/service-expired', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] }
