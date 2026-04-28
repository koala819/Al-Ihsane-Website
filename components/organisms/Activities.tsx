'use client'

import { useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { GraduationCap, UtensilsCrossed } from 'lucide-react'

import { ActivityCard } from '@/components/molecules/ActivityCard'
import { Breadcrumb } from '@/components/molecules/Breadcrumb'
import { cn } from '@/lib/utils'
import { ActivityCardConfig } from '@/types/models'

export const Activities = () => {
  const t = useTranslations('activitiesPage')
  const isAr = useLocale() === 'ar'

  const activities = useMemo<ActivityCardConfig[]>(
    () => [
      {
        id: 'school',
        title: t('schoolTitle'),
        body: t('schoolBody'),
        icon: GraduationCap,
        showConstructionNotice: true,
      },
      {
        id: 'kitchen',
        title: t('kitchen.title'),
        body: t('kitchen.cardTeaser'),
        icon: UtensilsCrossed,
        href: '/activites/cuisine-partagee',
        ctaLabel: t('kitchen.openPage'),
      },
    ],
    [t],
  )

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), href: '/' },
            { label: t('breadcrumb.activities') },
          ]}
        />

        <header className={cn('mb-8 md:mb-10', isAr && 'text-right')}>
          <h1 className="text-2xl font-bold text-brand-green md:text-3xl">{t('title')}</h1>
          <div
            className={cn(
              'mt-2 h-1 w-12 rounded-full bg-brand-green/30',
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
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isAr={isAr}
              constructionBadgeLabel={t('constructionBadge')}
              constructionNoticeLabel={t('constructionNotice')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
