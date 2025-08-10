import React from 'react'
import 'react-phone-input-2/lib/style.css'
import styles from './ExpertSection.module.css'
import Image from 'next/image'
import FillForm from '@/components/FillForm/FillForm'
import { useTranslations } from 'next-intl'

const ExpertSection = () => {
  const t = useTranslations('ExpertSection')

  return (
    <div className={styles.wrapper} id="call">
      <div className={styles.rowLayout}>
        {/* TalkToExpertBlock */}
        <div className={styles.expertBlock}>
          <div className={styles.expertCard}>
            <div className={styles.expertAvatarWrapper}>
              <Image
                src="/images/icons/frame.png"
                alt="Avatar"
                className={styles.expertAvatar}
                width={98}
                height={98}
              />
              <Image
                src="/images/icons/chat.svg"
                alt="Chat"
                className={styles.expertChatIcon}
                width={98}
                height={98}
              />
            </div>
            <div className={styles.expertTitle}>
              <span className={styles.expertTitleLine}>{t('talkTo')}</span>
              <span className={styles.expertTitleLine}>{t('anExpert')}</span>
            </div>
            <div className={styles.expertSubtitle}>{t('orderFirstFreeCall')}</div>
          </div>
        </div>
        {/* FillForm */}
        <FillForm />
      </div>
    </div>
  )
}

export default ExpertSection
