import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MentionsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  const isAr = locale === 'ar'
  const t = await getTranslations({ locale, namespace: 'mentionsPage' })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <HeadingBlock title={t('title')} isRtl={isAr} />

      <div className="space-y-6">
        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">{t('publisher.title')}</CardTitle>
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
                <dt className="font-semibold text-foreground">{t('publisher.legalFormLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.legalFormValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.headOfficeLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.headOfficeValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.phoneLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.phoneValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.emailLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">
                  <a
                    href={`mailto:${t('publisher.emailValue')}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {t('publisher.emailValue')}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.websiteLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">
                  <a
                    href={t('publisher.websiteHref')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    {t('publisher.websiteValue')}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.publicationDirectorLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.publicationDirectorValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('publisher.activityLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('publisher.activityValue')}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">{t('hosting.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('hosting.companyLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('hosting.companyValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('hosting.legalFormLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('hosting.legalFormValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('hosting.rcsLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('hosting.rcsValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('hosting.addressLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('hosting.addressValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('hosting.phoneLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('hosting.phoneValue')}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">{t('hosting.websiteLabel')}&nbsp;:</dt>
                <dd className="text-muted-foreground">{t('hosting.websiteValue')}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">{t('cookies.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('cookies.text')}</p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">Directeur de la publication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Le directeur de la publication est le Président de l&apos;association.
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">
              Conditions générales d&apos;utilisation (CGU)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Les présentes conditions définissent les modalités d&apos;accès, de navigation et
              d&apos;utilisation du site. En accédant au site, l&apos;utilisateur reconnaît avoir lu
              et accepté sans réserve les présentes CGU.
            </p>
            <p>
              L&apos;association se réserve le droit de modifier, suspendre ou interrompre tout ou
              partie du site et de ses contenus, à tout moment et sans préavis. L&apos;utilisation du
              site est régie par le droit français.
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">Utilisation du site</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Le site est mis à disposition afin de présenter les activités et services de
              l&apos;association, et de permettre certaines démarches comme la prise de contact ou le
              soutien financier. Toute utilisation illicite, abusive ou nuisible est strictement
              interdite.
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">Propriété intellectuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              L&apos;ensemble des contenus présents sur le site (textes, visuels, logos, éléments
              graphiques, structure, code, etc.) est protégé par les lois applicables en matière
              de propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, diffusion, modification ou exploitation, totale
              ou partielle, sans autorisation écrite préalable, est interdite.
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">Responsabilité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Les informations publiées sur le site sont fournies à titre informatif. Malgré le
              soin apporté à leur mise à jour, l&apos;association ne garantit pas leur exactitude,
              exhaustivité ou actualité.
            </p>
            <p>
              L&apos;utilisateur reste responsable de l&apos;usage qu&apos;il fait des informations consultées
              et doit s&apos;assurer que son équipement est protégé contre les risques informatiques.
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">
              Protection des données personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Les données éventuellement collectées via les formulaires (nom, e-mail, message,
              téléphone) sont traitées uniquement pour répondre aux demandes et assurer les
              services proposés par l&apos;association.
            </p>
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez de droits
              d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition au
              traitement de vos données.
            </p>
            <p>
              Pour toute demande, vous pouvez écrire via la page contact ou à l&apos;adresse indiquée
              par l&apos;association.
            </p>
          </CardContent>
        </Card>

        <Card className="border-brand-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-brand-green">
              Liens hypertextes et plateformes tierces
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Le site peut contenir des liens vers des plateformes tierces (par exemple YouTube,
              Instagram, Facebook). L&apos;association ne contrôle pas leur contenu ni leurs pratiques
              de confidentialité.
            </p>
            <p>
              Toute consultation de ces services tiers se fait sous la responsabilité exclusive de
              l&apos;utilisateur, selon les conditions d&apos;utilisation propres à ces plateformes.
            </p>
            <p>
              La création d&apos;un lien vers ce site peut être soumise à autorisation préalable de
              l&apos;association.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MentionsPage