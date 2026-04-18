'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ChevronRight, GraduationCap, UtensilsCrossed } from 'lucide-react'

import { ActivitiesBreadcrumb } from '@/components/molecules/ActivitiesBreadcrumb'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

/**
 * Page index « Nos activités » : fil d’Ariane + deux cartes uniquement (école en construction, cuisine → sous-page).
 */
export function ActivitiesPageSection() {
  const t = useTranslations('activitiesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        <ActivitiesBreadcrumb />

        <header className={cn('mb-8 md:mb-10', isAr && 'text-right')}>
          <h1 className="text-2xl font-bold text-mosque-green md:text-3xl">{t('title')}</h1>
          <div
            className={cn(
              'mt-2 h-1 w-12 rounded-full bg-mosque-green/30',
              isAr && 'ms-auto',
            )}
          />
        </header>

        <p
          className={cn(
            'mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mb-12 md:text-base',
            isAr && 'ms-auto text-right',
          )}
        >
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* École — pas de sous-page, mention en construction sur la carte */}
          <article
            className={cn(
              'flex flex-col rounded-2xl border border-mosque-green/12 bg-card p-6 shadow-sm md:p-7',
              isAr && 'text-right',
            )}
            lang={isAr ? 'ar' : 'fr'}
          >
            <div className={cn('mb-4 flex items-start gap-3', isAr && 'flex-row-reverse')}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mosque-green/10">
                <GraduationCap className="h-6 w-6 text-mosque-green" aria-hidden />
              </div>
              <h2 className="text-lg font-bold text-foreground md:text-xl">{t('schoolTitle')}</h2>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {t('schoolBody')}
            </p>
            <div
              className={cn(
                'mt-auto rounded-xl border border-dashed border-mosque-green/25 bg-mosque-green-light/40 px-4 py-3 dark:bg-mosque-green/10',
                isAr && 'text-right',
              )}
            >
              <Badge
                variant="secondary"
                className="mb-2 bg-mosque-green/15 text-xs font-semibold text-mosque-green hover:bg-mosque-green/20"
              >
                {t('constructionBadge')}
              </Badge>
              <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                {t('constructionNotice')}
              </p>
            </div>
          </article>

          {/* Cuisine — lien vers la page dédiée */}
          <Link
            href="/activites/cuisine-partagee"
            className={cn(
              'group flex flex-col rounded-2xl border border-mosque-green/12 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-mosque-green/25 hover:shadow-md md:p-7',
              isAr && 'text-right',
            )}
            lang={isAr ? 'ar' : 'fr'}
          >
            <div className={cn('mb-4 flex items-start gap-3', isAr && 'flex-row-reverse')}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mosque-green/10 transition-colors group-hover:bg-mosque-green/15">
                <UtensilsCrossed className="h-6 w-6 text-mosque-green" aria-hidden />
              </div>
              <h2 className="text-lg font-bold text-foreground md:text-xl">{t('kitchen.title')}</h2>
            </div>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {t('kitchen.cardTeaser')}
            </p>
            {/* Même style que le bouton « Lire la suite » des cartes Actualités (NewsCard) */}
            <span
              className={cn(
                'mt-auto flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-mosque-gold/40 py-2 text-sm font-semibold text-mosque-gold transition-all',
                'group-hover:border-transparent group-hover:bg-mosque-gold group-hover:text-white',
                isAr && 'flex-row-reverse',
              )}
            >
              {t('kitchen.openPage')}
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
