import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { QuestionnaireProfesseursForm } from './questionnaire-professeurs-form'

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: 'Questionnaire enseignants',
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function QuestionnaireProfesseursPage({ params }: PageProps) {
  const { locale } = await params
  const hub = `/${locale}/pre-inscriptions-2027/majlis-prive-nour-k7m4x2v9`

  return (
    <div
      className={cn(
        'relative min-h-screen bg-gradient-to-b from-[hsl(265,10%,96.5%)] via-background to-background',
        'dark:from-[hsl(260,14%,10%)] dark:via-background dark:to-background',
      )}
    >
      {/* Motif pointillé discret (rappel des fonds d’onglet en navigation privée) */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.4] dark:opacity-[0.22]"
        style={{
          backgroundImage: 'radial-gradient(hsl(265, 14%, 58%) 0.45px, transparent 0.45px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden
      />

      {/* Même gabarit horizontal que les sections de l’accueil (ex. Actualités) : max-w-7xl px-4 */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-14 md:py-16">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 mb-8 gap-1.5 text-muted-foreground sm:mb-10 md:mb-12"
          asChild
        >
          <Link href={hub}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour au choix
          </Link>
        </Button>

        <article
          className={cn(
            'w-full overflow-hidden rounded-2xl border border-purple-950/[0.09] bg-card shadow-sm',
            'dark:border-purple-200/[0.08]',
          )}
        >
          <div className="flex items-start gap-2.5 border-b border-border/50 bg-muted/35 px-4 py-3 sm:px-5 sm:py-3.5 dark:bg-muted/20">
            <Shield
              className="mt-0.5 h-4 w-4 shrink-0 text-purple-900/55 dark:text-purple-300/70"
              strokeWidth={2}
              aria-hidden
            />
            <p className="text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
              Espace confidentiel : ce lien n’est pas indexé et ne doit pas être partagé publiquement.
            </p>
          </div>

          <div className="p-5 sm:p-8 md:p-10">
            <header className="mb-10 sm:mb-12 md:mb-14">
              {/* Même style de titre que « Actualité » sur l’accueil (section News) */}
              <h1 className="text-2xl font-bold text-mosque-green md:text-3xl">
                Questionnaire enseignants
              </h1>
              <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
              <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
                Indiquez d’abord vos créneaux et le niveau enseigné cette année, puis vos souhaits pour
                l’année prochaine et vos coordonnées. Le formulaire est traité par l’équipe de la
                mosquée uniquement.
              </p>
            </header>

            <QuestionnaireProfesseursForm />
          </div>
        </article>
      </div>
    </div>
  )
}
