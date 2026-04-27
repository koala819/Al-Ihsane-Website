import type { SanityNewsArticle } from '@/lib/sanity/queries'

interface AlquranAyah {
    number: number
    text: string
    numberInSurah: number
    surah: {
      number: number
      name: string
      englishName: string
      englishNameTranslation: string
    }
  }

export interface AlquranResponse {
    code: number
    data: [AlquranAyah, AlquranAyah] // [arabic, french]
  }


export type BreadcrumbEntry = {
    label: string
    href?: string
  }

  export type NewsProps = {
    cmsArticles?: SanityNewsArticle[]
    /** Accueil : aperçu + bouton ; page dédiée : liste complète et titre adapté. */
    variant?: 'home' | 'full'
  }