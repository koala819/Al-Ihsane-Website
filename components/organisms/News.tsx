'use client'

import { useLocale, useTranslations } from 'next-intl'

import { ActuCard } from '@/components/molecules/ActuCard'
import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { urlForImage } from '@/lib/sanity/image'
import type { SanityNewsArticle } from '@/lib/sanity/queries'
import { NewsProps } from '@/types/models'

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

export const News = ({
  cmsArticles = [],
  variant = 'home',
}: NewsProps) => {
  const t = useTranslations('news')
  const isAr = useLocale() === 'ar'

  const useCms = cmsArticles.length > 0
  const isHome = variant === 'home'
  const heading = isHome ? t('title') : t('allActivitiesTitle')
  const showViewAll = isHome && useCms

  return (
    <section id="news" className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HeadingBlock title={heading} as={isHome ? 'h2' : 'h1'} isRtl={isAr} />

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
                <ActuCard
                  key={article._id}
                  tag={tag}
                  title={title}
                  date={date}
                  preview={excerpt}
                  body={body}
                  dir={isAr ? 'rtl' : 'ltr'}
                  isAr={isAr}
                  imageUrl={imageUrl}
                  imageAlt={img?.alt ?? title}
                />
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
              className="min-w-[min(100%,280px)] bg-brand-gold font-semibold text-white shadow-md transition-colors hover:bg-brand-gold-hover"
            >
              <Link href="/actualites">{t('viewAllActivities')}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
