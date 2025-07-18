'use client'

import MainTitle from '@/components/ui/MainTitle/MainTitle'
import styles from './IndustriesSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'

type IndustriesHeader = {
  subtitle: string
  title: string
}

export const IndustriesHeader = ({ block }: { block: IndustriesHeader }) => (
  <header className={styles.header}>
    <TabSection style="gray" text={block.subtitle} />
    <div className={styles.wrapHeading}>
      <MainTitle title={block.title} />
      <div className={styles.count}>(5)</div>
    </div>
  </header>
)
