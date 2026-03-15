'use client'

import { useTranslations } from 'next-intl'
import { Heart, Building2, Mail, FileText } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function DonPage() {
  const t = useTranslations('donate')
  const tNav = useTranslations('nav')

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

        {/* Bouton CTA principal */}
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-amber-400 active:bg-amber-600"
          >
            <Heart className="h-5 w-5" />
            {tNav('donate')}
          </Link>
        </div>
      </header>

      {/* Hadith */}
      <blockquote className="mb-12 rounded-xl border-l-4 border-mosque-green bg-mosque-green-light px-6 py-5">
        <p className="font-arabic text-xl leading-relaxed text-mosque-green" dir="rtl">
          {t('hadith')}
        </p>
        <footer className="mt-2 text-sm text-muted-foreground">{t('hadithRef')}</footer>
      </blockquote>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Virement bancaire */}
        <div className="rounded-xl border border-mosque-green/20 bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mosque-green/10">
              <Building2 className="h-5 w-5 text-mosque-green" />
            </div>
            <h2 className="text-lg font-semibold text-mosque-green">
              {t('virementTitle')}
            </h2>
          </div>
          <p className="mb-3 text-sm text-muted-foreground">{t('virementIntro')}</p>
          <dl className="space-y-1 text-sm">
            <div>
              <dt className="font-medium text-foreground">{t('virementName')}</dt>
            </div>
            <div>
              <dd className="text-muted-foreground">{t('virementBank')}</dd>
            </div>
          </dl>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-mosque-green px-4 py-2 text-sm font-semibold text-mosque-green transition-colors hover:bg-mosque-green hover:text-white"
          >
            <Mail className="h-4 w-4" />
            {t('virementContact')}
          </Link>
        </div>

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
