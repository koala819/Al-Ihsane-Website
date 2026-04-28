'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Breadcrumb } from '@/components/molecules/Breadcrumb'
import { SharedKitchenSection } from '@/components/organisms/SharedKitchenSection'
import { cn } from '@/lib/utils'

/**
 * Page cuisine partagée — même gabarit que la page Activités (marges, fil d’Ariane, titre + filet, intro).
 */
export function CuisinePartageeView() {
  const t = useTranslations('activitiesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'

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

        <SharedKitchenSection hideIntro />
      </div>
    </section>
  )
}
