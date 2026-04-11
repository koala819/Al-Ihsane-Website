import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-display text-3xl font-normal text-mosque-green md:text-4xl">
          Protection des données personnelles
        </h1>
        <Separator className="mx-auto mt-4 max-w-16 bg-mosque-green/30" />
      </header>

      <div className="space-y-6">
        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">Notre engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Al Ihsane est soucieux de la protection des données personnelles. Nous nous engageons
              à assurer le meilleur niveau de protection à vos données personnelles en conformité
              avec la loi applicable et le{' '}
              <Link
                href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees"
                target="_blank"
                className="text-mosque-green underline-offset-2 hover:underline"
              >
                règlement général sur la protection des données personnelles (RGPD)
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">
              Responsable du traitement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Organisation&nbsp;:</dt>
                <dd className="text-muted-foreground">
                  Centre Culturel et Cultuel de Colomiers — Mosquée Al Ihsane
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Adresse&nbsp;:</dt>
                <dd className="text-muted-foreground">
                  7 Chemin de la Plaine — 31770 Colomiers, France
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">Données collectées</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Les données collectées via le formulaire de contact (nom, adresse e-mail, message)
              sont utilisées exclusivement pour répondre à vos demandes. Elles ne sont ni
              revendues ni transmises à des tiers.
            </p>
          </CardContent>
        </Card>

        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">Vos droits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données. Pour exercer ces droits, contactez-nous via la{' '}
              <Link href="/contact" className="text-mosque-green underline-offset-2 hover:underline">
                page contact
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
