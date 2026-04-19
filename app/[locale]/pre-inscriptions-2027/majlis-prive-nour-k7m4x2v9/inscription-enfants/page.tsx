import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'preinscriptions2027' })
  return {
    robots: { follow: false, index: false },
    title: t('inscriptionEnfants.metaTitle'),
  }
}

export default async function InscriptionEnfantsPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'preinscriptions2027' })
  const hub = `/${locale}/pre-inscriptions-2027/majlis-prive-nour-k7m4x2v9`

  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-mosque-muted/40 to-background px-4 py-10 sm:py-14">
      <article className="mx-auto w-full max-w-lg rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <Button variant="ghost" size="sm" className="-ml-2 mb-4 gap-1.5 text-muted-foreground" asChild>
          <Link href={hub}>
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
            {t('inscriptionEnfants.back')}
          </Link>
        </Button>
        <h1 className="text-xl font-semibold text-mosque-green sm:text-2xl">
          {t('inscriptionEnfants.title')}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('inscriptionEnfants.intro')}</p>
      </article>
    </div>
  )
}
