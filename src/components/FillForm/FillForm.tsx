'use client'

import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './FillForm.module.css'
import Image from 'next/image'

const FillForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>
        <span>FILL</span>
        <Image
          src="/images/icons/report.svg"
          alt="Report"
          className={styles.titleIcon}
          width={24}
          height={24}
        />
        <span>OUT THE FORM</span>
      </h3>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Name *
          <input className={styles.input} type="text" placeholder="Enter your name" required />
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.label} style={{ width: 395 }}>
          Email *
          <input className={styles.input} type="email" placeholder="Enter your email" required />
        </label>
        <label className={styles.label} style={{ width: 395 }}>
          Phone number *
          <PhoneInput
            country={'ua'}
            value={phoneNumber}
            onChange={setPhoneNumber}
            inputStyle={{
              width: '100%',
              borderRadius: '0.83vw', // 16px → 0.83vw
              padding: '1.25vw',
              background: 'var(--light-gray)',
            }}
            containerStyle={{ width: '100%' }}
            inputProps={{ required: true, name: 'phone', autoFocus: false }}
          />
        </label>
      </div>
      <button type="submit" className={styles.submitBtn}>
        <Image
          src="/images/icons/message.svg"
          alt="Chat"
          className={styles.btnIcon}
          width={24}
          height={24}
        />
        <p className={styles.order}>Order a call</p>
      </button>
    </form>
  )
}

export default FillForm
