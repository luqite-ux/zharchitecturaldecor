import { NextResponse, type NextRequest } from 'next/server'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from '@/lib/service-status'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { PREVIEW_COOKIE } from '@/lib/site-content/site-content'
import { protectPreviewResponse } from '@/lib/site-content/preview-protection'

export async function middleware(request: NextRequest) {
  const finish = (response: NextResponse) => {
    protectPreviewResponse(response.headers, request.cookies.has(PREVIEW_COOKIE))
    return response
  }
  const { pathname } = request.nextUrl
  const publicAdmin = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
  if (!publicAdmin && pathname.startsWith('/admin') && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('reason', 'unauthorized')
    return finish(NextResponse.redirect(url))
  }
  if (!isServiceGuardExcludedPath(request.nextUrl.pathname)) {
    const available = await isWebsiteServiceAvailable(request)
    if (!available) return finish(NextResponse.rewrite(new URL('/service-expired', request.url)))
  }
  return finish(NextResponse.next())
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] }
