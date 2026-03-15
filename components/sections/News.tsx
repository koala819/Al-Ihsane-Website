'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'

function NewsCard({
  tag,
  title,
  date,
  preview,
  children,
  isAr,
}: {
  tag: string
  title: string
  date: string
  preview: string
  children: React.ReactNode
  isAr: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const readLabel = isAr ? 'اقرأ المزيد' : 'Lire la suite'
  const collapseLabel = isAr ? 'طي' : 'Réduire'

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-mosque-green/10 bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Bandeau coloré en haut */}
      <div className="h-1.5 bg-gradient-to-r from-mosque-green to-mosque-green/50" />

      <div className="flex flex-1 flex-col p-5">
        {/* Tag + date */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-mosque-green/10 px-2.5 py-0.5 text-xs font-semibold text-mosque-green">
            {tag}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>

        {/* Titre */}
        <h3 className="mb-3 text-base font-bold leading-snug text-foreground">
          {title}
        </h3>

        {/* Contenu */}
        {!expanded ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {preview}
          </p>
        ) : (
          <div className="space-y-2 text-sm leading-relaxed text-foreground">
            {children}
          </div>
        )}

        {/* Bouton */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex cursor-pointer items-center gap-1 self-start rounded-lg border border-mosque-green/30 px-3 py-1.5 text-xs font-semibold text-mosque-green transition-colors hover:bg-mosque-green hover:text-white"
        >
          {expanded ? (
            <>{collapseLabel} <ChevronUp className="h-3.5 w-3.5" /></>
          ) : (
            <>{readLabel} <ChevronDown className="h-3.5 w-3.5" /></>
          )}
        </button>
      </div>
    </article>
  )
}

export function News() {
  const t = useTranslations('news')
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <section id="news" className="mx-auto max-w-[900px] px-4 py-8">
      <h2 className="mb-5 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Card 1 — Aïd al-Fitr */}
        <NewsCard
          tag={t('item1.tag')}
          title={t('item1.title')}
          date={t('item1.date')}
          preview={isAr ? t('item1.p2Ar') : t('item1.p1')}
          isAr={isAr}
        >
          <p>{isAr ? t('item1.p2Ar') : t('item1.p1')}</p>
        </NewsCard>

        {/* Card 2 — Cours enfants */}
        <NewsCard
          tag={t('item2.tag')}
          title={t('item2.title')}
          date={t('item2.date')}
          preview={t('item2.p1')}
          isAr={isAr}
        >
          <p>{t('item2.p1')}</p>
          <p>{t('item2.p2')}</p>
          <ul className={['list-disc space-y-1', isAr ? 'pr-5' : 'pl-5'].join(' ')}>
            <li>{t('item2.slots.0')}</li>
            <li>{t('item2.slots.1')}</li>
          </ul>
          <p className="pt-1 font-medium text-mosque-green">{t('item2.p3')}</p>
        </NewsCard>
      </div>
    </section>
  )
}
