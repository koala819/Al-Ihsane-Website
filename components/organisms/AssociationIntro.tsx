'use client'

import { useLocale, useTranslations } from 'next-intl'
import { BookOpen, Handshake, Heart, Star, Utensils } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const ACTIVITIES_KEYS = ['meals', 'social', 'events'] as const

const ACTIVITY_ICONS = {
  meals: Utensils,
  social: Heart,
  events: Star,
}

const VALUE_ICONS = [Heart, BookOpen, Handshake] as const

/**
 * Bloc association sur l’accueil : même vocabulaire que News / History (titre + filet, py-14).
 * Le lien « voir toutes les actualités » reste uniquement sous la section Actualités.
 */
export function AssociationIntro() {
  const t = useTranslations('association')
  const tActivities = useTranslations('association.activities')
  const locale = useLocale()
  const isAr = locale === 'ar'

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
      className="scroll-mt-[4.5rem] border-t border-mosque-green/10 bg-background py-14"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* En-tête — même bloc titre que Actualités (News) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-mosque-green md:text-3xl">{t('title')}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
        </div>

        {/* Mission (texte) + valeurs (liste compacte) */}
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
                'rounded-2xl border border-mosque-green/15 bg-mosque-green-light/50 p-5 shadow-sm dark:bg-mosque-green/10',
                isAr && 'text-right',
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-mosque-green">
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
                'mb-4 text-sm font-semibold uppercase tracking-wide text-mosque-green',
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
                    'flex gap-3 rounded-xl border border-mosque-green/10 bg-card p-4 shadow-sm transition-shadow hover:shadow-md',
                    isAr && 'flex-row-reverse text-right',
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mosque-green/10">
                    <Icon className="h-5 w-5 text-mosque-green" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-mosque-green">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Sous-section activités — même famille visuelle que les cartes actualités */}
        <div className="mt-14 border-t border-mosque-green/10 pt-12 md:mt-16 md:pt-14">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-mosque-green md:text-3xl">{tActivities('title')}</h3>
            <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES_KEYS.map((key) => {
              const Icon = ACTIVITY_ICONS[key]
              return (
                <article
                  key={key}
                  className="flex flex-col rounded-2xl border border-mosque-green/10 bg-card p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  lang={isAr ? 'ar' : 'fr'}
                >
                  <div className={cn('flex gap-3', isAr && 'flex-row-reverse text-right')}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mosque-green/10">
                      <Icon className="h-5 w-5 text-mosque-green" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-mosque-green/10 text-[11px] text-mosque-green hover:bg-mosque-green/15"
                      >
                        {tActivities(`${key}.tag`)}
                      </Badge>
                      <h4 className="text-base font-bold leading-snug text-foreground">
                        {tActivities(`${key}.title`)}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-mosque-green">
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
