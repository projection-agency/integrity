import { HeroBlock } from '@/blocks/HeroBlock'
import { AchievementsBlock } from '@/blocks/AchievementsBlock'
import type { CollectionConfig } from 'payload'
import { CasesBlock } from '@/blocks/CasesBlock'
import { ServicesBlock } from '@/blocks/ServicesBlock'
import { OrderCallBlock } from '@/blocks/OrderCallBlock'
import { WhatUsBlock } from '@/blocks/WhatUsBlock'
import { ExpertiseBlock } from '@/blocks/ExpertiseBlock'
import { WorkflowBlock } from '@/blocks/WorkflowBlock'
import { OutcomesBlock } from '@/blocks/OutcomesBlock'
import { AboutFounderBlock } from '@/blocks/AboutFounderBlock'
import { OurTeamBlock } from '@/blocks/OurTeamBlock'
import { ReviewsBlock } from '@/blocks/ReviewsBlock'
import { TariffsBlock } from '@/blocks/TariffsBlock'
import { ArticlesBlock } from '@/blocks/ArticlesBlock'
import { FaqBlock } from '@/blocks/FaqBlock'
import { OrderCallExtendBlock } from '@/blocks/OrderCallExtendBlock'
import { HeroContacts } from '@/blocks/HeroContacts'
import { AccordionBlock } from '@/blocks/AccordionBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
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
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [
        HeroBlock,
        AchievementsBlock,
        CasesBlock,
        ServicesBlock,
        OrderCallBlock,
        WhatUsBlock,
        ExpertiseBlock,
        WorkflowBlock,
        OutcomesBlock,
        AboutFounderBlock,
        OurTeamBlock,
        ReviewsBlock,
        TariffsBlock,
        ArticlesBlock,
        FaqBlock,
        OrderCallExtendBlock,
        HeroContacts,
        AccordionBlock,
      ],
    },
  ],
}
