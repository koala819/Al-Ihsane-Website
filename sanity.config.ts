import { visionTool } from '@sanity/vision'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './sanity/schemas'

/** Renseigner NEXT_PUBLIC_SANITY_PROJECT_ID (8 caractères) depuis sanity.io/manage */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'aaaaaaaa'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'al-ihsane',
  title: 'Al Ihsane — contenu',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool(), unsplashImageAsset()],
  schema: {
    types: schemaTypes,
  },
})
