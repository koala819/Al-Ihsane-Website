'use client'

import { useLocale, useTranslations } from 'next-intl'

const ITEMS = ['item1', 'item2', 'item3', 'item4'] as const

export function History() {
  const t = useTranslations('history')
  const locale = useLocale()

  return (
    <section id="history" className="mx-auto max-w-[900px] px-4 py-8">
      <h2 className="mb-4 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>
      <div className="grid gap-4">
        {ITEMS.map((key) => (
          <div
            key={key}
            className="rounded-md border-l-4 border-mosque-green bg-mosque-muted p-4"
          >
            <strong className="text-mosque-green">{t(`${key}.year`)}</strong>
            <p className="mt-1 text-foreground">
              {locale === 'ar' ? t(`${key}.textAr`) : t(`${key}.text`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
