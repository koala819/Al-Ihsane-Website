import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
}

export default function Preinscriptions2027PrivatePage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Pre-inscriptions 2027</h1>
      <p className="mt-3 text-muted-foreground">
        Espace prive valide par mot de passe.
      </p>

      <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-sm leading-relaxed">
          Tu peux remplacer ce contenu par ton formulaire, tes details pratiques, et tes
          instructions internes pour les pre-inscriptions.
        </p>
      </div>
    </section>
  )
}
