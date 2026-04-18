import { getTranslations } from 'next-intl/server'

import { News } from '@/components/sections/News'
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

export default async function ActivitesPage() {
  const cmsArticles = await getNewsArticlesFull()

  return <News variant="full" cmsArticles={cmsArticles} />
}
