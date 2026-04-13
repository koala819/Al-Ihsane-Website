import { getLocale } from 'next-intl/server'

import { DonateCta } from '@/components/sections/DonateCta'
import { HadithDuJour } from '@/components/sections/HadithDuJour'
import { History } from '@/components/sections/History'
import { News } from '@/components/sections/News'
import { VersetDuJour } from '@/components/sections/VersetDuJour'
import { getNewsArticles } from '@/lib/sanity/queries'

/** Actualités Sanity : revalidation ISR (secondes). */
export const revalidate = 120

export default async function Page() {
  const locale = await getLocale()
  const cmsArticles = await getNewsArticles()

  return (
    <>
      {/* Actualités — Sanity si configuré, sinon textes dans messages/*.json */}
      <News cmsArticles={cmsArticles} />

      {/* Ancrage spirituel */}
      <VersetDuJour locale={locale} />

      {/* Soutenir la mosquée */}
      <DonateCta />

      {/* Hadith du jour */}
      <HadithDuJour locale={locale} />

      {/* Histoire */}
      <History />
    </>
  )
}
