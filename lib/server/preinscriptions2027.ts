const textEncoder = new TextEncoder()

export const PREINSCRIPTIONS_2027_SCOPE = 'preinscriptions-2027'
export const PREINSCRIPTIONS_2027_COOKIE = 'alihsane_preinscriptions_2027'
export const PREINSCRIPTIONS_2027_MAX_AGE_SECONDS = 60 * 60 * 24 * 7
export const PREINSCRIPTIONS_2027_ACCESS_PATH = '/pre-inscriptions-2027/acces'
export const PREINSCRIPTIONS_2027_PROTECTED_PATH =
  '/pre-inscriptions-2027/majlis-prive-nour-k7m4x2v9'

type SessionPayload = {
  exp: number
  scope: string
}

function toBase64Url(value: string): string {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(value: string): string {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  return atob(padded)
}

function bytesToString(bytes: Uint8Array): string {
  return String.fromCharCode(...bytes)
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(value))
  return toBase64Url(bytesToString(new Uint8Array(signature)))
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false

  let mismatch = 0
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return mismatch === 0
}

export function getPreinscriptionsAccessPath(locale: string): string {
  return `/${locale}${PREINSCRIPTIONS_2027_ACCESS_PATH}`
}

export function getPreinscriptionsProtectedPath(locale: string): string {
  return `/${locale}${PREINSCRIPTIONS_2027_PROTECTED_PATH}`
}

export function isPreinscriptionsProtectedPath(pathname: string, locale: string): boolean {
  const protectedPath = getPreinscriptionsProtectedPath(locale)
  return pathname === protectedPath || pathname.startsWith(`${protectedPath}/`)
}

export function isPreinscriptionsAccessPath(pathname: string, locale: string): boolean {
  return pathname === getPreinscriptionsAccessPath(locale)
}

export function isAllowedLocalizedPath(pathname: string, locale: string): boolean {
  if (!pathname.startsWith(`/${locale}/`)) return false
  return (
    isPreinscriptionsAccessPath(pathname, locale) ||
    isPreinscriptionsProtectedPath(pathname, locale)
  )
}

export async function createPreinscriptionsSessionToken(secret: string): Promise<string> {
  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + PREINSCRIPTIONS_2027_MAX_AGE_SECONDS,
    scope: PREINSCRIPTIONS_2027_SCOPE,
  }

  const encodedPayload = toBase64Url(JSON.stringify(payload))
  const signature = await sign(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

export async function verifyPreinscriptionsSessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false

  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) return false

  const expectedSignature = await sign(encodedPayload, secret)
  if (!safeEqual(signature, expectedSignature)) return false

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload
    if (payload.scope !== PREINSCRIPTIONS_2027_SCOPE) return false
    return payload.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}
