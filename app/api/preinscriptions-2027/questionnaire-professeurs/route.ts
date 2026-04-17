import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

import {
  PREINSCRIPTIONS_2027_COOKIE,
  verifyPreinscriptionsSessionToken,
} from '@/lib/server/preinscriptions2027'

const RECIPIENT_DEFAULT = 'x.genolhac@gmail.com'

type Body = {
  firstName?: string
  lastName?: string
  levelPreference?: 'specific' | 'indifferent'
  levelDetail?: string
  wantsAllFourSlots?: boolean
  slotSaturdayMorning?: boolean
  slotSaturdayAfternoon?: boolean
  slotSundayMorning?: boolean
  slotSundayAfternoon?: boolean
  email?: string
  phone?: string
  remarks?: string
  /** honeypot */
  company?: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function normalizePhone(raw: string): string {
  let p = raw.replace(/\s/g, '')
  if (p.startsWith('0033')) p = `+33${p.slice(4)}`
  return p
}

function isValidFrenchMobile(p: string): boolean {
  const s = normalizePhone(p)
  return /^0[1-9]\d{8}$/.test(s) || /^\+33[1-9]\d{8}$/.test(s)
}

function validate(body: Body): string | null {
  const firstName = String(body.firstName ?? '').trim()
  const lastName = String(body.lastName ?? '').trim()
  if (!firstName || !lastName) return 'Nom et prénom sont obligatoires.'

  if (body.levelPreference !== 'specific' && body.levelPreference !== 'indifferent') {
    return 'Indiquez votre préférence de niveau.'
  }
  if (body.levelPreference === 'specific' && !String(body.levelDetail ?? '').trim()) {
    return 'Précisez le niveau souhaité.'
  }

  const allFour = Boolean(body.wantsAllFourSlots)
  const anySlot =
    allFour ||
    Boolean(body.slotSaturdayMorning) ||
    Boolean(body.slotSaturdayAfternoon) ||
    Boolean(body.slotSundayMorning) ||
    Boolean(body.slotSundayAfternoon)
  if (!anySlot) return 'Sélectionnez au moins un créneau (ou les quatre).'

  const email = String(body.email ?? '').trim()
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return 'Adresse e-mail invalide.'
  }

  if (!isValidFrenchMobile(String(body.phone ?? ''))) {
    return 'Numéro de mobile invalide (format français attendu).'
  }

  const remarks = String(body.remarks ?? '')
  if (remarks.length > 4000) return 'Le champ remarques est trop long.'

  return null
}

function buildSlotsText(body: Body): string {
  if (body.wantsAllFourSlots) {
    return 'Les quatre créneaux (samedi matin et après-midi, dimanche matin et après-midi).'
  }
  const parts: string[] = []
  if (body.slotSaturdayMorning) parts.push('Samedi matin')
  if (body.slotSaturdayAfternoon) parts.push('Samedi après-midi')
  if (body.slotSundayMorning) parts.push('Dimanche matin')
  if (body.slotSundayAfternoon) parts.push('Dimanche après-midi')
  return parts.join(', ')
}

export async function POST(request: Request): Promise<Response> {
  const sessionSecret = process.env.PRIVATE_SESSION_SECRET
  if (!sessionSecret) {
    return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(PREINSCRIPTIONS_2027_COOKIE)?.value
  const hasSession = await verifyPreinscriptionsSessionToken(token, sessionSecret)
  if (!hasSession) {
    return NextResponse.json({ error: 'Session expirée ou non autorisée.' }, { status: 401 })
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  if (body.company && String(body.company).trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const err = validate(body)
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }

  const mailUser = process.env.MAIL_USER
  const mailPass = process.env.MAIL_PWD
  const mailHost = process.env.MAIL_HOST
  const mailPort = process.env.MAIL_PORT
  if (!mailUser || !mailPass || !mailHost || !mailPort) {
    return NextResponse.json({ error: 'Envoi d’e-mails non configuré sur le serveur.' }, { status: 500 })
  }

  const to = (process.env.TEACHER_QUESTIONNAIRE_TO ?? RECIPIENT_DEFAULT).trim() || RECIPIENT_DEFAULT
  const firstName = String(body.firstName).trim()
  const lastName = String(body.lastName).trim()
  const levelLine =
    body.levelPreference === 'indifferent'
      ? 'Indifférent / pas de préférence de niveau'
      : `Niveau particulier : ${String(body.levelDetail).trim()}`
  const slotsText = buildSlotsText(body)
  const email = String(body.email).trim()
  const phone = normalizePhone(String(body.phone).trim())
  const remarks = String(body.remarks ?? '').trim()

  const textLines = [
    'Questionnaire enseignants — préférences 2027',
    '',
    `Nom : ${lastName}`,
    `Prénom : ${firstName}`,
    '',
    `Niveau : ${levelLine}`,
    '',
    `Créneaux souhaités : ${slotsText}`,
    '',
    `E-mail : ${email}`,
    `Téléphone : ${phone}`,
    '',
    remarks ? `Remarques / précisions :\n${remarks}` : 'Remarques : (aucune)',
  ]

  const html = `
  <h1 style="font-family:sans-serif;font-size:18px;">Questionnaire enseignants</h1>
  <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
    <tr><td style="padding:6px 12px 6px 0;font-weight:600;">Nom</td><td>${escapeHtml(lastName)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:600;">Prénom</td><td>${escapeHtml(firstName)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;">Niveau</td><td>${escapeHtml(levelLine)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;">Créneaux</td><td>${escapeHtml(slotsText)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:600;">E-mail</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:600;">Téléphone</td><td>${escapeHtml(phone)}</td></tr>
  </table>
  ${
    remarks
      ? `<p style="font-family:sans-serif;font-size:14px;margin-top:16px;"><strong>Remarques</strong><br/>${escapeHtml(remarks).replace(/\n/g, '<br/>')}</p>`
      : ''
  }
  `

  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: parseInt(mailPort, 10),
    secure: true,
    auth: { user: mailUser, pass: mailPass },
    tls: { rejectUnauthorized: false },
  })

  try {
    await transporter.sendMail({
      from: mailUser,
      to,
      replyTo: email,
      subject: `[Questionnaire profs] ${lastName} ${firstName}`,
      text: textLines.join('\n'),
      html,
    })
  } catch (e) {
    console.error('[questionnaire-professeurs]', e)
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez plus tard." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
