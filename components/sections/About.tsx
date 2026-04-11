'use client'

import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'

export function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="mx-auto max-w-[900px] px-4 py-10">
      <h2 className="mb-3 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>
      <Separator className="mb-5 bg-mosque-green/15" />
      <p className="leading-relaxed text-foreground">{t('p1')}</p>
    </section>
  )
}
