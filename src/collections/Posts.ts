import readingTime from 'reading-time'
import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      localized: true,
    },
    {
      name: 'excerptTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'excerpt',
      type: 'richText',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Reading Time (min)',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value)
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.content && Array.isArray(data.content)) {
          // Витягуємо лише текст з параграфів
          const textBlocks = data.content
            .filter((block: any) => block.type === 'paragraph' && Array.isArray(block.children))
            .map((block: any) => block.children.map((child: any) => child.text).join(' '))

          const plainText = textBlocks.join(' ')
          const stats = readingTime(plainText)
          data.readingTime = Math.ceil(stats.minutes)
        } else {
          data.readingTime = 0
        }

        return data
      },
    ],
  },
}
