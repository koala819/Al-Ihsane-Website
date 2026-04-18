import { groq } from 'next-sanity'

import type { PortableTextBlock } from '@portabletext/types'

import { getSanityClient, getSanityConfigured } from './client'

export type SanityNewsArticle = {
  _id: string
  publishedAt: string
  dateLabel?: string | null
  tagFr?: string | null
  tagAr?: string | null
  titleFr: string
  titleAr: string
  excerptFr?: string | null
  excerptAr?: string | null
  bodyFr?: PortableTextBlock[] | null
  bodyAr?: PortableTextBlock[] | null
  mainImage?: {
    asset?: { _ref: string; _type?: string }
    alt?: string | null
    hotspot?: { x: number; y: number; height: number; width: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  } | null
}

const newsArticleProjection = groq`{
    _id,
    publishedAt,
    dateLabel,
    tagFr,
    tagAr,
    titleFr,
    titleAr,
    excerptFr,
    excerptAr,
    bodyFr,
    bodyAr,
    mainImage
  }`

/** Aperçu accueil : 4 dernières actualités. */
const newsListQueryPreview = groq`
  *[_type == "newsArticle" && defined(publishedAt)] | order(publishedAt desc) [0...4] ${newsArticleProjection}
`

/** Page liste : jusqu’à 100 entrées (ajuster si besoin). */
const newsListQueryFull = groq`
  *[_type == "newsArticle" && defined(publishedAt)] | order(publishedAt desc) [0...100] ${newsArticleProjection}
`

export async function getNewsArticlesPreview(): Promise<SanityNewsArticle[]> {
  if (!getSanityConfigured()) return []
  const client = getSanityClient()
  if (!client) return []

  try {
    const rows = await client.fetch<SanityNewsArticle[]>(newsListQueryPreview)
    return rows ?? []
  } catch (e) {
    console.error('[sanity] getNewsArticlesPreview', e)
    return []
  }
}

export async function getNewsArticlesFull(): Promise<SanityNewsArticle[]> {
  if (!getSanityConfigured()) return []
  const client = getSanityClient()
  if (!client) return []

  try {
    const rows = await client.fetch<SanityNewsArticle[]>(newsListQueryFull)
    return rows ?? []
  } catch (e) {
    console.error('[sanity] getNewsArticlesFull', e)
    return []
  }
}
