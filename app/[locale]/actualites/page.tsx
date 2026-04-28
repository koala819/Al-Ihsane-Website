import { getLocale, getTranslations } from 'next-intl/server'

import { Breadcrumb } from '@/components/molecules/Breadcrumb'
import { News } from '@/components/organisms/News'
import { getNewsArticlesFull } from '@/lib/sanity/queries'

export const revalidate = 120

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'news' })
  return {
    title: t('allActivitiesTitle'),
  }
}

export default async function ActualitesPage() {
  const locale = await getLocale()
  const tNews = await getTranslations({ locale, namespace: 'news' })
  const tActivities = await getTranslations({ locale, namespace: 'activitiesPage' })
  const cmsArticles = await getNewsArticlesFull()

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-14">
        <Breadcrumb
          items={[
            { label: tActivities('breadcrumb.home'), href: '/' },
            { label: tNews('title') },
          ]}
          className="mb-0"
        />
      </div>
      <News variant="full" cmsArticles={cmsArticles} />
    </>
  )
}
