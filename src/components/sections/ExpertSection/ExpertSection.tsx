import React from 'react'
import 'react-phone-input-2/lib/style.css'
import styles from './ExpertSection.module.css'
import Image from 'next/image'
import FillForm from '@/components/FillForm/FillForm'

const ExpertSection = () => {
  return (
    <div className={styles.wrapper}>
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
              <span className={styles.expertTitleLine}>TALK TO</span>
              <span className={styles.expertTitleLine}>AN EXPERT</span>
            </div>
            <div className={styles.expertSubtitle}>
              Order your first free call and receive a tailored strategy to promote your business
            </div>
          </div>
        </div>
        {/* FillForm */}
        <FillForm />
      </div>
    </div>
  )
}

export default ExpertSection
