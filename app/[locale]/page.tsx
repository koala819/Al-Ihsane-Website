import { getLocale } from 'next-intl/server'

import { DonateCta } from '@/components/sections/DonateCta'
import { HadithDuJour } from '@/components/sections/HadithDuJour'
import { History } from '@/components/sections/History'
import { News } from '@/components/sections/News'
import { VersetDuJour } from '@/components/sections/VersetDuJour'

export default async function Page() {
  const locale = await getLocale()

  return (
    <>
      {/* Actualités — premier contact avec la vie de la mosquée */}
      <News />

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
