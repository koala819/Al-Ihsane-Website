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

const newsListQuery = groq`
  *[_type == "newsArticle" && defined(publishedAt)] | order(publishedAt desc) [0...20] {
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
  }
`

export async function getNewsArticles(): Promise<SanityNewsArticle[]> {
  if (!getSanityConfigured()) return []
  const client = getSanityClient()
  if (!client) return []

  try {
    const rows = await client.fetch<SanityNewsArticle[]>(newsListQuery)
    return rows ?? []
  } catch (e) {
    console.error('[sanity] getNewsArticles', e)
    return []
  }
}
