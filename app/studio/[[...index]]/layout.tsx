import { NextStudioLayout, metadata, viewport } from 'next-sanity/studio'

export { metadata, viewport }

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return <NextStudioLayout>{children}</NextStudioLayout>
}
