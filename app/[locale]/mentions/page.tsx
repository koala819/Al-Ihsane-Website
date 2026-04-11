import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-display text-3xl font-normal text-mosque-green md:text-4xl">
          Mentions légales
        </h1>
        <Separator className="mx-auto mt-4 max-w-16 bg-mosque-green/30" />
      </header>

      <div className="space-y-6">
        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">Éditeur du site</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Nom du site&nbsp;:</dt>
                <dd className="text-muted-foreground">Al Ihsane</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Numéro de Siret&nbsp;:</dt>
                <dd className="text-muted-foreground">xxxxxxxxxx</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Directeur de la publication&nbsp;:</dt>
                <dd className="text-muted-foreground">Al Ihsane</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Activité&nbsp;:</dt>
                <dd className="text-muted-foreground">
                  Association culturelle et cultuelle — Mosquée de Colomiers
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">URL&nbsp;:</dt>
                <dd className="text-muted-foreground">www.al-ihsane.com</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Localisation&nbsp;:</dt>
                <dd className="text-muted-foreground">
                  7 Chemin de la Plaine — 31770 Colomiers, France
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">Hébergement</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-semibold text-foreground">Hébergeur&nbsp;:</dt>
                <dd className="text-muted-foreground">Vercel Inc.</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-mosque-green/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-mosque-green">Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ce site peut utiliser des cookies à des fins de mesure d&apos;audience (Google Analytics).
              Aucune donnée personnelle n&apos;est collectée à votre insu.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
