import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './IndustriesSection.module.css'
import { ArrowIcon } from '@/components/Icon/Icon'

export interface IndustryCardProps {
  cases: number
  icon: React.ReactNode
  iconWhite?: React.ReactNode
  title: string
  text: string
  image: string
  active?: boolean
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
  cases,
  icon,
  iconWhite,
  title,
  text,
  image,
  active = false,
}) => {
  const [isHovered, setHovered] = useState(false)

  const bgVariants = {
    rest: { opacity: 0, scale: 1.1 },
    hover: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div
      className={`${styles.card} ${active ? styles.active : ''}`}
      style={{ '--bg-url': `url(${image})` } as React.CSSProperties}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className={styles.bgImage}
        style={{ backgroundImage: `url(${image})` }}
        variants={bgVariants}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      <div className={styles.cardTop}>
        <span className={styles.cases}>{cases} CASES</span>
        <button className={styles.closeBtn} type="button">
          <ArrowIcon />
        </button>
      </div>

      <div className={styles.iconWrap}>{isHovered && iconWhite ? iconWhite : icon}</div>

      <div className={styles.cardTitleBlock}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{text}</p>
      </div>
    </motion.div>
  )
}
