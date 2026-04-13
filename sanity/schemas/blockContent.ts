import { defineType } from 'sanity'

/**
 * Rich text (titres, listes, liens, emphase) — pas de Markdown à la main.
 */
export const blockContent = defineType({
  title: 'Bloc de texte',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Titre', value: 'h3' },
      ],
      lists: [
        { title: 'Puce', value: 'bullet' },
        { title: 'Numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            title: 'Lien',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
            ],
          },
        ],
      },
    },
  ],
})
