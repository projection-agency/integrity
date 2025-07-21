import styles from './IndustriesSection.module.css'
// import { IndustryCard } from './IndustryCard'
import { RoketIcon, GroupIcon, Group2Icon, Group3Icon, Group4Icon } from '@/components/Icon/Icon'
import { IndustryCard } from './IndustryCard'

const industries = [
  {
    cases: 7,
    icon: <RoketIcon />,
    title: 'SAAS & INNOVATION STARTUPS',
    active: true,
  },
  {
    cases: 9,
    icon: <GroupIcon />,
    title: 'MOBILE APPS & DIGITAL PRODUCTS',
  },
  {
    cases: 12,
    icon: <Group2Icon />,
    title: 'B2B SERVICES & MARKETING TECH',
  },
  {
    cases: 5,
    icon: <Group4Icon />,
    title: 'BUSINESS SERVICES',
  },
  {
    cases: 14,
    icon: <Group3Icon />,
    title: 'ECOMMERCE & DTC BRANDS',
  },
]

export const IndustriesGrid = () => (
  <div className={styles.grid}>
    {industries.map((item, idx) => (
      <IndustryCard key={idx} {...item} />
    ))}
  </div>
)
