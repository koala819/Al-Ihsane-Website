'use client'

import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLocale, useTranslations } from 'next-intl'
import { MapPin, Phone, Send } from 'lucide-react'

import { Breadcrumb } from '@/components/molecules/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  CONTACT_GOOGLE_MAPS_LISTING_URL,
  getContactMapEmbedSrc,
} from '@/lib/contact-map-embed'
import { cn } from '@/lib/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const ContactPage = () => {
  const t = useTranslations('contact')
  const tCommon = useTranslations('activitiesPage')
  const isAr = useLocale() === 'ar'
  const [hideForm, setHideForm] = useState(false)

  const schema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .required(t('validation.emailRequired'))
          .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            t('validation.emailInvalid'),
          ),
        firstName: yup.string().required(t('validation.nameRequired')),
        message: yup.string().required(t('validation.messageRequired')),
      }),
    [t],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function handleSendMail(values: {
    firstName: string
    email: string
    message: string
  }) {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${baseUrl}/api/mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        toast.error(t('sendError'))
        return
      }

      toast.success(t('successMessage'))
      setHideForm(true)
    } catch {
      toast.error(t('sendError'))
    }
  }

  const inputClass =
    'min-h-11 border-border bg-slate-50 text-base text-foreground transition-colors focus-visible:border-mosque-green focus-visible:ring-mosque-green/25 dark:border-zinc-700 dark:bg-zinc-900 md:text-sm'

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-background text-foreground">
      {/* En-tête plein fond — lisible, hors carte (comme une page classique) */}
      <div className="shrink-0 border-b border-border bg-background px-4 py-6 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: tCommon('breadcrumb.home'), href: '/' },
              { label: t('title') },
            ]}
            className="mb-5"
          />

          <header className={cn(isAr && 'text-right')}>
            <h1 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
              {t('title')}
            </h1>
            <div
              className={cn(
                'mt-3 h-1 max-w-[10rem] overflow-hidden rounded-full bg-border',
                isAr && 'ms-auto',
              )}
            >
              <div className="h-full w-2/5 rounded-full bg-mosque-green" />
            </div>
          </header>
        </div>
      </div>

      <div
        className={cn(
          'relative flex min-h-0 w-full flex-1 flex-col',
          'md:min-h-[min(76svh,920px)]',
          'lg:flex lg:min-h-[min(84svh,1040px)] lg:flex-row lg:items-stretch',
          isAr && 'lg:flex-row-reverse',
        )}
      >
        <div
          className={cn(
            'relative z-0 shrink-0 overflow-hidden bg-white dark:bg-background',
            'h-[min(40svh,420px)] sm:h-[min(44svh,480px)]',
            'md:absolute md:inset-0 md:z-0 md:h-auto md:min-h-0',
            'lg:relative lg:inset-auto lg:z-0 lg:h-auto lg:min-h-0 lg:min-w-0 lg:flex-1',
          )}
        >
          <iframe
            title={t('mapTitle')}
            src={getContactMapEmbedSrc()}
            className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.15]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
            aria-hidden
          >
            <MapPin
              className="h-11 w-11 -translate-y-[55%] text-red-600 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] dark:text-red-500 sm:h-12 sm:w-12"
              fill="currentColor"
              stroke="white"
              strokeWidth={1.25}
            />
          </div>
        </div>

        <div
          className={cn(
            'relative z-10 w-full bg-background px-4 py-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6',
            'md:absolute md:inset-0 md:z-10 md:flex md:overflow-y-auto md:overscroll-y-contain md:bg-transparent md:px-8 md:py-16',
            'lg:relative lg:inset-auto lg:z-10 lg:w-full lg:max-w-none lg:shrink-0 lg:basis-[min(26rem,calc(100%-1.5rem))] lg:overflow-visible lg:overscroll-auto lg:bg-background lg:px-8 lg:py-12',
            !isAr && 'lg:border-s lg:border-border',
            isAr && 'lg:border-e lg:border-border',
            isAr ? 'md:justify-start' : 'md:justify-end',
            'lg:justify-center',
          )}
        >
          <div
            className={cn(
              'mx-auto flex w-full max-w-7xl flex-col md:min-h-full md:justify-center',
              isAr ? 'md:items-start' : 'md:items-end',
              'lg:mx-0 lg:h-full lg:max-w-none lg:items-center lg:justify-center',
            )}
          >
            <Card
              className={cn(
                'w-full max-w-md rounded-lg border border-border bg-white text-foreground shadow-xl dark:bg-zinc-950 dark:text-zinc-50',
                !isAr && 'md:ms-auto lg:ms-0',
                isAr && 'md:me-auto lg:me-0',
              )}
            >
              <CardHeader
                className={cn(
                  'space-y-2 px-4 pb-2 pt-5 text-center sm:px-6 sm:pt-6 md:px-8 md:pt-8 sm:text-start',
                  isAr && 'sm:text-end',
                )}
              >
                <CardTitle className="text-base font-medium text-foreground sm:text-lg md:text-xl">
                  {t('mapTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent
                className={cn(
                  'space-y-5 px-4 pb-5 sm:space-y-6 sm:px-6 sm:pb-6 md:px-8',
                  isAr && 'text-right',
                )}
              >
                <address className="not-italic">
                  <p
                    className={cn(
                      'flex items-start justify-center gap-3 text-center text-base leading-relaxed sm:justify-start sm:text-start',
                      isAr && 'flex-row-reverse sm:text-end',
                    )}
                  >
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-mosque-green"
                      aria-hidden
                    />
                    <span className="whitespace-pre-line text-foreground">
                      {t('address')}
                    </span>
                  </p>
                  <p
                    className={cn(
                      'mt-4 flex items-center justify-center gap-2 sm:justify-start',
                      isAr && 'sm:justify-end',
                    )}
                  >
                    <Phone className="h-5 w-5 shrink-0 text-mosque-green" aria-hidden />
                    <a
                      href="tel:+33561302650"
                      className="inline-flex min-h-11 items-center text-base font-medium text-mosque-green underline-offset-4 hover:underline"
                    >
                      {t('phone')}
                    </a>
                  </p>
                </address>
                <Button
                  asChild
                  className="h-11 w-full bg-mosque-gold text-base text-white hover:bg-mosque-gold-hover sm:w-auto"
                >
                  <a
                    href={CONTACT_GOOGLE_MAPS_LISTING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="me-2 h-4 w-4" />
                    {t('mapLink')}
                  </a>
                </Button>

                <Separator className="bg-border" />

                <div
                  className={cn(
                    'space-y-1 text-center sm:text-start',
                    isAr && 'sm:text-end',
                  )}
                >
                  <CardTitle className="text-base font-medium text-foreground sm:text-lg md:text-xl">
                    {hideForm ? t('successTitle') : t('formTitle')}
                  </CardTitle>
                  {!hideForm && (
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t('formIntro')}
                    </CardDescription>
                  )}
                </div>

                {hideForm ? (
                  <p
                    className={cn(
                      'text-center text-base leading-relaxed text-foreground sm:text-start',
                      isAr && 'sm:text-end',
                    )}
                  >
                    {t('successMessage')}
                  </p>
                ) : (
                  <form
                    onSubmit={handleSubmit(handleSendMail)}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm text-muted-foreground">
                        {t('namePlaceholder')}
                      </Label>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="firstName"
                            type="text"
                            placeholder={t('namePlaceholder')}
                            autoComplete="name"
                            className={inputClass}
                          />
                        )}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-muted-foreground">
                        {t('emailPlaceholder')}
                      </Label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            autoComplete="email"
                            inputMode="email"
                            className={inputClass}
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm text-muted-foreground">
                        {t('messagePlaceholder')}
                      </Label>
                      <Controller
                        name="message"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="message"
                            placeholder={t('messagePlaceholder')}
                            rows={5}
                            className={cn(
                              inputClass,
                              'min-h-[8rem] resize-y leading-relaxed',
                            )}
                          />
                        )}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="h-11 w-full bg-mosque-gold text-base font-medium text-white hover:bg-mosque-gold-hover"
                    >
                      <Send className="me-2 h-4 w-4" />
                      {t('send')}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage