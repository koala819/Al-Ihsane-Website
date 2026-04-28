import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

import { getSanityClient } from './client'

export function urlForImage(source: SanityImageSource) {
  const client = getSanityClient()
  if (!client) return null
  return createImageUrlBuilder(client).image(source)
}
