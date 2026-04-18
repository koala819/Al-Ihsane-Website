import { getTranslations } from 'next-intl/server'

import { CuisinePartageeView } from '@/components/sections/CuisinePartageeView'

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

export default function CuisinePartageePage() {
  return <CuisinePartageeView />
}
