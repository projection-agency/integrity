import type { Block } from 'payload'
import { StyledText } from '@/plugin/sl_StyledText'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'

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
        {
          name: 'whats_included',
          type: 'array',
          required: true,
          label: {
            en: 'What`s included:',
          },
          fields: [
            {
              name: 'wi_points',
              type: 'text',
              required: true,
              label: {
                en: 'What`s included points',
              },
            },
          ],
        },
        {
          name: 'channels',
          type: 'array',
          // required: true,
          label: {
            en: 'Channels:',
          },
          fields: [
            {
              name: 'c_points',
              type: 'text',
              label: {
                en: 'Channels points',
              },
            },
            {
              type: 'text',
              name:'c_icon',
              label: {
                en: 'Channels icon',
              },
              admin:{
                components: {
                  Field: PreviewSvg,
                }
              }
            }
          ],
        },
      ],
    },
  ],
}
//Test
