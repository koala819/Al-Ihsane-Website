'use client'

import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('home')

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-mosque-green to-mosque-green/80 py-16 text-white md:py-24"
    >
      {/* Motif géométrique islamique en filigrane */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        {/* Logo dans un encadré blanc — fond blanc du JPG se fond naturellement */}
        <div className="mb-5 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/al-ihsane-light.jpg"
            alt="Al'ihsane School"
            className="max-h-28 w-auto max-w-[200px] rounded-2xl object-contain shadow-lg"
          />
        </div>

        <h1 className="font-display text-4xl font-normal text-white drop-shadow md:text-6xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          {t('subtitle')}
        </p>
      </div>
    </section>
  )
}
