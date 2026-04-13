'use client'

import { Heart, ExternalLink } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const HELLOASSO_URL = 'https://www.helloasso.com'

// Sourate Saba' (34:39) — utilisé aussi par la Mosquée du Mirail
const VERSE_AR = 'وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ'
const VERSE_FR = '\u00ab\u00a0Et tout ce que vous d\u00e9pensez (pour Allah), Il vous le remplacera. C\u2019est Lui le Meilleur des donateurs.\u00a0\u00bb'
const VERSE_REF_FR = 'Sourate Saba\u2019 (34:39)'
const VERSE_REF_AR = 'سورة سبأ (34:39)'

export function DonateCta() {
  const t = useTranslations('donate')
  const tNav = useTranslations('nav')
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <section className="bg-mosque-gold-light/80 py-14 dark:bg-mosque-gold-light/40">
      <div className="mx-auto max-w-2xl px-4 text-center">
        {/* Verset */}
        <p
          className="font-arabic text-xl leading-loose text-mosque-green sm:text-2xl"
          dir="rtl"
          lang="ar"
        >
          {VERSE_AR}
        </p>
        {!isAr && (
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/70 italic">
            {VERSE_FR}
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          — {isAr ? VERSE_REF_AR : VERSE_REF_FR}
        </p>

        <Separator className="mx-auto my-8 max-w-20 bg-mosque-gold/25 dark:bg-mosque-gold/20" />

        {/* Titre */}
        <h2 className="mb-2 text-2xl font-bold text-mosque-green md:text-3xl">
          {t('subtitle')}
        </h2>
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-mosque-gold/35" />
        <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {t('intro')}
        </p>

        {/* Boutons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-mosque-gold text-white shadow-md transition-colors hover:bg-mosque-gold-hover"
          >
            <a href={HELLOASSO_URL} target="_blank" rel="noopener noreferrer">
              <Heart className="mr-2 h-5 w-5" />
              {tNav('donate')}
              <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-mosque-green/30 text-mosque-green hover:bg-mosque-green hover:text-white">
            <Link href="/don">En savoir plus</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
