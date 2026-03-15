'use client'

import { useLocale, useTranslations } from 'next-intl'

export function News() {
  const t = useTranslations('news')
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <section id="news" className="mx-auto max-w-[900px] px-4 py-8">
      <h2 className="mb-4 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>
      <div className="space-y-4">
        {/* Article 1 */}
        <article className="rounded-md bg-mosque-muted p-4">
          <h3 className="font-semibold text-mosque-green">
            {t('item1.title')}
          </h3>
          <p className="mt-1 text-foreground">
            {isAr ? t('item1.p2Ar') : t('item1.p1')}
          </p>
        </article>

        {/* Article 2 */}
        <article className="rounded-md bg-mosque-muted p-4">
          <h3 className="font-semibold text-mosque-green">
            {t('item2.title')}
          </h3>
          <div className="mt-2 space-y-2 text-foreground">
            <p>{t('item2.p1')}</p>
            <p>{t('item2.p2')}</p>
            <ul className="list-inside list-disc space-y-1 pl-4">
              <li>{t('item2.slots.0')}</li>
              <li>{t('item2.slots.1')}</li>
            </ul>
            <p>{t('item2.p3')}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
