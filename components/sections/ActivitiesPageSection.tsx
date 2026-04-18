'use client'

import { useLocale, useTranslations } from 'next-intl'
import { GraduationCap, UtensilsCrossed } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * Page « Nos activités » — école & cuisine partagée (contenu provisoire, messages en construction).
 */
export function ActivitiesPageSection() {
  const t = useTranslations('activitiesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'

  const blocks = [
    {
      key: 'school',
      icon: GraduationCap,
      title: t('schoolTitle'),
      body: t('schoolBody'),
    },
    {
      key: 'kitchen',
      icon: UtensilsCrossed,
      title: t('kitchenTitle'),
      body: t('kitchenBody'),
    },
  ] as const

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-5xl px-4">
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
            'mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base',
            isAr && 'ms-auto text-right',
          )}
        >
          {t('intro')}
        </p>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {blocks.map(({ key, icon: Icon, title, body }) => (
            <article
              key={key}
              className={cn(
                'flex flex-col rounded-2xl border border-mosque-green/12 bg-card p-6 shadow-sm md:p-7',
                isAr && 'text-right',
              )}
              lang={isAr ? 'ar' : 'fr'}
            >
              <div className={cn('mb-4 flex items-start gap-3', isAr && 'flex-row-reverse')}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mosque-green/10">
                  <Icon className="h-6 w-6 text-mosque-green" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-foreground md:text-xl">{title}</h2>
                </div>
              </div>

              <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {body}
              </p>

              <div
                className={cn(
                  'rounded-xl border border-dashed border-mosque-green/25 bg-mosque-green-light/40 px-4 py-3 dark:bg-mosque-green/10',
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
          ))}
        </div>
      </div>
    </section>
  )
}
