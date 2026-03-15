'use client'

import { useTranslations } from 'next-intl'

export function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="mx-auto max-w-[900px] px-4 py-8">
      <h2 className="mb-2 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>
      <p className="text-foreground">{t('p1')}</p>
    </section>
  )
}
