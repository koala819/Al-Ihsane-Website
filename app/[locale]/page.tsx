'use client'

import { About } from '@/components/sections/About'
import { Hero } from '@/components/sections/Hero'
import { History } from '@/components/sections/History'
import { News } from '@/components/sections/News'

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <History />
      <News />
    </>
  )
}
