import React from 'react'
import styles from './SectionUnique.module.css'
import { PhoneIcon } from './icons/PhoneIcon'
import {
  CanvasIcon,
  GlobeIcon,
  ChartIcon,
  ChartBarIcon,
  DocumentIcon,
  AnalyticsIcon,
} from '../../Icon/Icon'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'

const cards = [
  {
    icon: <CanvasIcon className={styles.cardIcon} />,
    title: 'STRUCTURED EXECUTION',
    description: 'Every action supports the strategy and drives measurable progress',
  },
  {
    icon: <ChartIcon className={styles.cardIcon} />,
    title: 'DATA-FIRST APPROACH',
    description: 'Decisions are based on numbers, not gut feeling',
  },
  {
    icon: <DocumentIcon className={styles.cardIcon} />,
    title: 'BUILT-IN CLARITY',
    description: 'Every step is structured and transparent',
  },
  {
    icon: <GlobeIcon className={styles.cardIcon} />,
    title: 'TRUE PARTNERSHIP',
    description: 'We don’t take on projects unless we believe we can create real value',
  },
  {
    icon: <AnalyticsIcon className={styles.cardIcon} />,
    title: 'EXPERIENCE IN TIER-1 MARKETS',
    description: 'Years of hands-on work across leading global markets',
  },
  {
    icon: <ChartBarIcon className={styles.cardIcon} />,
    title: 'LONG-TERM MINDSET',
    description: 'No short bursts. We create systems designed to grow, scale, and last',
  },
]

type SectionUnique = {
  subtitle: string
  title: string
}

export default function SectionUnique({ block }: { block: SectionUnique }) {
  return (
    <section style={{ marginTop: '200px', marginBottom: '200px' }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}
      >
        <TabSection style="gray" text={block.subtitle} />
        <MainTitle title={block.title} />
      </div>
      <div className={styles.sectionUnique}>
        <div className={styles.sectionUniqueSide}>
          <div className={styles.sideAvatarBlock}>
            <div className={styles.sideAvatarBg}>
              <img src="/images/icons/chat.svg" alt="Chat" className={styles.sideChatIcon} />
            </div>
            <img src="/images/icons/frame.png" alt="Avatar" className={styles.sideAvatar} />
          </div>
          <div className={styles.sideTitle}>
            YOU ARE HERE <span>TO ACHIEVE RESULTS</span>
          </div>
          <div className={styles.sideDescription}>
            Order your first free call and receive a tailored strategy to promote your business
          </div>
          <button className={styles.sideButton}>
            <PhoneIcon className={styles.sidePhoneIcon} />
            Demo call
          </button>
        </div>
        <div className={styles.sectionUniqueContent}>
          <div className={styles.sectionUniqueGrid}>
            {cards.map((card, idx) => (
              <div className={styles.sectionUniqueCard} key={idx}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDescription}>{card.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
