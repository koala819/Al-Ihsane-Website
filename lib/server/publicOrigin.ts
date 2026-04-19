/**
 * Sur Netlify, `request.url` dans un route handler peut utiliser l’hôte du déploiement
 * (ex. 69e46c…--alihsane.netlify.app) alors que l’utilisateur est sur le domaine canonique
 * (alihsane.netlify.app). Le Set-Cookie reste sur le bon host, mais `Location` pointe vers
 * l’autre → pas de cookie sur la requête suivante (cross-site).
 *
 * Priorité : en-têtes `x-forwarded-host` / `host` (ce que le navigateur a réellement utilisé).
 * Optionnel : variable `SITE_URL` (ex. https://alihsane.netlify.app) si besoin.
 */
export function getPublicOriginFromRequest(request: Request): string {
  const siteUrl = process.env.SITE_URL?.trim()
  if (siteUrl) {
    try {
      return new URL(siteUrl).origin
    } catch {
      /* ignore */
    }
  }

  const url = new URL(request.url)
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host')?.split(',')[0]?.trim() ||
    url.host
  const protoRaw =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ||
    (url.protocol === 'https:' ? 'https' : 'http')
  const proto = protoRaw.toLowerCase()
  const safeProto = proto === 'https' || proto === 'http' ? proto : 'https'
  return `${safeProto}://${host}`
}
