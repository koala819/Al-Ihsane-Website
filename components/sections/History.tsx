'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'

const ITEMS = ['item1', 'item2', 'item3', 'item4'] as const

export function History() {
  const t = useTranslations('history')
  const locale = useLocale()

  return (
    <section id="history" className="bg-background py-12">
      <div className="mx-auto max-w-[900px] px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-mosque-green md:text-3xl">
            {t('title')}
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
        </div>

        {/* Timeline verticale */}
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-4 top-0 h-full w-px bg-mosque-green/20 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {ITEMS.map((key, index) => {
              const isLeft = index % 2 === 0

              return (
                <div
                  key={key}
                  className={[
                    'relative flex items-start gap-4 pl-12 md:pl-0',
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse',
                  ].join(' ')}
                >
                  {/* Point central */}
                  <div className="absolute left-4 top-2 flex items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full border-2 border-mosque-green bg-background shadow-sm" />
                  </div>

                  {/* Contenu */}
                  <div
                    className={[
                      'w-full rounded-xl border border-mosque-green/10 bg-card p-5 shadow-sm transition-shadow hover:shadow-md',
                      'md:w-[calc(50%-2rem)]',
                      isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0',
                    ].join(' ')}
                  >
                    <Badge className="mb-2 bg-mosque-green text-white hover:bg-mosque-green/90 dark:bg-mosque-green/15 dark:text-mosque-green dark:ring-1 dark:ring-mosque-green/50 dark:hover:bg-mosque-green/25">
                      {t(`${key}.year`)}
                    </Badge>
                    <p className="text-sm leading-relaxed text-foreground">
                      {locale === 'ar' ? t(`${key}.textAr`) : t(`${key}.text`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
