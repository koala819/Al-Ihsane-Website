import { NextResponse } from 'next/server'

import { routing } from '@/i18n/routing'
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

  if (password !== expectedPassword) {
    const url = new URL(getPreinscriptionsAccessPath(locale), request.url)
    url.searchParams.set('error', '1')
    url.searchParams.set('next', nextPath)
    return NextResponse.redirect(url)
  }

  const token = await createPreinscriptionsSessionToken(sessionSecret)
  const url = new URL(nextPath, request.url)
  const response = NextResponse.redirect(url)

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
