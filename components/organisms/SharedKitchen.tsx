'use client'

import { useLocale, useTranslations } from 'next-intl'
import {
  ClipboardCheck,
  Heart,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

import { Breadcrumb } from '@/components/molecules/Breadcrumb'
import { KitchenGoogleCalendar } from '@/components/molecules/KitchenGoogleCalendar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const WHY_ICONS = [UsersRound, Heart, ClipboardCheck, ShieldCheck] as const

function isAllowedGoogleCalendarEmbedUrl(url: string): boolean {
  try {
    const u = new URL(url.trim())
    return u.protocol === 'https:' && u.hostname === 'calendar.google.com'
  } catch {
    return false
  }
}

function isValidKitchenCalendarId(id: string): boolean {
  const t = id.trim()
  if (t.length < 8 || t.length > 260) return false
  return /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(t)
}

function isPlausibleGoogleBrowserApiKey(key: string): boolean {
  const t = key.trim()
  return t.length >= 30 && t.length <= 200 && /^[A-Za-z0-9_-]+$/.test(t)
}

export const SharedKitchen = () => {
  const t = useTranslations('activitiesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const embedUrl =
    typeof process.env.NEXT_PUBLIC_KITCHEN_CALENDAR_EMBED_URL === 'string'
      ? process.env.NEXT_PUBLIC_KITCHEN_CALENDAR_EMBED_URL.trim()
      : ''
  const apiKey =
    typeof process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY === 'string'
      ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY.trim()
      : ''
  const calendarId =
    typeof process.env.NEXT_PUBLIC_KITCHEN_CALENDAR_ID === 'string'
      ? process.env.NEXT_PUBLIC_KITCHEN_CALENDAR_ID.trim()
      : ''

  const showApiCalendar =
    isPlausibleGoogleBrowserApiKey(apiKey) && isValidKitchenCalendarId(calendarId)
  const showIframe =
    !showApiCalendar && embedUrl.length > 0 && isAllowedGoogleCalendarEmbedUrl(embedUrl)
  const whyKeys = ['why1', 'why2', 'why3', 'why4'] as const

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), href: '/' },
            { label: t('breadcrumb.activities'), href: '/activites' },
            { label: t('breadcrumb.kitchen') },
          ]}
        />

        <header className={cn('mb-8 md:mb-10', isAr && 'text-right')}>
          <h1 className="text-2xl font-bold text-mosque-green md:text-3xl">{t('kitchen.title')}</h1>
          <div
            className={cn(
              'mt-2 h-1 w-12 rounded-full bg-mosque-green/30',
              isAr && 'ms-auto',
            )}
          />
        </header>

        <p
          className={cn(
            'mb-10 text-sm leading-relaxed text-muted-foreground md:mb-12 md:text-base',
            isAr && 'text-right',
          )}
          lang={isAr ? 'ar' : 'fr'}
        >
          {t('kitchen.lead')}
        </p>

        <div id="cuisine-partagee" className="scroll-mt-[5.5rem]">
          {/* Why Section */}
          <div>
            <h3
              className={cn(
                'mb-6 text-lg font-bold text-mosque-green md:text-xl',
                isAr && 'text-right',
              )}
            >
              {t('kitchen.whyTitle')}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {whyKeys.map((key, i) => {
                const Icon = WHY_ICONS[i]
                return (
                  <div
                    key={key}
                    className={cn(
                      'rounded-2xl border border-mosque-green/12 bg-card p-5 shadow-sm transition-shadow hover:shadow-md',
                      isAr && 'text-right',
                    )}
                    lang={isAr ? 'ar' : 'fr'}
                  >
                    <div
                      className={cn(
                        'mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-mosque-green/10',
                        isAr && 'ms-auto',
                      )}
                    >
                      <Icon className="h-5 w-5 text-mosque-green" aria-hidden />
                    </div>
                    <p className="font-semibold text-foreground">{t(`kitchen.${key}Title`)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`kitchen.${key}Text`)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rates Section */}
          <div className="mt-10 md:mt-12">
            <h3 className={cn('mb-4 text-lg font-bold text-mosque-green md:text-xl', isAr && 'text-right')}>
              {t('kitchen.ratesTitle')}
            </h3>
            <div
              className="overflow-hidden rounded-2xl border border-mosque-green/12 bg-card shadow-sm"
              lang={isAr ? 'ar' : 'fr'}
            >
              <ul className="divide-y divide-mosque-green/10">
                <li className={cn('flex flex-wrap items-baseline justify-between gap-2 px-5 py-4', isAr && 'flex-row-reverse')}>
                  <span className="text-sm font-medium text-foreground">{t('kitchen.rateHalfLabel')}</span>
                  <span className="text-lg font-bold tabular-nums text-mosque-green">{t('kitchen.rateHalfPrice')}</span>
                </li>
                <li className={cn('flex flex-wrap items-baseline justify-between gap-2 px-5 py-4', isAr && 'flex-row-reverse')}>
                  <span className="text-sm font-medium text-foreground">{t('kitchen.rateFullLabel')}</span>
                  <span className="text-lg font-bold tabular-nums text-mosque-green">{t('kitchen.rateFullPrice')}</span>
                </li>
                <li className={cn('flex flex-wrap items-baseline justify-between gap-2 px-5 py-4', isAr && 'flex-row-reverse')}>
                  <span className="text-sm font-medium text-foreground">{t('kitchen.rateCollectiveLabel')}</span>
                  <span className="text-sm font-semibold text-muted-foreground">{t('kitchen.rateCollectivePrice')}</span>
                </li>
              </ul>
              <div
                className={cn(
                  'border-t border-amber-200/80 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/25 dark:text-amber-100',
                  isAr && 'text-right',
                )}
              >
                {t('kitchen.depositNote')}
              </div>
            </div>
          </div>

          {/* Docs Section */}
          <div className="mt-10 md:mt-12">
            <h3 className={cn('mb-4 text-lg font-bold text-mosque-green md:text-xl', isAr && 'text-right')}>
              {t('kitchen.docsTitle')}
            </h3>
            <div
              className={cn(
                'rounded-2xl border border-mosque-green/15 bg-mosque-green-light/50 px-5 py-5 dark:bg-mosque-green/10',
                isAr && 'text-right',
              )}
              lang={isAr ? 'ar' : 'fr'}
            >
              <ul
                dir={isAr ? 'rtl' : 'ltr'}
                className="list-inside list-disc space-y-3 text-sm leading-relaxed text-foreground"
              >
                <li>{t('kitchen.doc1')}</li>
                <li>{t('kitchen.doc2')}</li>
                <li>{t('kitchen.doc3')}</li>
                <li>{t('kitchen.doc4')}</li>
              </ul>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="mt-10 md:mt-12">
            <h3 className={cn('mb-4 text-lg font-bold text-mosque-green md:text-xl', isAr && 'text-right')}>
              {t('kitchen.calendarTitle')}
            </h3>
            {showApiCalendar ? (
              <div className="overflow-hidden rounded-2xl border border-mosque-green/12 bg-muted/20 shadow-inner">
                <div className="border-b border-mosque-green/10 bg-mosque-green-light/50 px-4 py-2.5 text-center text-xs font-semibold text-mosque-green dark:bg-mosque-green/15 dark:text-mosque-green">
                  Google Calendar — {t('kitchen.title')}
                </div>
                <KitchenGoogleCalendar
                  apiKey={apiKey}
                  calendarId={calendarId}
                  language={locale === 'fr' ? 'FR' : 'EN'}
                />
              </div>
            ) : showIframe ? (
              <div className="overflow-hidden rounded-2xl border border-mosque-green/12 bg-muted/20 shadow-inner">
                <div className="border-b border-mosque-green/10 bg-mosque-green-light/50 px-4 py-2.5 text-center text-xs font-semibold text-mosque-green dark:bg-mosque-green/15 dark:text-mosque-green">
                  {t('kitchen.title')}
                </div>
                <iframe
                  title={t('kitchen.calendarTitle')}
                  src={embedUrl}
                  className="h-[min(70vh,480px)] w-full bg-background"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div
                className={cn(
                  'rounded-2xl border border-dashed border-mosque-green/25 bg-muted/40 px-5 py-8 text-center text-sm text-muted-foreground',
                  isAr && 'text-right',
                )}
              >
                {t('kitchen.calendarEmpty')}
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-center md:mt-12">
            <Button
              asChild
              size="lg"
              className="min-w-[min(100%,280px)] bg-mosque-gold font-semibold text-white shadow-md transition-colors hover:bg-mosque-gold-hover"
            >
              <Link href="/contact">{t('kitchen.bookCta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
