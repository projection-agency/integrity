import type { Block } from 'payload'
import { StyledText } from '@/plugin/sl_StyledText'

export const AboutFounderBlock: Block = {
  slug: 'about-founder-block',
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
      localized:true,
      label: {
        en: 'Subtitle',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized:true,
      label: {
        en: 'Title',
      },
      admin: {
        components: {
          Field: StyledText,
        },
      },
    },
  ],
}
