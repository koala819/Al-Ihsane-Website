import { getTranslations } from 'next-intl/server'

import { Activities } from '@/components/organisms/Activities'

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

export const ActivitiesPage = () => {
  return <Activities />
}

export default ActivitiesPage
