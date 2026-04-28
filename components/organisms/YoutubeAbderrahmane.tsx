import { PlayCircle, Youtube } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchLatestYoutubeVideos, fetchYoutubeChannelProfile } from '@/lib/server/youtube'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const YOUTUBE_URL = 'https://youtube.com/@abderrahmanemesli4217'
const CHANNEL_NAME = 'Abderrahmane Mesli'
const FALLBACK_AVATAR_URL = 'https://unavatar.io/youtube/abderrahmanemesli4217'

export const YoutubeAbderrahmaneMesli = async ({ locale }: { locale: string }) => {
  const isAr = locale === 'ar'
  const t = await getTranslations({ locale, namespace: 'youtube' })
  const [videos, channelProfile] = await Promise.all([
    fetchLatestYoutubeVideos(3),
    fetchYoutubeChannelProfile(),
  ])
  const avatarUrl = channelProfile?.avatarUrl ?? FALLBACK_AVATAR_URL

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HeadingBlock title={t('headingTitle')} isRtl={isAr}>
          {videos.length > 0 ? (
            <p className="mt-3 text-sm font-medium text-mosque-green md:text-base">
              {t('headingSubtitle')}
            </p>
          ) : null}
        </HeadingBlock>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const published = new Date(video.publishedAt).toLocaleDateString(isAr ? 'ar-DZ' : 'fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })

            return (
              <Card
                key={video.id}
                className="group h-full overflow-hidden rounded-xl border-mosque-green/10 shadow-sm transition-opacity hover:opacity-95"
              >
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      width={360}
                      height={202}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <PlayCircle className="absolute bottom-2 right-2 h-8 w-8 text-white/95 drop-shadow-sm" />
                  </div>

                  <CardContent className="flex gap-3 px-3 pb-3 pt-3">
                    <Image
                      src={avatarUrl}
                      alt={CHANNEL_NAME}
                      width={36}
                      height={36}
                      className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-mosque-green/15"
                    />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-mosque-green">
                        {video.title}
                      </p>
                      <p className="text-xs text-mosque-green/60">
                        {t('publishedOn', { date: published })}
                      </p>
                    </div>
                  </CardContent>
                </a>
              </Card>
            )
          })}
        </div>

        <div
          className={cn(
            videos.length === 0
              ? 'rounded-2xl border border-mosque-green/15 bg-mosque-green-light/50 p-6 text-center shadow-sm'
              : 'mt-10 flex justify-center',
          )}
        >
          <p className={cn(videos.length === 0 ? 'text-sm text-mosque-green/80' : 'hidden')}>
            {t('emptyMessage')}
          </p>
          <Button
            asChild
            className={cn(
              videos.length === 0
                ? 'mt-4 rounded-xl bg-mosque-gold text-sm font-semibold text-white hover:bg-mosque-gold-hover'
                : 'mt-6 rounded-xl bg-mosque-gold text-sm font-semibold text-white shadow-md hover:bg-mosque-gold-hover',
            )}
          >
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4" />
              <span className="ml-2">{t('openChannel')}</span>
            </a>
          </Button>
        </div>

      </div>
    </section>
  )
}
