'use client'

import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('home')

  return (
    <section
      id="home"
      className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-b from-white to-mosque-green-light"
    >
      <div className="relative rounded-xl border-2 border-mosque-green bg-white/75 px-8 py-8 text-center">
        <div className="mb-2 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Al Ihsane"
            className="max-h-20 w-auto max-w-[160px] rounded-lg bg-white object-contain p-1.5"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
        <h1 className="font-display text-4xl font-normal text-mosque-green md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-1 text-[#002902]">{t('subtitle')}</p>
      </div>
    </section>
  )
}
