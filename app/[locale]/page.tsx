import { getLocale } from 'next-intl/server'

import { AssociationIntro } from '@/components/sections/AssociationIntro'
import { DonateCta } from '@/components/sections/DonateCta'
import { HadithDuJour } from '@/components/sections/HadithDuJour'
import { History } from '@/components/sections/History'
import { News } from '@/components/sections/News'
import { VersetDuJour } from '@/components/sections/VersetDuJour'
import { YoutubeLatest } from '@/components/sections/YoutubeLatest'
import { getNewsArticlesPreview } from '@/lib/sanity/queries'

/** Actualités Sanity : revalidation ISR (secondes). */
export const revalidate = 120

export default async function Page() {
  const locale = await getLocale()
  const cmsArticles = await getNewsArticlesPreview()

  return (
    <>
      {/* Actus */}
      <News cmsArticles={cmsArticles} />

      <VersetDuJour locale={locale} />

      <YoutubeLatest locale={locale} />

      {/* Soutenir la mosquée */}
      <DonateCta />

      <HadithDuJour locale={locale} />

      <AssociationIntro />

      <History />
    </>
  )
}
