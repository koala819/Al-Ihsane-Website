'use client'

import { useLocale, useTranslations } from 'next-intl'
import { BookOpen, Handshake, Heart, Star, Utensils } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HeadingBlock } from '@/components/molecules/HeadingBlock'

const ACTIVITIES_KEYS = ['meals', 'social', 'events'] as const

const ACTIVITY_ICONS = {
  meals: Utensils,
  social: Heart,
  events: Star,
}

const VALUE_ICONS = [Heart, BookOpen, Handshake] as const

export const Association = () => {
  const t = useTranslations('association')
  const tActivities = useTranslations('association.activities')
  const isAr = useLocale() === 'ar'

  const values = [
    {
      icon: VALUE_ICONS[0],
      title: t('about.value1Title'),
      text: t('about.value1Text'),
    },
    {
      icon: VALUE_ICONS[1],
      title: t('about.value2Title'),
      text: t('about.value2Text'),
    },
    {
      icon: VALUE_ICONS[2],
      title: t('about.value3Title'),
      text: t('about.value3Text'),
    },
  ]

  return (
    <section
      id="association"
      className="scroll-mt-[4.5rem] border-t border-brand-green/10 bg-background py-14"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Notre association*/}
        <HeadingBlock title={t('title')} isRtl={isAr} />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div
            className={cn('space-y-6 lg:col-span-7', isAr ? 'text-right' : 'text-left')}
            lang={isAr ? 'ar' : 'fr'}
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('hero.text')}
            </p>

            <div
              className={cn(
                'rounded-2xl border border-brand-green/15 bg-brand-green-light/50 p-5 shadow-sm dark:bg-brand-green/10',
                isAr && 'text-right',
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                {t('about.mission')}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground md:text-[15px]">
                {t('about.p1')}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t('about.p2')}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <h3
              className={cn(
                'mb-4 text-sm font-semibold uppercase tracking-wide text-brand-green',
                isAr && 'text-right',
              )}
            >
              {t('about.title')}
            </h3>
            <ul className="flex flex-col gap-3">
              {values.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className={cn(
                    'flex gap-3 rounded-xl border border-brand-green/10 bg-card p-4 shadow-sm transition-shadow hover:shadow-md',
                    isAr && 'flex-row-reverse text-right',
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                    <Icon className="h-5 w-5 text-brand-green" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-green">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Nos activités */}
        <div className="mt-14 border-t border-brand-green/10 pt-12 md:mt-16 md:pt-14">
          <HeadingBlock title={tActivities('title')} isRtl={isAr} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES_KEYS.map((key) => {
              const Icon = ACTIVITY_ICONS[key]
              return (
                <article
                  key={key}
                  className="flex flex-col rounded-2xl border border-brand-green/10 bg-card p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  lang={isAr ? 'ar' : 'fr'}
                >
                  <div className={cn('flex gap-3', isAr && 'flex-row-reverse text-right')}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10">
                      <Icon className="h-5 w-5 text-brand-green" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-brand-green/10 text-[11px] text-brand-green hover:bg-brand-green/15"
                      >
                        {tActivities(`${key}.tag`)}
                      </Badge>
                      <h4 className="text-base font-bold leading-snug text-foreground">
                        {tActivities(`${key}.title`)}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-brand-green">
                        {tActivities(`${key}.subtitle`)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {tActivities(`${key}.p1`)}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
