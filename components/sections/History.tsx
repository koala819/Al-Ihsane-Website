'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'

const ITEMS = ['item1', 'item2', 'item3', 'item4'] as const

export function History() {
  const t = useTranslations('history')
  const locale = useLocale()

  return (
    <section id="history" className="mx-auto max-w-[900px] px-4 py-10">
      <h2 className="mb-8 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>

      {/* Timeline verticale */}
      <div className="relative">
        {/* Ligne verticale centrale */}
        <div className="absolute left-4 top-0 h-full w-px bg-mosque-green/20 md:left-1/2 md:-translate-x-px" />

        <div className="space-y-8">
          {ITEMS.map((key, index) => {
            const isLeft = index % 2 === 0

            return (
              <div
                key={key}
                className={[
                  'relative flex items-start gap-4 pl-12 md:pl-0',
                  isLeft
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse',
                ].join(' ')}
              >
                {/* Point central */}
                <div className="absolute left-4 top-2 flex h-0 w-0 items-center justify-center md:left-1/2 md:-translate-x-1/2">
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
                  <Badge className="mb-2 bg-mosque-green text-white hover:bg-mosque-green/90">
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
    </section>
  )
}
