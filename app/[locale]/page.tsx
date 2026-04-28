import { getLocale } from 'next-intl/server'
import { Association } from '@/components/organisms/Association'
import { DonateAlIhsane } from '@/components/organisms/DonateAlIhsane'
import { History } from '@/components/organisms/History'
import { News } from '@/components/organisms/News'
import { DayVerse } from '@/components/organisms/DayVerse'
import { AbderrahmaneMesliYoutube } from '@/components/organisms/AbderrahmaneMesliYoutube'
import { getNewsArticlesPreview } from '@/lib/sanity/queries'

/** Actualités Sanity : revalidation ISR (secondes). */
export const revalidate = 120

const HomePage = async () => {
  const locale = await getLocale()
  const cmsArticles = await getNewsArticlesPreview()

  return (
    <>
      <News cmsArticles={cmsArticles} />

      <DayVerse locale={locale} />

      <AbderrahmaneMesliYoutube locale={locale} />

      <DonateAlIhsane />

      <Association />

      <History />
    </>
  )
}

export default HomePage
