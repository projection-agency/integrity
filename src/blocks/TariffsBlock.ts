import type { Block } from 'payload'
import { StyledText } from '@/plugin/sl_StyledText'

export const TariffsBlock: Block = {
  slug: 'tariffs-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Subtitle',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
      },
      admin: {
        components: {
          Field: StyledText,
        },
      },
    },
    {
      name: 'tariff',
      type: 'array',
      label: {
        en: 'Tariff',
      },
      minRows:4,
      maxRows:4,
      fields: [

        {
          name: 'name_tariff',
          type: 'text',
          required: true,
          label: {
            en: 'Name Tariff',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: {
            en: 'Title',
          },
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: {
            en: 'Description',
          },
          admin: {
            components: {
              Field: StyledText,
            },
          },
        },
        {
          name: 'result',
          type: 'array',
          required: true,
          label: {
            en: 'Result',
          },
          fields: [
            {
              name: 'points',
              type: 'text',
              required: true,
              label: {
                en: 'Points',
              },
            },
          ],
        },
      ],
    },
  ],
}
