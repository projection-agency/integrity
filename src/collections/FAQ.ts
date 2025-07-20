import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Question',
      },
    },
    {
      name: 'content',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Answer',
      },
    },
  ],
}
