import { Block } from 'payload'

export const SimplePageBody:Block = {
  slug:'simple-page',
  labels:{
    singular:{
      ua:"Шаблон простої сторінки",
      en:'Simple page template',
    },
    plural:{
      ua:"Шаблон простої сторінки",
      en:'Simple page template',
    },
  },
  fields:[
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        en: 'Excerpt',
        ua: 'Опис',
      },
    },
    {
      name: 'futured_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      localized: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        en: 'Content',
        ua: 'Контент',
      },
    },

  ]
}