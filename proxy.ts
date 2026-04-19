import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { getPublicOriginFromRequest } from '@/lib/server/publicOrigin'
import {
  PREINSCRIPTIONS_2027_COOKIE,
  getPreinscriptionsAccessPath,
  getPreinscriptionsProtectedPath,
  isPreinscriptionsProtectedPath,
  verifyPreinscriptionsSessionToken,
} from '@/lib/server/preinscriptions2027'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default async function proxy(request: NextRequest) {
  const locale = routing.locales.find(
    (item) =>
      request.nextUrl.pathname === `/${item}` ||
      request.nextUrl.pathname.startsWith(`/${item}/`),
  )

  if (!locale || !isPreinscriptionsProtectedPath(request.nextUrl.pathname, locale)) {
    return intlMiddleware(request)
  }

  const sessionSecret = process.env.PRIVATE_SESSION_SECRET
  if (!sessionSecret) {
    return new NextResponse('Configuration manquante: PRIVATE_SESSION_SECRET.', {
      status: 500,
    })
  }

  const sessionCookie = request.cookies.get(PREINSCRIPTIONS_2027_COOKIE)?.value

  const hasAccess = await verifyPreinscriptionsSessionToken(sessionCookie, sessionSecret)
  if (hasAccess) return intlMiddleware(request)

  const loginUrl = new URL(getPreinscriptionsAccessPath(locale), getPublicOriginFromRequest(request))
  loginUrl.searchParams.set('next', getPreinscriptionsProtectedPath(locale))
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/', '/(fr|ar)/:path*'],
}
