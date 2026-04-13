'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

// SVG géométrique islamique (zellige) — utilisé quand aucune image n'est fournie
const ISLAMIC_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.12'%3E%3Cpath d='M30 0l5 10H25L30 0zm0 60l5-10H25l5 10zM0 30l10-5v10L0 30zm60 0l-10-5v10L60 30zM15 15l5 5-5 5-5-5 5-5zm30 0l5 5-5 5-5-5 5-5zm-30 30l5 5-5 5-5-5 5-5zm30 0l5 5-5 5-5-5 5-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

function NewsCard({
  tag,
  title,
  date,
  preview,
  children,
  isAr,
  image,
  imageAlt,
}: {
  tag: string
  title: string
  date: string
  preview: string
  children: React.ReactNode
  isAr: boolean
  image?: string
  imageAlt?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const readLabel = isAr ? 'اقرأ المزيد' : 'Lire la suite'
  const collapseLabel = isAr ? 'طي' : 'Réduire'

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-mosque-green/10 bg-card shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">

      {/* ── Header : image ou dégradé bleu ── */}
      <div className="relative h-40 overflow-hidden">
        {image ? (
          <>
            {/* Image réelle */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt ?? title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Voile sombre pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          </>
        ) : (
          <>
            {/* Fond dégradé bleu + motif zellige */}
            <div className="absolute inset-0 bg-gradient-to-br from-mosque-green via-mosque-green to-mosque-green/80 dark:from-[hsl(220,22%,14%)] dark:via-[hsl(220,20%,12%)] dark:to-[hsl(220,18%,10%)]" />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: ISLAMIC_PATTERN }}
            />
          </>
        )}

        {/* Tag + date flottants en bas du header */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-3">
          <Badge className="border-0 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
            {tag}
          </Badge>
          <span className="flex items-center gap-1 text-[11px] font-medium text-white/80">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>
      </div>

      {/* ── Corps ── */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <h3 className="mb-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-mosque-green">
          {title}
        </h3>

        {!expanded ? (
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {preview}
          </p>
        ) : (
          <div className="flex-1 space-y-2 text-sm leading-relaxed text-foreground">
            {children}
          </div>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-mosque-green/25 py-2 text-sm font-semibold text-mosque-green transition-all hover:border-transparent hover:bg-mosque-green hover:text-white"
        >
          {expanded ? (
            <>{collapseLabel} <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>{readLabel} <ChevronDown className="h-4 w-4" /></>
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
    <section id="news" className="bg-background py-14">
      <div className="mx-auto max-w-[900px] px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-mosque-green md:text-3xl">
            {t('title')}
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <NewsCard
            tag={t('item1.tag')}
            title={t('item1.title')}
            date={t('item1.date')}
            preview={isAr ? t('item1.p2Ar') : t('item1.p1')}
            isAr={isAr}
          >
            <p>{isAr ? t('item1.p2Ar') : t('item1.p1')}</p>
          </NewsCard>

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
      </div>
    </section>
  )
}
