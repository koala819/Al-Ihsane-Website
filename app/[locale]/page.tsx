import { getLocale } from 'next-intl/server'
import { AssociationIntro } from '@/components/organisms/AssociationIntro'
import { DonateAlIhsane } from '@/components/organisms/DonateAlIhsane'
import { HadithDuJour } from '@/components/organisms/HadithDuJour'
import { History } from '@/components/organisms/History'
import { NewsSection } from '@/components/organisms/News'
import { VersetDuJour } from '@/components/organisms/VersetDuJour'
import { AbderrahmaneMesliYoutube } from '@/components/organisms/AbderrahmaneMesliYoutube'
import { getNewsArticlesPreview } from '@/lib/sanity/queries'

/** Actualités Sanity : revalidation ISR (secondes). */
export const revalidate = 120

export default async function HomePage() {
  const locale = await getLocale()
  const cmsArticles = await getNewsArticlesPreview()

  return (
    <>
      <NewsSection cmsArticles={cmsArticles} />

      <VersetDuJour locale={locale} />

      <AbderrahmaneMesliYoutube locale={locale} />

      <DonateAlIhsane />

      <HadithDuJour locale={locale} />

      <AssociationIntro />

      <History />
    </>
  )
}
