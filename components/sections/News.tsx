'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
    <Card className="group flex flex-col overflow-hidden border-mosque-green/10 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Bandeau coloré */}
      <div className="h-1 bg-gradient-to-r from-mosque-green to-mosque-green/40" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="bg-mosque-green/10 text-mosque-green hover:bg-mosque-green/15"
          >
            {tag}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>
        <CardTitle className="mt-2 text-base leading-snug">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {!expanded ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {preview}
          </p>
        ) : (
          <div className="space-y-2 text-sm leading-relaxed text-foreground">
            {children}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
          className="border-mosque-green/30 text-mosque-green hover:bg-mosque-green hover:text-white"
        >
          {expanded ? (
            <>
              {collapseLabel} <ChevronUp className="ml-1 h-3.5 w-3.5" />
            </>
          ) : (
            <>
              {readLabel} <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function News() {
  const t = useTranslations('news')
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <section id="news" className="mx-auto max-w-[900px] px-4 py-10">
      <h2 className="mb-6 text-xl font-semibold text-mosque-green md:text-2xl">
        {t('title')}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
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
    </section>
  )
}
