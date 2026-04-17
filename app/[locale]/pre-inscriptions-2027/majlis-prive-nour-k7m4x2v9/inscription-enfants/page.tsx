import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: 'Inscription des enfants',
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function InscriptionEnfantsPage({ params }: PageProps) {
  const { locale } = await params
  const hub = `/${locale}/pre-inscriptions-2027/majlis-prive-nour-k7m4x2v9`

  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-mosque-muted/40 to-background px-4 py-10 sm:py-14">
      <article className="mx-auto w-full max-w-lg rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <Button variant="ghost" size="sm" className="-ml-2 mb-4 gap-1.5 text-muted-foreground" asChild>
          <Link href={hub}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour au choix
          </Link>
        </Button>
        <h1 className="text-xl font-semibold text-mosque-green sm:text-2xl">
          Inscription des enfants
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Cette page accueillera le formulaire ou le lien vers l’inscription des enfants. Vous
          pouvez la remplacer par votre flux (Typeform, Google Forms, page dédiée, etc.).
        </p>
      </article>
    </div>
  )
}
