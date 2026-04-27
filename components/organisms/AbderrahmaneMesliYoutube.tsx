import { PlayCircle, Youtube } from 'lucide-react'

import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchLatestYoutubeVideos, fetchYoutubeChannelProfile } from '@/lib/server/youtube'
import Image from 'next/image'

const YOUTUBE_URL = 'https://youtube.com/@abderrahmanemesli4217'
const CHANNEL_NAME = 'Abderrahmane Mesli'
const FALLBACK_AVATAR_URL = 'https://unavatar.io/youtube/abderrahmanemesli4217'

export async function AbderrahmaneMesliYoutube({ locale }: { locale: string }) {
  const isAr = locale === 'ar'
  const [videos, channelProfile] = await Promise.all([
    fetchLatestYoutubeVideos(3),
    fetchYoutubeChannelProfile(),
  ])
  const avatarUrl = channelProfile?.avatarUrl ?? FALLBACK_AVATAR_URL
  if (videos.length === 0) {
    return (
      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4">
          <HeadingBlock title={isAr ? 'تلاوات القرآن' : 'Récitations du Coran'} isRtl={isAr} />
          <div className="rounded-2xl border border-mosque-green/15 bg-mosque-green-light/50 p-6 text-center shadow-sm">
            <p className="text-sm text-mosque-green/80">
              {isAr ? 'تابع أحدث التلاوات على يوتيوب.' : 'Retrouvez les dernières récitations sur YouTube.'}
            </p>
            <Button
              asChild
              className="mt-4 rounded-xl bg-mosque-gold text-sm font-semibold text-white hover:bg-mosque-gold-hover"
            >
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4" />
                {isAr ? 'فتح القناة' : 'Ouvrir la chaîne'}
              </a>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HeadingBlock title={isAr ? 'تلاوات القرآن' : 'Récitations du Coran'} isRtl={isAr}>
          <p className="mt-3 text-sm font-medium text-mosque-green md:text-base">
            {isAr ? 'القارئ عبد الرحمن مسلي' : 'Par le Qari Abdurrahman Masli'}
          </p>
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
                        {isAr ? `نُشر في ${published}` : `Publié le ${published}`}
                      </p>
                    </div>
                  </CardContent>
                </a>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="mt-6 rounded-xl bg-mosque-gold text-sm font-semibold text-white shadow-md hover:bg-mosque-gold-hover"
          >
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">{isAr ? 'القناة' : 'Voir la chaîne'}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
