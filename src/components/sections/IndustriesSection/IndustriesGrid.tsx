import styles from './IndustriesSection.module.css'
import { RoketIcon, GroupIcon, Group2Icon, Group3Icon, Group4Icon } from '@/components/Icon/Icon'
import { IndustryCard } from './IndustryCard'

const industries = [
  {
    cases: 7,
    icon: <RoketIcon />,
    title: 'SAAS & INNOVATION STARTUPS',
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
    active: true,
  },
  {
    cases: 9,
    icon: <GroupIcon />,
    title: 'MOBILE APPS & DIGITAL PRODUCTS',
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
  },
  {
    cases: 12,
    icon: <Group2Icon />,
    title: 'B2B SERVICES & MARKETING TECH',
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
  },
  {
    cases: 5,
    icon: <Group4Icon />,
    title: 'BUSINESS SERVICES',
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
  },
  {
    cases: 14,
    icon: <Group3Icon />,
    title: 'ECOMMERCE & DTC BRANDS',
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
  },
]

export const IndustriesGrid = () => (
  <div className={styles.grid}>
    {industries.map((item, idx) => (
      <IndustryCard key={idx} {...item} />
    ))}
  </div>
)
