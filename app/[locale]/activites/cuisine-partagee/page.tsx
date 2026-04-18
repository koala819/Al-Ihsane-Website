import { getTranslations } from 'next-intl/server'

import { ActivitiesBreadcrumb } from '@/components/molecules/ActivitiesBreadcrumb'
import { SharedKitchenSection } from '@/components/sections/SharedKitchenSection'

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
  return (
    <div className="bg-background py-14">
      <div className="mx-auto max-w-6xl px-4">
        <ActivitiesBreadcrumb />
        <SharedKitchenSection />
      </div>
    </div>
  )
}
