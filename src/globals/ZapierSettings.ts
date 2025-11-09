import type { GlobalConfig } from 'payload'

const ZapierSettings: GlobalConfig = {
  slug: 'zapier-settings',
  label: 'Налаштування Zapier',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Увімкнути Zapier інтеграцію',
      defaultValue: false,
    },
    {
      name: 'webhookURL',
      type: 'text',
      label: 'Zapier Webhook URL',
      required: true,
      admin: {
        description: 'URL webhook з Zapier для відправки подій',
        placeholder: 'https://hooks.zapier.com/hooks/catch/...',
        condition: (data) => data.enabled, // показувати тільки якщо enabled = true
      },
    },
    {
      name: 'collections',
      type: 'select',
      label: 'Колекції для відстеження',
      hasMany: true,
      required: true,
      defaultValue: ['applications'],
      options: [
        { label: 'Applications', value: 'applications' },
        { label: 'Users', value: 'users' },
        { label: 'Categories', value: 'category-app' },
      ],
      admin: {
        description: 'Оберіть колекції, зміни в яких будуть відправлятися в Zapier',
        condition: (data) => data.enabled,
      },
    },
    {
      name: 'operations',
      type: 'select',
      label: 'Типи операцій',
      hasMany: true,
      required: true,
      defaultValue: ['create', 'update', 'delete'],
      options: [
        { label: 'Створення', value: 'create' },
        { label: 'Оновлення', value: 'update' },
        { label: 'Видалення', value: 'delete' },
      ],
      admin: {
        description: 'Оберіть які операції відстежувати',
        condition: (data) => data.enabled,
      },
    },
    {
      name: 'testMode',
      type: 'checkbox',
      label: 'Тестовий режим',
      defaultValue: false,
      admin: {
        description: 'В тестовому режимі події логуються, але не відправляються в Zapier',
        condition: (data) => data.enabled,
      },
    },
  ],

}

export default ZapierSettings