import { NextResponse } from 'next/server'

import { routing } from '@/i18n/routing'
import { getPublicOriginFromRequest } from '@/lib/server/publicOrigin'
import {
  createPreinscriptionsSessionToken,
  getPreinscriptionsAccessPath,
  getPreinscriptionsProtectedPath,
  isAllowedLocalizedPath,
  PREINSCRIPTIONS_2027_COOKIE,
  PREINSCRIPTIONS_2027_MAX_AGE_SECONDS,
} from '@/lib/server/preinscriptions2027'

export async function POST(request: Request) {
  const formData = await request.formData()
  const rawLocale = String(formData.get('locale') ?? '')
  const locale = routing.locales.includes(rawLocale as 'fr' | 'ar')
    ? rawLocale
    : routing.defaultLocale

  const defaultNext = getPreinscriptionsProtectedPath(locale)
  const requestedNext = String(formData.get('next') ?? defaultNext)
  const nextPath = isAllowedLocalizedPath(requestedNext, locale) ? requestedNext : defaultNext

  const password = String(formData.get('password') ?? '')
  const expectedPassword = process.env.PREINSCRIPTIONS_2027_PASSWORD
  const sessionSecret = process.env.PRIVATE_SESSION_SECRET

  if (!expectedPassword || !sessionSecret) {
    return new NextResponse(
      'Configuration manquante: PREINSCRIPTIONS_2027_PASSWORD ou PRIVATE_SESSION_SECRET.',
      { status: 500 },
    )
  }

  /* 303 : après POST, suivre en GET. Origine publique : pas `request.url` seul (Netlify peut
   * y mettre l’hôte du deploy preview → Location ≠ domaine du cookie → pas de session). */
  const origin = getPublicOriginFromRequest(request)

  if (password !== expectedPassword) {
    const url = new URL(getPreinscriptionsAccessPath(locale), origin)
    url.searchParams.set('error', '1')
    url.searchParams.set('next', nextPath)
    return NextResponse.redirect(url, 303)
  }

  const token = await createPreinscriptionsSessionToken(sessionSecret)
  const url = new URL(nextPath, origin)
  const response = NextResponse.redirect(url, 303)

  response.cookies.set({
    httpOnly: true,
    maxAge: PREINSCRIPTIONS_2027_MAX_AGE_SECONDS,
    name: PREINSCRIPTIONS_2027_COOKIE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    value: token,
  })

  return response
}
