import { redirect } from '@/i18n/navigation'

/** Ancienne URL : les favoris pointent ici — redirige vers la liste des actualités / activités. */
export default async function AssociationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect({ href: '/activites', locale })
}
