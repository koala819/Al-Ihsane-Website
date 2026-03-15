'use client'

import { useTranslations } from 'next-intl'

export function News() {
  const t = useTranslations('news')

  return (
    <section id="news" className="mx-auto max-w-[900px] px-4 py-8">
      <h2 className="mb-4 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>
      <div className="space-y-4">
        <article className="rounded-md bg-mosque-muted p-4">
          <h3 className="font-semibold text-mosque-green">
            {t('item1.title')}
          </h3>
          <p className="mt-1 text-foreground">{t('item1.p1')}</p>
        </article>
        <article className="rounded-md bg-mosque-muted p-4">
          <h3 className="font-semibold text-mosque-green">
            {t('item2.title')}
          </h3>
          <p className="mt-1 text-foreground">{t('item2.p1')}</p>
          <p className="mt-2 text-foreground">{t('item2.p2')}</p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4 text-foreground">
            <li>{t('item2.slots.0')}</li>
            <li>{t('item2.slots.1')}</li>
          </ul>
          <p className="mt-2 text-foreground">{t('item2.p3')}</p>
        </article>
      </div>
    </section>
  )
}
