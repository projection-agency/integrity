import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'data',
      type: 'date',
      defaultValue: new Date(),
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Title',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          localized: true,
          label: {
            en: 'Content',
          },
        },
      ],
    },
  ],
}
