'use client'

import { useTranslations } from 'next-intl'
import { Clock } from 'lucide-react'

export default function AssociationPage() {
  const t = useTranslations('association')

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <header className="mb-10 text-center">
        <h1 className="font-display text-4xl font-normal text-mosque-green md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
      </header>

      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-mosque-green/30 bg-mosque-green-light px-8 py-16 text-center">
        <Clock className="h-10 w-10 text-mosque-green/50" />
        <p className="text-lg text-mosque-green/70">{t('placeholder')}</p>
      </div>
    </section>
  )
}
