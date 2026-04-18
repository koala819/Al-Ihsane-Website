import { redirect } from '@/i18n/navigation'

/** Ancienne URL : redirige vers la liste des actualités (Sanity). */
export default async function AssociationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect({ href: '/actualites', locale })
}
