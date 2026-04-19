import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  getPreinscriptionsProtectedPath,
  isAllowedLocalizedPath,
  verifyPreinscriptionsSessionToken,
  PREINSCRIPTIONS_2027_COOKIE,
} from '@/lib/server/preinscriptions2027'

type AccessPageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ error?: string; next?: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'preinscriptions2027Access' })
  return {
    title: t('title'),
    robots: {
      follow: false,
      index: false,
    },
  }
}

export default async function PreinscriptionsAccessPage({
  params,
  searchParams,
}: AccessPageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  const t = await getTranslations({ locale, namespace: 'preinscriptions2027Access' })

  const nextPath =
    resolvedSearchParams.next &&
    isAllowedLocalizedPath(resolvedSearchParams.next, locale) &&
    resolvedSearchParams.next.startsWith(`/${locale}/`)
      ? resolvedSearchParams.next
      : getPreinscriptionsProtectedPath(locale)

  const sessionSecret = process.env.PRIVATE_SESSION_SECRET
  if (sessionSecret) {
    const cookieStore = await cookies()
    const token = cookieStore.get(PREINSCRIPTIONS_2027_COOKIE)?.value
    const hasAccess = await verifyPreinscriptionsSessionToken(token, sessionSecret)
    if (hasAccess) redirect(nextPath)
  }

  const hasError = resolvedSearchParams.error === '1'

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-md items-center px-4 py-16">
      <div className="w-full rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="text-xl font-semibold">{t('title')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('intro')}</p>

        <form action="/api/preinscriptions-2027/session" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="next" value={nextPath} />

          <div className="space-y-2">
            <label htmlFor="private-password" className="text-sm font-medium">
              {t('passwordLabel')}
            </label>
            <Input
              id="private-password"
              name="password"
              type="password"
              autoComplete="off"
              required
            />
          </div>

          {hasError && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {t('errorWrongPassword')}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-mosque-gold text-white transition-colors hover:bg-mosque-gold-hover"
          >
            {t('submit')}
          </Button>
        </form>
      </div>
    </section>
  )
}
