import type { Block } from 'payload'
import { StyledText } from '@/plugin/sl_StyledText'

export const ServicesBlock: Block = {
  slug: 'services-block',
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
      type:'array',
      name:'service',
      fields:[
        {
          name: 'service_title',
          type: 'text',
          localized: true,
          label:'Service Title'
        },
        {
          name: 'service_description',
          type: 'text',
          localized: true,
          label:'Service description'
        },
        {
          name: 'service_icon',
          type: 'textarea',
          localized: true,
          label:'Service SVG icon'
        }

      ]
    }
  ]}