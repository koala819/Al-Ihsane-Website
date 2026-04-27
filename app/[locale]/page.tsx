import { getLocale } from 'next-intl/server'
import { AssociationIntro } from '@/components/organisms/AssociationIntro'
import { DonateAlIhsane } from '@/components/organisms/DonateAlIhsane'
import { History } from '@/components/organisms/History'
import { News } from '@/components/organisms/News'
import { DayVerse } from '@/components/organisms/DayVerse'
import { AbderrahmaneMesliYoutube } from '@/components/organisms/AbderrahmaneMesliYoutube'
import { getNewsArticlesPreview } from '@/lib/sanity/queries'

/** Actualités Sanity : revalidation ISR (secondes). */
export const revalidate = 120

export default async function HomePage() {
  const locale = await getLocale()
  const cmsArticles = await getNewsArticlesPreview()

  return (
    <>
      <News cmsArticles={cmsArticles} />

      <DayVerse locale={locale} />

      <AbderrahmaneMesliYoutube locale={locale} />

      <DonateAlIhsane />

      <AssociationIntro />

      <History />
    </>
  )
}
