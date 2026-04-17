import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
    <div className="min-h-[70vh] bg-gradient-to-b from-mosque-muted/40 to-background px-4 py-8 sm:py-12">
      <article className="mx-auto w-full max-w-xl rounded-2xl border border-border/80 bg-card/95 p-5 shadow-sm backdrop-blur-sm sm:p-8 md:p-10">
        <Button variant="ghost" size="sm" className="-ml-2 mb-2 gap-1.5 text-muted-foreground" asChild>
          <Link href={hub}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour au choix
          </Link>
        </Button>

        <header className="mb-8 border-b border-border/60 pb-6">
          <h1 className="font-display text-2xl text-mosque-green sm:text-3xl">
            Questionnaire enseignants
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Préférences pour l’année prochaine : niveau, créneaux et coordonnées. Le formulaire est
            traité par l’équipe de la mosquée uniquement.
          </p>
        </header>

        <QuestionnaireProfesseursForm />
      </article>
    </div>
  )
}
