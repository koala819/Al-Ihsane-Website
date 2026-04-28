import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isAr = locale === 'ar'
  const t = await getTranslations({ locale, namespace: 'mentionsPage' })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <HeadingBlock title={t('title')} isRtl={isAr} />

      <div className="space-y-6">
        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">{t('publisher.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.siteNameLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.siteNameValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.siretLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.siretValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.publicationDirectorLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.publicationDirectorValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.activityLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.activityValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.urlLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.urlValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.locationLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.locationValue')}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">{t('hosting.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('hosting.providerLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('hosting.providerValue')}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">{t('cookies.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('cookies.text')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
