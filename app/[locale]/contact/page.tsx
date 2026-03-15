'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { MapPin, Phone, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const MOSQUE_MAPS_URL = 'https://maps.app.goo.gl/SLbiNWG6FCxoxhDN7'
const MOSQUE_EMBED_URL =
  'https://www.google.com/maps?q=7+Chemin+de+la+Plaine+31770+Colomiers&output=embed'

export default function Page() {
  const t = useTranslations('contact')
  const [hideForm, setHideForm] = useState(false)

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("L'e-mail est obligatoire")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "L'e-mail n'est pas valide",
      ),
    first_name: yup.string().required('Veuillez saisir votre nom'),
    msg: yup.string().required('Veuillez saisir votre message'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function handleSendMail(values: {
    first_name: string
    email: string
    msg: string
  }) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: values.first_name,
        email: values.email,
        message: values.msg,
      }),
    }

    const baseUrl =
      typeof window !== 'undefined' ? window.location.origin : ''
    fetch(`${baseUrl}/api/mail`, options)
      .then((response) => {
        if (response.status === 200) {
          toast.success(t('successMessage'))
          setHideForm(true)
        } else {
          toast.error("Une erreur s'est produite")
        }
      })
      .catch(() => {
        toast.error("Une erreur s'est produite")
      })
  }

  return (
    <section className="relative flex min-h-screen flex-col text-foreground md:flex-row">
      {/* Un seul bloc : en haut sur mobile, à gauche sur desktop */}
      <div className="relative z-10 w-full shrink-0 overflow-y-auto border-b border-mosque-green/20 bg-white/95 shadow-xl dark:bg-slate-900/95 md:max-w-[420px] md:border-b-0 md:border-r">
        <div className="p-4 sm:p-6 md:p-8">
          <header className="mb-8">
            <h1 className="font-display text-3xl font-normal text-mosque-green md:text-4xl">
              {t('title')}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Mosquée Al Ihsane — Colomiers
            </p>
          </header>

          <div className="space-y-8">
            {/* Adresse + téléphone + lien carte */}
            <div>
              <h2 className="text-lg font-semibold text-mosque-green">
                {t('mapTitle')}
              </h2>
              <address className="mt-3 not-italic">
                <p className="flex items-start gap-2 text-foreground">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mosque-green" />
                  <span className="whitespace-pre-line">{t('address')}</span>
                </p>
                <p className="mt-2 flex items-center gap-2">
                  <Phone className="h-5 w-5 shrink-0 text-mosque-green" />
                  <a
                    href="tel:+33561302650"
                    className="text-mosque-green hover:underline"
                  >
                    {t('phone')}
                  </a>
                </p>
              </address>
              <a
                href={MOSQUE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-mosque-green px-4 py-2 text-sm text-white hover:opacity-90"
              >
                <MapPin className="h-4 w-4" />
                {t('mapLink')}
              </a>
            </div>

            {/* Formulaire */}
            <div>
              <h2 className="text-lg font-semibold text-mosque-green">
                {hideForm ? t('successTitle') : t('formTitle')}
              </h2>
              {!hideForm && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('formIntro')}
                </p>
              )}
              {hideForm ? (
                <p className="mt-4 text-foreground">{t('successMessage')}</p>
              ) : (
                <form
                  onSubmit={handleSubmit(handleSendMail)}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          id="first_name"
                          placeholder={t('namePlaceholder')}
                          className="border-mosque-green/30 bg-background"
                        />
                      )}
                    />
                    {errors.first_name && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          id="email"
                          placeholder={t('emailPlaceholder')}
                          className="border-mosque-green/30 bg-background"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Controller
                      name="msg"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="msg"
                          placeholder={t('messagePlaceholder')}
                          rows={4}
                          className="border-mosque-green/30 bg-background"
                        />
                      )}
                    />
                    {errors.msg && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.msg.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-mosque-green hover:bg-mosque-green/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {t('send')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Carte : en bas sur mobile (hauteur fixe), à droite sur desktop */}
      <div className="relative min-h-[320px] flex-1 sm:min-h-[50vh] md:min-h-0">
        <iframe
          title={t('mapTitle')}
          src={MOSQUE_EMBED_URL}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
