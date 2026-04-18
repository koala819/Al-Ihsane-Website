'use client'

import { useEffect } from 'react'
import { Controller, useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const defaultValues = {
  firstName: '',
  lastName: '',
  current2026SaturdayMorning: false,
  current2026SaturdayAfternoon: false,
  current2026SundayMorning: false,
  current2026SundayAfternoon: false,
  current2026Level: '',
  levelPreference: '' as '' | 'specific' | 'indifferent',
  levelDetail: '',
  wantsAllFourSlots: false,
  slotSaturdayMorning: false,
  slotSaturdayAfternoon: false,
  slotSundayMorning: false,
  slotSundayAfternoon: false,
  email: '',
  phone: '',
  remarks: '',
  company: '',
}

type FormValues = typeof defaultValues

const schema = yup.object({
  firstName: yup.string().trim().required('Le prénom est obligatoire.'),
  lastName: yup.string().trim().required('Le nom est obligatoire.'),
  current2026SaturdayMorning: yup.boolean(),
  current2026SaturdayAfternoon: yup.boolean(),
  current2026SundayMorning: yup.boolean(),
  current2026SundayAfternoon: yup.boolean(),
  current2026Level: yup.string().trim().required('Indiquez le niveau que vous enseignez cette année.'),
  levelPreference: yup
    .mixed<'specific' | 'indifferent'>()
    .oneOf(['specific', 'indifferent'], 'Choisissez une option pour le niveau.')
    .required(),
  levelDetail: yup.string().when('levelPreference', {
    is: 'specific',
    then: (s) => s.trim().required('Indiquez le niveau souhaité.'),
    otherwise: (s) => s.strip(),
  }),
  wantsAllFourSlots: yup.boolean().required(),
  slotSaturdayMorning: yup.boolean(),
  slotSaturdayAfternoon: yup.boolean(),
  slotSundayMorning: yup.boolean(),
  slotSundayAfternoon: yup.boolean(),
  email: yup
    .string()
    .trim()
    .required("L'e-mail est obligatoire")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "L'e-mail n'est pas valide"),
  phone: yup
    .string()
    .transform((v) => (v ?? '').trim().replace(/\s/g, ''))
    .required('Le numéro de mobile est obligatoire')
    .test('fr-mobile', 'Numéro invalide (ex. 06 12 34 56 78 ou +33 6 12 34 56 78)', (v) => {
      if (!v) return false
      const s = v.startsWith('0033') ? `+33${v.slice(4)}` : v
      return /^0[1-9]\d{8}$/.test(s) || /^\+33[1-9]\d{8}$/.test(s)
    }),
  remarks: yup.string().max(4000, 'Maximum 4000 caractères.'),
  company: yup.string(),
})
  .test('slots2026', function (values) {
    if (!values) return true
    const any2026 =
      values.current2026SaturdayMorning ||
      values.current2026SaturdayAfternoon ||
      values.current2026SundayMorning ||
      values.current2026SundayAfternoon
    if (any2026) return true
    return this.createError({
      path: 'current2026SaturdayMorning',
      message:
        'Cochez au moins un créneau sur lequel vous enseignez cette année (un à quatre créneaux possibles).',
    })
  })
  .test('slots', function (values) {
  if (!values) return true
  if (values.wantsAllFourSlots) return true
  const anySlot =
    values.slotSaturdayMorning ||
    values.slotSaturdayAfternoon ||
    values.slotSundayMorning ||
    values.slotSundayAfternoon
  if (anySlot) return true
  return this.createError({
    path: 'wantsAllFourSlots',
    message:
      'Choisissez au moins un créneau, ou cochez l’option pour les quatre créneaux.',
  })
})

const slotFields2026 = [
  { name: 'current2026SaturdayMorning' as const, label: 'Samedi matin' },
  { name: 'current2026SaturdayAfternoon' as const, label: 'Samedi après-midi' },
  { name: 'current2026SundayMorning' as const, label: 'Dimanche matin' },
  { name: 'current2026SundayAfternoon' as const, label: 'Dimanche après-midi' },
]

