import React from 'react'

import config from '@/payload.config'
import { getPayload } from 'payload'
import './styles.css'
import HeroSection from '@/components/sections/HeroSection/HeroSection'
import AchievementsSection from '@/components/sections/AchievementsSection/AchievementsSection'
import s from './page.module.css'
import CasesSection from '@/components/sections/CasesSection/CasesSection'
import ServicesSection from '@/components/sections/ServicesSection/ServicesSection'
import SectionUnique from '@/components/sections/SectionUnique/SectionUnique'
import { IndustriesSection } from '@/components/sections/IndustriesSection/IndustriesSection'
import AboutTheFounderSection from '@/components/sections/AboutTheFounderSection/AboutTheFounderSection'
import ApproachSection from '@/components/sections/ApproachSection/ApproachSection'
import LatestInsightsSection from '@/components/sections/LatestInsightsSection/LatestInsightsSection'
import OutcomesSection from '@/components/sections/OutcomesSection/OutcomesSection'
import WorkflowSection from '@/components/sections/WorkflowSection/WorkflowSection'

const BLOCK_COMPONENTS: Record<string, React.ComponentType<{ locale: string; block: any }>> = {
  'hero-block': HeroSection,
  'achievements-block': AchievementsSection,
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'main' } },
    locale: locale as 'en',
  })
  const page = docs[0]

  return (
    <div className={s.page}>
      {page?.blocks?.map((block, i) => {
        if (block.enabled === false) return null
        const BlockComponent = BLOCK_COMPONENTS[block.blockType]
        if (!BlockComponent) return null
        return <BlockComponent key={block.id || i} block={block} locale={locale} />
      })}

      <CasesSection />

      <ServicesSection />
      <SectionUnique />
      <IndustriesSection />
      <WorkflowSection />
      <OutcomesSection />
      <AboutTheFounderSection />
      <ApproachSection />
      <LatestInsightsSection />
    </div>
  )
}
