import { About } from '@/components/sections/About'
import { Hero } from '@/components/sections/Hero'
import { History } from '@/components/sections/History'
import { News } from '@/components/sections/News'
import { PrayerTimes } from '@/components/sections/PrayerTimes'
import { getLocale } from 'next-intl/server'

export default async function Page() {
  const locale = await getLocale()

  return (
    <>
      <PrayerTimes locale={locale} />
      <Hero />
      <About />
      <History />
      <News />
    </>
  )
}
