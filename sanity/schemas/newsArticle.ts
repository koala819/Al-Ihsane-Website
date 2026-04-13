import { defineField, defineType } from 'sanity'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'Actualité',
  type: 'document',
  fields: [
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date affichée (libre)',
      type: 'string',
      description: 'Ex. « Mars 2026 » ou « 12 avril 2026 » — visible sur la carte.',
    }),
    defineField({
      name: 'tagFr',
      title: 'Catégorie (FR)',
      type: 'string',
    }),
    defineField({
      name: 'tagAr',
      title: 'Catégorie (AR)',
      type: 'string',
    }),
    defineField({
      name: 'titleFr',
      title: 'Titre (FR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAr',
      title: 'Titre (AR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerptFr',
      title: 'Résumé court (FR)',
      type: 'text',
      rows: 3,
      description: 'Aperçu sous le titre (carte repliée).',
    }),
    defineField({
      name: 'excerptAr',
      title: 'Résumé court (AR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bodyFr',
      title: 'Contenu détaillé (FR)',
      type: 'blockContent',
    }),
    defineField({
      name: 'bodyAr',
      title: 'Contenu détaillé (AR)',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image (optionnelle)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'titleFr', subtitle: 'dateLabel', media: 'mainImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Sans titre', subtitle, media }
    },
  },
  orderings: [
    {
      title: 'Date de publication, plus récent',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
