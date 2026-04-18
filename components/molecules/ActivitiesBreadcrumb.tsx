'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

/**
 * Fil d’Ariane Activités :
 * - `/activites` : Al'Ihsane / Activités
 * - `/activites/cuisine-partagee` : Al'Ihsane / Activités / Cuisine partagée
 */
export function ActivitiesBreadcrumb() {
  const t = useTranslations('activitiesPage')
  const pathname = usePathname()
  const locale = useLocale()
  const isAr = locale === 'ar'

  const isKitchenPage = pathname === '/activites/cuisine-partagee'
  const isActivitesIndex = pathname === '/activites'

  const Sep = () => (
    <span className="select-none px-1.5 text-mosque-green/35" aria-hidden>
      /
    </span>
  )

  return (
    <nav
      aria-label={isAr ? 'مسار التصفح' : 'Fil d’Ariane'}
      className={cn(
        'mb-8 flex flex-wrap items-center text-sm text-muted-foreground md:mb-10',
        isAr && 'justify-end text-right',
      )}
    >
      <Link href="/" className="font-medium transition-colors hover:text-mosque-green">
        {t('breadcrumb.home')}
      </Link>
      <Sep />
      {isKitchenPage ? (
        <>
          <Link href="/activites" className="transition-colors hover:text-mosque-green">
            {t('breadcrumb.activities')}
          </Link>
          <Sep />
          <span className="font-semibold text-foreground">{t('breadcrumb.kitchen')}</span>
        </>
      ) : isActivitesIndex ? (
        <span className="font-semibold text-foreground">{t('breadcrumb.activities')}</span>
      ) : (
        <Link href="/activites" className="transition-colors hover:text-mosque-green">
          {t('breadcrumb.activities')}
        </Link>
      )}
    </nav>
  )
}
