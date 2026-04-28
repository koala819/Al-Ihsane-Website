'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Heart, FileText, ExternalLink } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const HELLOASSO_URL = 'https://www.helloasso.com'

export const DonPage = () => {
  const t = useTranslations('donate')
  const tNav = useTranslations('nav')
  const isAr = useLocale() === 'ar'

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      {/* Hero CTA */}
      <header className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold-light dark:bg-brand-gold-light">
            <Heart className="h-8 w-8 text-brand-gold" />
          </div>
        </div>
        <h1 className="font-display text-4xl font-normal text-brand-green md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-lg font-semibold text-brand-green/80">
          {t('subtitle')}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t('intro')}</p>

        <div className="mt-8">
          <Button
            asChild
            size="lg"
            className="bg-brand-gold text-white shadow-lg transition-colors hover:bg-brand-gold-hover active:opacity-90"
          >
            <a href={HELLOASSO_URL} target="_blank" rel="noopener noreferrer">
              <Heart className="mr-2 h-5 w-5" />
              {tNav('donate')}
              <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
            </a>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">{t('helloassoNote')}</p>
        </div>
      </header>

      {/* Hadith */}
      <Card className="mb-10 border-brand-green/20 bg-brand-green-light shadow-none">
        <CardContent className="py-5">
          {isAr ? (
            <p className="font-arabic text-xl leading-relaxed text-brand-green" dir="rtl">
              {t('hadith')}
            </p>
          ) : (
            <p className="text-lg leading-relaxed text-brand-green">{t('hadith')}</p>
          )}
          <footer className="mt-2 text-sm text-muted-foreground">{t('hadithRef')}</footer>
        </CardContent>
      </Card>

      <Separator className="mb-8 bg-brand-green/10" />

      {/* Chèque */}
      <Card className="mb-6 border-brand-green/15 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/10">
              <FileText className="h-5 w-5 text-brand-green" />
            </div>
            <CardTitle className="text-lg text-brand-green">{t('chequeTitle')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{t('chequeIntro')}</p>
          <address className="not-italic">
            <p className="whitespace-pre-line text-sm font-medium text-foreground">
              {t('chequeAddress')}
            </p>
          </address>
        </CardContent>
      </Card>

      {/* Déduction fiscale */}
      <Card className="border-brand-gold/25 bg-brand-gold-light/90 shadow-none dark:border-brand-gold/20 dark:bg-brand-gold-light/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-brand-gold">
            {t('taxTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/90 dark:text-foreground/85">{t('taxText')}</p>
        </CardContent>
      </Card>
    </section>
  )
}

export default DonPage