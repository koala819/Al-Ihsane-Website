'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Heart, FileText, ExternalLink } from 'lucide-react'

const HELLOASSO_URL = 'https://www.helloasso.com' // À remplacer par l'URL du compte une fois créé

export default function DonPage() {
  const t = useTranslations('donate')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      {/* Hero CTA */}
      <header className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Heart className="h-8 w-8 text-amber-500" />
          </div>
        </div>
        <h1 className="font-display text-4xl font-normal text-mosque-green md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-lg font-semibold text-mosque-green/80">
          {t('subtitle')}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {t('intro')}
        </p>

        {/* Bouton CTA HelloAsso */}
        <div className="mt-8">
          <a
            href={HELLOASSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-amber-400 active:bg-amber-600"
          >
            <Heart className="h-5 w-5" />
            {tNav('donate')}
            <ExternalLink className="h-4 w-4 opacity-70" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">{t('helloassoNote')}</p>
        </div>
      </header>

      {/* Hadith */}
      <blockquote className="mb-12 rounded-xl border-l-4 border-mosque-green bg-mosque-green-light px-6 py-5">
        {locale === 'ar' ? (
          <p className="font-arabic text-xl leading-relaxed text-mosque-green" dir="rtl">
            {t('hadith')}
          </p>
        ) : (
          <p className="text-lg leading-relaxed text-mosque-green">
            {t('hadith')}
          </p>
        )}
        <footer className="mt-2 text-sm text-muted-foreground">{t('hadithRef')}</footer>
      </blockquote>

      <div className="grid gap-6">
        {/* Chèque */}
        <div className="rounded-xl border border-mosque-green/20 bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mosque-green/10">
              <FileText className="h-5 w-5 text-mosque-green" />
            </div>
            <h2 className="text-lg font-semibold text-mosque-green">
              {t('chequeTitle')}
            </h2>
          </div>
          <p className="mb-3 text-sm text-muted-foreground">{t('chequeIntro')}</p>
          <address className="not-italic">
            <p className="whitespace-pre-line text-sm font-medium text-foreground">
              {t('chequeAddress')}
            </p>
          </address>
        </div>
      </div>

      {/* Déduction fiscale */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
        <h2 className="mb-2 font-semibold text-amber-700 dark:text-amber-400">
          {t('taxTitle')}
        </h2>
        <p className="text-sm text-amber-800 dark:text-amber-300">{t('taxText')}</p>
      </div>
    </section>
  )
}
