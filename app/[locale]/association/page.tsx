'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Heart, BookOpen, Handshake, Utensils, Star } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const ACTIVITIES_KEYS = ['meals', 'social', 'events'] as const

const ACTIVITY_ICONS = {
  meals: Utensils,
  social: Heart,
  events: Star,
}

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType
  title: string
  text: string
}) {
  return (
    <Card className="border-mosque-green/10 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="items-center pb-2">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-mosque-green/10">
          <Icon className="h-6 w-6 text-mosque-green" />
        </div>
        <CardTitle className="text-base text-mosque-green">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{text}</CardDescription>
      </CardContent>
    </Card>
  )
}

function ActivityCard({
  actKey,
  t,
}: {
  actKey: (typeof ACTIVITIES_KEYS)[number]
  t: ReturnType<typeof useTranslations<'association.activities'>>
}) {
  const Icon = ACTIVITY_ICONS[actKey]

  return (
    <Card className="overflow-hidden border-mosque-green/10 shadow-sm transition-shadow hover:shadow-md">
      <div className="h-1 bg-gradient-to-r from-mosque-green to-mosque-green/40" />
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mosque-green/10">
            <Icon className="h-5 w-5 text-mosque-green" />
          </div>
          <div className="min-w-0">
            <Badge
              variant="secondary"
              className="mb-1 bg-mosque-green/10 text-mosque-green"
            >
              {t(`${actKey}.tag`)}
            </Badge>
            <CardTitle className="text-base">{t(`${actKey}.title`)}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-semibold text-mosque-green">{t(`${actKey}.subtitle`)}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{t(`${actKey}.p1`)}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{t(`${actKey}.p2`)}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{t(`${actKey}.p3`)}</p>
      </CardContent>
    </Card>
  )
}

export default function AssociationPage() {
  const t = useTranslations('association')
  const tActivities = useTranslations('association.activities')
  const locale = useLocale()
  const isAr = locale === 'ar'

  void isAr

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mosque-green to-mosque-green/80 py-16 text-white md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/al-ihsane-light.jpg"
              alt="Al'ihsane School"
              className="max-h-28 w-auto max-w-[200px] rounded-2xl object-contain shadow-lg"
            />
          </div>
          <h1 className="mb-3 text-3xl font-bold md:text-5xl">{t('hero.title')}</h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {t('hero.text')}
          </p>
          <Separator className="mx-auto mt-8 max-w-24 bg-white/20" />
        </div>
      </section>

      {/* À propos / Notre Mission */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="mb-8 text-center">
          <h2 className="mb-1 text-2xl font-bold text-mosque-green md:text-3xl">
            {t('about.title')}
          </h2>
          <Separator className="mx-auto mt-3 max-w-16 bg-mosque-green/30" />
        </div>

        <Card className="mb-8 border-mosque-green/10 bg-mosque-green-light shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-mosque-green">{t('about.mission')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="leading-relaxed text-foreground">{t('about.p1')}</p>
            <p className="leading-relaxed text-muted-foreground">{t('about.p2')}</p>
          </CardContent>
        </Card>

        {/* 3 valeurs */}
        <div className="grid gap-4 sm:grid-cols-3">
          <ValueCard
            icon={Heart}
            title={t('about.value1Title')}
            text={t('about.value1Text')}
          />
          <ValueCard
            icon={BookOpen}
            title={t('about.value2Title')}
            text={t('about.value2Text')}
          />
          <ValueCard
            icon={Handshake}
            title={t('about.value3Title')}
            text={t('about.value3Text')}
          />
        </div>
      </section>

      {/* Nos Activités */}
      <section className="bg-mosque-muted/40 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-1 text-2xl font-bold text-mosque-green md:text-3xl">
              {tActivities('title')}
            </h2>
            <Separator className="mx-auto mt-3 max-w-16 bg-mosque-green/30" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ACTIVITIES_KEYS.map((key) => (
              <ActivityCard key={key} actKey={key} t={tActivities} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
