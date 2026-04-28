import { getTranslations } from 'next-intl/server'

import { SharedKitchen } from '@/components/organisms/SharedKitchen'

export const revalidate = 120

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'activitiesPage' })
  return {
    title: t('kitchen.title'),
  }
}

export const CuisinePartageePage = () => {
  return <SharedKitchen />
}

export default CuisinePartageePage
