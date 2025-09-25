import type { Block } from 'payload'

export const OrderCallExtendBlock: Block = {
  slug: 'order-call-extend-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'url',
      type:'text',
      label: 'Redirect URL',
      defaultValue:'/'
    }
  ],
}
