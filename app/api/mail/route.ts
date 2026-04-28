import { NextResponse } from 'next/server'

import { mailContact } from '@/lib/mail'
import nodemailer from 'nodemailer'

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
  const mailUser = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const to = process.env.SMTP_TO ?? mailUser
  const from = process.env.SMTP_FROM ?? mailUser
  const bcc = process.env.SMTP_BCC

  const parsedPort = Number.parseInt(port ?? '', 10)
  if (!mailUser || !pass || !host || !Number.isInteger(parsedPort) || !from || !to) {
    return NextResponse.json(
      { error: 'Mail server is not configured correctly.' },
      { status: 500 },
    )
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
    const transporter = nodemailer.createTransport({
      auth: {
        pass,
        user: mailUser,
      },
      host,
      port: parsedPort,
      secure: parsedPort === 465,
    })

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
