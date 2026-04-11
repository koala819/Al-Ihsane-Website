'use client'

import { useTranslations } from 'next-intl'

export function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="bg-mosque-muted/40 py-14">
      <div className="mx-auto max-w-[900px] px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-mosque-green md:text-3xl">
            {t('title')}
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
        </div>
        <p className="leading-relaxed text-foreground">{t('p1')}</p>
      </div>
    </section>
  )
}
