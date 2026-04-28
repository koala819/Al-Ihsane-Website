import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { Link as I18nLink } from '@/i18n/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const ProtectionPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  const isAr = locale === 'ar'
  const t = await getTranslations({ locale, namespace: 'protectionPage' })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <HeadingBlock title={t('title')} isRtl={isAr} />

      <div className="space-y-6">
        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">{t('commitment.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('commitment.textBefore')}{' '}
              <Link
                href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green underline-offset-2 hover:underline"
              >
                {t('commitment.rgpdLinkLabel')}
              </Link>
              {t('commitment.textAfter')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">{t('controller.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('controller.organizationLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('controller.organizationValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('controller.addressLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('controller.addressValue')}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">{t('collectedData.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('collectedData.text')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">{t('rights.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('rights.textBefore')}{' '}
              <I18nLink href="/contact" className="text-brand-green underline-offset-2 hover:underline">
                {t('rights.contactLinkLabel')}
              </I18nLink>
              {t('rights.textAfter')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProtectionPage