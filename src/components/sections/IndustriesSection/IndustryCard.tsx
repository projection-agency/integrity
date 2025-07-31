import styles from './IndustriesSection.module.css'
import { ArrowIcon } from '@/components/Icon/Icon'

export const IndustryCard = ({
  cases,
  icon,
  title,
  text,
  image,
  active = false,
}: {
  cases: number
  icon: React.ReactNode
  title: string
  text: string
  image: string
  active?: boolean
}) => (
  <div className={`${styles.card} ${active ? styles.active : ''}`}>
    <div className={styles.bgImage} style={{ backgroundImage: `url(${image})` }}></div>
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
    <div className={styles.cardText}>{text}</div>
  </div>
)
