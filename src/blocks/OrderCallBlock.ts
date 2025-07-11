import type { Block } from 'payload'

export const OrderCallBlock: Block = {
  slug: 'order-call-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    }
  ],
}
