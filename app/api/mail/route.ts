import { NextResponse } from 'next/server'

import { mailContact } from '@/lib/mail'
import {
  createSmtpTransport,
  getSmtpBccAddress,
  getSmtpFromAddress,
  resolveSmtpServerConfig,
} from '@/lib/server/smtp'

type ContactPayload = {
  firstName: string
  email: string
  message: string
}

function isValidEmail(value: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
}

function parsePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== 'object') return null
  const body = value as Record<string, unknown>

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!firstName || !email || !message) return null
  if (!isValidEmail(email)) return null

  return { firstName, email, message }
}

export async function POST(req: Request): Promise<Response> {
  const smtp = resolveSmtpServerConfig()
  if (!smtp.ok) {
    return NextResponse.json(
      { error: smtp.error },
      { status: 500 },
    )
  }
  const to = (process.env.SMTP_TO ?? smtp.config.user).trim()
  const from = getSmtpFromAddress(smtp.config.user)
  const bcc = getSmtpBccAddress()
  if (!to || !from) {
    return NextResponse.json({ error: 'SMTP sender/recipient not configured correctly.' }, { status: 500 })
  }

  let rawBody: unknown
  try {
    rawBody = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const payload = parsePayload(rawBody)
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid payload. Required fields: firstName, email, message.' },
      { status: 400 },
    )
  }

  try {
    const transporter = createSmtpTransport(smtp.config)

    await transporter.sendMail({
      bcc: bcc || undefined,
      from,
      html: mailContact(payload.firstName, payload.message, payload.email),
      subject: `📧 ${payload.firstName} m'a écrit`,
      text: `${payload.message}\n\nAdresse mail pour répondre: ${payload.email}`,
      to,
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Unable to send email right now.' }, { status: 502 })
  }
}
