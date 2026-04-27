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


interface HadeethListItem {
  id: string
  title: string
}

export interface HadeethListResponse {
  data: HadeethListItem[]
  meta: {
    current_page: string
    last_page: number
    total_items: number
    per_page: string
  }
}

export interface HadeethOne {
  id: string
  title: string
  hadeeth: string
  hadeeth_ar: string
  attribution: string
  grade: string
}


  export type NewsProps = {
    cmsArticles?: SanityNewsArticle[]
    /** Accueil : aperçu + bouton ; page dédiée : liste complète et titre adapté. */
    variant?: 'home' | 'full'
  }
