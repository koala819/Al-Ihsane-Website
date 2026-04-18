/**
 * Fiche Google Maps officielle (Mosquée de Colomiers / مسجد الإحسان).
 * @see https://maps.app.goo.gl/62LRoYR1Tfbu2Wib8
 */
export const CONTACT_GOOGLE_MAPS_LISTING_URL =
  'https://maps.app.goo.gl/62LRoYR1Tfbu2Wib8' as const

/**
 * Centre carte = coordonnées de la fiche Google (même point que le lien court ci-dessus).
 * Pas l’approximation OSM : alignement iframe / bouton / lieu référencé chez Google.
 */
export const COL_MAP_CENTER = '43.5956351,1.2984057' as const
export const COL_MAP_ZOOM = '17' as const

/**
 * URL d’iframe :
 * - Si `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY` est défini : **Maps Embed API, mode `view`**
 *   → carte centrée sur la fiche, sans marqueur imposé par le mode lieu (moins d’UI parasite).
 * - Sinon : iframe « classique » centrée sur les mêmes coordonnées.
 *
 * @see https://developers.google.com/maps/documentation/embed/embedding-map#view_mode
 */
export function getContactMapEmbedSrc(): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim()
  if (key) {
    const params = new URLSearchParams({
      key,
      center: COL_MAP_CENTER,
      zoom: COL_MAP_ZOOM,
      maptype: 'roadmap',
    })
    return `https://www.google.com/maps/embed/v1/view?${params.toString()}`
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(COL_MAP_CENTER)}&z=${COL_MAP_ZOOM}&output=embed`
}
