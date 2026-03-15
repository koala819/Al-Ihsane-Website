'use client'

import { useTranslations } from 'next-intl'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="mx-auto max-w-[900px] px-4 py-8">
      <h2 className="mb-4 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>
      <div className="space-y-1 text-foreground">
        <p className="whitespace-pre-line">{t('address')}</p>
        <p>{t('phone')}</p>
      </div>
    </section>
  )
}
