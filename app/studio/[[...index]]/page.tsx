'use client'

import { NextStudio } from 'next-sanity/studio'

import config from '@/sanity.config'

export default function StudioPage() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-center text-zinc-100">
        <h1 className="text-xl font-semibold">Sanity Studio</h1>
        <p className="max-w-md text-sm text-zinc-400">
          Ajoutez{' '}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-200">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{' '}
          et{' '}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-200">
            NEXT_PUBLIC_SANITY_DATASET
          </code>{' '}
          dans <code className="text-zinc-300">.env.local</code>, puis redémarrez le serveur de
          dev.
        </p>
      </div>
    )
  }

  return <NextStudio config={config} />
}
