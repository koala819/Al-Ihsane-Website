import type { SanityNewsArticle } from '@/lib/sanity/queries'

export type BreadcrumbEntry = {
    label: string
    href?: string
  }

  export type NewsProps = {
    cmsArticles?: SanityNewsArticle[]
    /** Accueil : aperçu + bouton ; page dédiée : liste complète et titre adapté. */
    variant?: 'home' | 'full'
  }