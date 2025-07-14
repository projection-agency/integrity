import styles from './IndustriesSection.module.css'
import { ArrowIcon } from '@/components/Icon/Icon'

export const IndustryCard = ({
  cases,
  icon,
  title,
  active = false,
}: {
  cases: number
  icon: React.ReactNode
  title: string
  active?: boolean
}) => (
  <div className={`${styles.card} ${active ? styles.active : ''}`}>
    <div className={styles.cardTop}>
      <span className={styles.cases}>{cases} CASES</span>
      <div className={styles.closeBtnWrapper}>
        <button className={styles.closeBtn} type="button">
          <span className={styles.arrowIcon}>
            <ArrowIcon />
          </span>
        </button>
      </div>
    </div>
    <div className={styles.iconWrap}>{icon}</div>
    <div className={styles.cardTitle}>{title}</div>
  </div>
)
