import nodemailer from 'nodemailer'

export type SmtpServerConfig = {
  host: string
  pass: string
  port: number
  secure: boolean
  user: string
}

function readEnv(name: string): string {
  return String(process.env[name] ?? '').trim()
}

export function resolveSmtpServerConfig():
  | { config: SmtpServerConfig; ok: true }
  | { error: string; ok: false } {
  const host = readEnv('SMTP_HOST')
  const user = readEnv('SMTP_USER')
  const pass = readEnv('SMTP_PASSWORD')
  const portRaw = readEnv('SMTP_PORT')
  const port = Number.parseInt(portRaw, 10)

  if (!host || !user || !pass || !Number.isInteger(port)) {
    return {
      error:
        'SMTP config invalid. Required env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD.',
      ok: false,
    }
  }

  return {
    config: {
      host,
      pass,
      port,
      secure: port === 465,
      user,
    },
    ok: true,
  }
}

export function createSmtpTransport(config: SmtpServerConfig) {
  return nodemailer.createTransport({
    auth: {
      pass: config.pass,
      user: config.user,
    },
    host: config.host,
    port: config.port,
    secure: config.secure,
  })
}

export function getSmtpFromAddress(defaultFrom: string): string {
  return readEnv('SMTP_FROM') || defaultFrom
}

export function getSmtpBccAddress(): string {
  return readEnv('SMTP_BCC')
}
