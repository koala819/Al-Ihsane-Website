'use client'

import { Heart } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HeadingBlock } from '@/components/molecules/HeadingBlock'

const VERSE_AR = 'وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ'
const VERSE_FR = '\u00ab\u00a0Et tout ce que vous d\u00e9pensez (pour Allah), Il vous le remplacera. C\u2019est Lui le Meilleur des donateurs.\u00a0\u00bb'
const VERSE_REF_FR = 'Sourate Saba\u2019 (34:39)'
const VERSE_REF_AR = 'سورة سبأ (34:39)'

export const DonateAlIhsane = () => {
  const t = useTranslations('donate')
  const tNav = useTranslations('nav')
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <section className="bg-mosque-gold-light/80 py-14 dark:bg-mosque-gold-light/40">
      <div className="mx-auto max-w-7xl px-4">
        <HeadingBlock title={t('subtitle')} isRtl={isAr} />

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-12">
            {/* Colonne gauche — texte d’appel */}
            <div
              className={cn(
                'flex flex-col',
                'text-center',
                isAr ? 'md:items-end md:text-right' : 'md:items-start md:text-left',
              )}
            >
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                {t('intro')}
              </p>
            </div>

            {/* Colonne droite — verset */}
            <div
              className={cn(
                'flex flex-col border-t border-mosque-gold/25 pt-8 md:border-t-0 md:pt-0',
                'text-center',
                isAr ? 'md:items-end md:text-right' : 'md:items-start md:text-left',
              )}
            >
              <p
                className="font-arabic text-xl leading-loose text-mosque-green sm:text-2xl"
                dir="rtl"
                lang="ar"
              >
                {VERSE_AR}
              </p>
              {!isAr && (
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70 italic">
                  {VERSE_FR}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                — {isAr ? VERSE_REF_AR : VERSE_REF_FR}
              </p>
            </div>
          </div>

          <div className="flex justify-center border-t border-mosque-gold/25 pt-10 dark:border-mosque-gold/20">
            <Button
              asChild
              size="lg"
              className="bg-mosque-gold text-white shadow-md transition-colors hover:bg-mosque-gold-hover"
            >
              <Link href="/don">
                <Heart className="me-2 h-5 w-5" />
                {tNav('donate')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
