import type { GlobalConfig } from 'payload';


export const MainInfo: GlobalConfig = {
  slug: 'main',
  fields: [
    {
        name: 'contact-info',
        type: 'group',
        fields: [
            {
                name: 'phone',
                type: 'text',
                label: 'Phone number',
                localized: true,
            },
            {
                name: 'email',
                type: 'text',
                label: 'E-mail',
                localized: true,
            }
        ]
    },
    {
        name: 'social-items',
        type: 'group',
        fields: [
            {
                name: 'whatsapp',
                type: 'text',
                label: 'whatsapp',
                localized: true,
            },
            {
                name: 'telegram',
                type: 'text',
                label: 'Telegram',
                localized: true,
            },
            {
                name: 'youtube',
                type: 'text',
                label: 'YouTube',
                localized: true,
            },
        ]
    },
    {
        name: 'button',
        type: "text",
        label: 'Button Text',
        localized: true,
    },
    {
        name: 'logo',
        type: 'code',
        label: 'SVG logo',
        localized: true,
    },
    {
      type:'text',
      name:'redirect',
      label:'Redirect URL',
      localized:true,
      defaultValue:'/'
    }
  ],
};