const slotFields = [
  { name: 'slotSaturdayMorning' as const, label: 'Samedi matin' },
  { name: 'slotSaturdayAfternoon' as const, label: 'Samedi après-midi' },
  { name: 'slotSundayMorning' as const, label: 'Dimanche matin' },
  { name: 'slotSundayAfternoon' as const, label: 'Dimanche après-midi' },
]

export function QuestionnaireProfesseursForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues,
  })

  const wantsAllFour = watch('wantsAllFourSlots')
  const levelPreference = watch('levelPreference')

  useEffect(() => {
    if (wantsAllFour) {
      setValue('slotSaturdayMorning', false)
      setValue('slotSaturdayAfternoon', false)
      setValue('slotSundayMorning', false)
      setValue('slotSundayAfternoon', false)
    }
  }, [wantsAllFour, setValue])

  async function onSubmit(values: FormValues) {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const phoneNorm =
      values.phone.startsWith('0033') ? `+33${values.phone.slice(4)}` : values.phone
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      current2026SaturdayMorning: values.current2026SaturdayMorning,
      current2026SaturdayAfternoon: values.current2026SaturdayAfternoon,
      current2026SundayMorning: values.current2026SundayMorning,
      current2026SundayAfternoon: values.current2026SundayAfternoon,
      current2026Level: values.current2026Level,
      levelPreference: values.levelPreference,
      levelDetail: values.levelPreference === 'specific' ? values.levelDetail : '',
      wantsAllFourSlots: values.wantsAllFourSlots,
      slotSaturdayMorning: values.slotSaturdayMorning,
      slotSaturdayAfternoon: values.slotSaturdayAfternoon,
      slotSundayMorning: values.slotSundayMorning,
      slotSundayAfternoon: values.slotSundayAfternoon,
      email: values.email,
      phone: phoneNorm,
      remarks: values.remarks,
      company: values.company,
    }

    const res = await fetch(`${baseUrl}/api/preinscriptions-2027/questionnaire-professeurs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    let data: { ok?: boolean; error?: string } = {}
    try {
      data = await res.json()
    } catch {
      /* ignore */
    }

    if (res.status === 401) {
      toast.error('Votre session a expiré. Reconnectez-vous via la page d’accès.')
      return
    }

    if (!res.ok) {
      toast.error(data.error ?? 'Envoi impossible. Réessayez.')
      return
    }

    toast.success('Merci, votre réponse a bien été enregistrée. Nous vous recontactons si besoin.')
    reset(defaultValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 sm:space-y-11" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
        {...register('company')}
      />

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-mosque-green">Identité</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="qp-lastName">Nom</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input id="qp-lastName" autoComplete="family-name" {...field} />
              )}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qp-firstName">Prénom</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input id="qp-firstName" autoComplete="given-name" {...field} />
              )}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-mosque-green">Cette année — votre emploi du temps</legend>
        <p className="text-sm text-muted-foreground">
          Sur combien de créneaux enseignez-vous actuellement ? Cochez tous les créneaux concernés (un,
          deux, trois ou quatre), puis indiquez le niveau du ou des groupes que vous avez cette année.
        </p>
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">Créneaux où vous enseignez</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {slotFields2026.map(({ name, label }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <label
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-xl border bg-background/60 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mosque-gold',
                      field.value && 'border-mosque-green/35 bg-mosque-green/5',
                    )}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-mosque-gold"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <span className="font-medium leading-snug">{label}</span>
                  </label>
                )}
              />
            ))}
          </div>
          {errors.current2026SaturdayMorning && (
            <p className="text-xs text-destructive">{errors.current2026SaturdayMorning.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="qp-current2026Level">Niveau enseigné cette année</Label>
          <Controller
            name="current2026Level"
            control={control}
            render={({ field }) => (
              <Input
                id="qp-current2026Level"
                placeholder="Ex. débutants, grands débutants, intermédiaire…"
                {...field}
              />
            )}
          />
          {errors.current2026Level && (
            <p className="text-xs text-destructive">{errors.current2026Level.message}</p>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-mosque-green">Pour l’année prochaine — niveau souhaité</legend>
        <p className="text-sm text-muted-foreground">
          Souhaitez-vous un niveau en particulier, ou cela vous est-il égal ?
        </p>
        <Controller
          name="levelPreference"
          control={control}
          render={({ field }) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-xl border bg-background/60 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mosque-gold',
                  field.value === 'specific' && 'border-mosque-gold/50 bg-mosque-gold/5',
                )}
              >
                <input
                  type="radio"
                  className="mt-1 accent-mosque-gold"
                  checked={field.value === 'specific'}
                  onChange={() => field.onChange('specific')}
                />
                <span>
                  <span className="font-medium">Un niveau en particulier</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    Vous préciserez lequel ci-dessous.
                  </span>
                </span>
              </label>
              <label
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-xl border bg-background/60 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mosque-gold',
                  field.value === 'indifferent' && 'border-mosque-gold/50 bg-mosque-gold/5',
                )}
              >
                <input
                  type="radio"
                  className="mt-1 accent-mosque-gold"
                  checked={field.value === 'indifferent'}
                  onChange={() => field.onChange('indifferent')}
                />
                <span>
                  <span className="font-medium">Cela m’est égal</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    Pas de préférence de niveau.
                  </span>
                </span>
              </label>
            </div>
          )}
        />
        {errors.levelPreference && (
          <p className="text-xs text-destructive">{errors.levelPreference.message}</p>
        )}

        {levelPreference === 'specific' && (
          <div className="space-y-1.5 pt-1">
            <Label htmlFor="qp-levelDetail">Niveau souhaité</Label>
            <Controller
              name="levelDetail"
              control={control}
              render={({ field }) => (
                <Input
                  id="qp-levelDetail"
                  placeholder="Ex. débutants, grands débutants, niveau intermédiaire…"
                  {...field}
                />
              )}
            />
            {errors.levelDetail && (
              <p className="text-xs text-destructive">{errors.levelDetail.message}</p>
            )}
          </div>
        )}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-mosque-green">Pour l’année prochaine — créneaux souhaités</legend>
        <p className="text-sm text-muted-foreground">
          Cochez les créneaux qui vous conviennent pour l’année prochaine (plusieurs choix possibles),
          ou indiquez que vous pouvez assurer les quatre.
        </p>

        <Controller
          name="wantsAllFourSlots"
          control={control}
          render={({ field }) => (
            <label
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border bg-background/60 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mosque-gold',
                field.value && 'border-mosque-gold/50 bg-mosque-gold/5',
              )}
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-mosque-gold"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <span className="font-medium leading-snug">
                Je peux travailler sur les quatre créneaux (samedi et dimanche, matin et
                après-midi)
              </span>
            </label>
          )}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {slotFields.map(({ name, label }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <label
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-xl border bg-background/60 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mosque-gold',
                    field.value && !wantsAllFour && 'border-mosque-green/35 bg-mosque-green/5',
                    wantsAllFour && 'pointer-events-none opacity-40',
                  )}
                >
                  <input
                    type="checkbox"
                    disabled={wantsAllFour}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-mosque-gold disabled:cursor-not-allowed"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <span className="font-medium leading-snug">{label}</span>
                </label>
              )}
            />
          ))}
        </div>
        {errors.wantsAllFourSlots?.message && (
          <p className="text-xs text-destructive">{errors.wantsAllFourSlots.message}</p>
        )}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-mosque-green">Contact</legend>
        <div className="space-y-1.5">
          <Label htmlFor="qp-email">E-mail</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input id="qp-email" type="email" autoComplete="email" {...field} />
            )}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="qp-phone">Mobile</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                id="qp-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="06 12 34 56 78"
                {...field}
              />
            )}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-mosque-green">Remarques</legend>
        <p className="text-sm text-muted-foreground">
          Espace libre : contraintes personnelles, idées pour l’organisation, ou tout ce que vous
          jugez utile de signaler — sans obligation.
        </p>
        <Controller
          name="remarks"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              rows={5}
              className="min-h-[120px] resize-y"
              placeholder="Optionnel — vous pouvez rester très synthétique."
            />
          )}
        />
        {errors.remarks && (
          <p className="text-xs text-destructive">{errors.remarks.message}</p>
        )}
      </fieldset>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-mosque-gold text-white hover:bg-mosque-gold-hover sm:max-w-xs"
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Send className="mr-2 h-4 w-4" aria-hidden />
        )}
        {isSubmitting ? 'Envoi…' : 'Envoyer'}
      </Button>
    </form>
  )
}
