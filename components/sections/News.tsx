'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'

import { PortableArticleBody } from '@/components/portable/PortableArticleBody'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity/image'
import type { SanityNewsArticle } from '@/lib/sanity/queries'

const ISLAMIC_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.12'%3E%3Cpath d='M30 0l5 10H25L30 0zm0 60l5-10H25l5 10zM0 30l10-5v10L0 30zm60 0l-10-5v10L60 30zM15 15l5 5-5 5-5-5 5-5zm30 0l5 5-5 5-5-5 5-5zm-30 30l5 5-5 5-5-5 5-5zm30 0l5 5-5 5-5-5 5-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

function formatDateLabel(article: SanityNewsArticle): string {
  if (article.dateLabel?.trim()) return article.dateLabel.trim()
  try {
    const d = new Date(article.publishedAt)
    return d.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

function NewsCard({
  tag,
  title,
  date,
  preview,
  children,
  isAr,
  imageUrl,
  imageAlt,
}: {
  tag: string
  title: string
  date: string
  preview: string
  children: React.ReactNode
  isAr: boolean
  imageUrl?: string | null
  imageAlt?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const readLabel = isAr ? 'اقرأ المزيد' : 'Lire la suite'
  const collapseLabel = isAr ? 'طي' : 'Réduire'

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-mosque-green/10 bg-card shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-40 overflow-hidden">
        {imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt ?? title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-mosque-green via-mosque-green to-mosque-green/80 dark:from-[hsl(220,22%,14%)] dark:via-[hsl(220,20%,12%)] dark:to-[hsl(220,18%,10%)]" />
            <div className="absolute inset-0" style={{ backgroundImage: ISLAMIC_PATTERN }} />
          </>
        )}

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

      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <h3 className="mb-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-mosque-green">
          {title}
        </h3>

        {!expanded ? (
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{preview}</p>
        ) : (
          <div className="flex-1 space-y-2 text-sm leading-relaxed text-foreground">{children}</div>
        )}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-mosque-gold/40 py-2 text-sm font-semibold text-mosque-gold transition-all hover:border-transparent hover:bg-mosque-gold hover:text-white"
        >
          {expanded ? (
            <>
              {collapseLabel} <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              {readLabel} <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </article>
  )
}

type NewsProps = {
  cmsArticles?: SanityNewsArticle[]
  /** Accueil : aperçu + bouton ; page dédiée : liste complète et titre adapté. */
  variant?: 'home' | 'full'
}

export function News({
  cmsArticles = [],
  variant = 'home',
}: NewsProps) {
  const t = useTranslations('news')
  const tActivities = useTranslations('activitiesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'

  const useCms = cmsArticles.length > 0
  const isHome = variant === 'home'
  const heading = isHome ? t('title') : t('allActivitiesTitle')
  const showViewAll = isHome && useCms

  const HeadingTag = isHome ? 'h2' : 'h1'

  return (
    <section id="news" className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        {/* Même fil d’Ariane que la page Activités : accueil = segment seul ; /actualités = Al'Ihsane / Actualités */}
        <nav
          aria-label={isAr ? 'مسار التصفح' : 'Fil d’Ariane'}
          className={cn(
            'mb-8 flex flex-wrap items-center text-sm text-muted-foreground md:mb-10',
            isAr && 'justify-end text-right',
          )}
        >
          {isHome ? (
            <span className="font-semibold text-foreground">
              {tActivities('breadcrumb.home')}
            </span>
          ) : (
            <>
              <Link
                href="/"
                className="font-medium transition-colors hover:text-mosque-green"
              >
                {tActivities('breadcrumb.home')}
              </Link>
              <span className="select-none px-1.5 text-mosque-green/35" aria-hidden>
                /
              </span>
              <span className="font-semibold text-foreground">{t('title')}</span>
            </>
          )}
        </nav>

        <header className={cn('mb-8 md:mb-10', isAr && 'text-right')}>
          <HeadingTag className="text-2xl font-bold text-mosque-green md:text-3xl">
            {heading}
          </HeadingTag>
          <div
            className={cn(
              'mt-2 h-1 w-12 rounded-full bg-mosque-green/30',
              isAr && 'ms-auto',
            )}
          />
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {useCms ? (
            cmsArticles.map((article) => {
              const title = isAr ? article.titleAr : article.titleFr
              const tag = (isAr ? article.tagAr : article.tagFr)?.trim() || '—'
              const excerpt = (isAr ? article.excerptAr : article.excerptFr)?.trim() || ''
              const body = isAr ? article.bodyAr : article.bodyFr
              const date = formatDateLabel(article)
              const img = article.mainImage
              const imageUrl =
                img?.asset && urlForImage(img)?.width(900).height(500).fit('crop').url()

              return (
                <NewsCard
                  key={article._id}
                  tag={tag}
                  title={title}
                  date={date}
                  preview={excerpt}
                  isAr={isAr}
                  imageUrl={imageUrl}
                  imageAlt={img?.alt ?? title}
                >
                  {body?.length ? (
                    <PortableArticleBody value={body} dir={isAr ? 'rtl' : 'ltr'} />
                  ) : (
                    excerpt && <p>{excerpt}</p>
                  )}
                </NewsCard>
              )
            })
          ) : (
            <p className="col-span-full py-10 text-center text-sm leading-relaxed text-muted-foreground xl:col-span-4">
              {t('empty')}
            </p>
          )}
        </div>

        {showViewAll && (
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="min-w-[min(100%,280px)] bg-mosque-gold font-semibold text-white shadow-md transition-colors hover:bg-mosque-gold-hover"
            >
              <Link href="/actualites">{t('viewAllActivities')}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
