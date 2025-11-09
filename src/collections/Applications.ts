import type { CollectionConfig } from 'payload'
import { createZapierHooks } from '@/utils/zapierIntegration'

const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'category',
  },
  hooks: {
    afterChange: [...createZapierHooks('applications').afterChange],
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'category-app',
      required: true,
      hasMany: false,
      label: 'Категорія',
      admin: {
        readOnly: true, // лише читання
      },
    },
    {
      name: 'isView',
      type: 'checkbox',
      label: 'Переглянуто',
      defaultValue: false,
    },
    {
      name: 'meta',
      type: 'array',
      label: 'Мета-дані',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'value',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
  ],
  timestamps: true,
}

export default Applications
