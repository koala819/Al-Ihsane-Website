import { getTranslations } from 'next-intl/server'

import { ActivitiesPageSection } from '@/components/sections/ActivitiesPageSection'

export const revalidate = 120

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'activitiesPage' })
  return {
    title: t('title'),
  }
}

export default function ActivitesPage() {
  return <ActivitiesPageSection />
}
