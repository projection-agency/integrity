'use client'

import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './FillForm.module.css'
import Image from 'next/image'
import NumberInput from '../NumberInput/NumberInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  email: '',
  number: '',
  country: '',
  employees: '',
  position: '',
  industry: '',
  stage: '',
  website: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required('Enter your name'),
  email: Yup.string().email().required('Enter your email'),
  number: Yup.string().required('Enter your phone number'),
  country: Yup.string().required('Enter your country'),
  employees: Yup.string().required('Enter number of employees'),
  position: Yup.string().required('Enter your position'),
  industry: Yup.string().required('Enter your industry'),
  stage: Yup.string().required('Enter your company stage'),
  website: Yup.string(),
  message: Yup.string(),
})

const FillForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('')

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

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <Form className={styles.form}>
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
                <p className={styles.required}>Name</p>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </label>
            </div>
            <div className={styles.row}>
              <label className={styles.label} style={{ width: 395 }}>
                <p className={styles.required}>Email</p>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </label>
              <label className={styles.label} style={{ width: 395 }}>
                {/* <p className={styles.required}>Number</p> */}
                {/* <PhoneInput
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
              /> */}
                <p className={styles.required}>Number</p>
                <NumberInput
                  name="number"
                  id="forNumber"
                  className={`${styles.input} ${styles.numberInput}`}
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
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default FillForm
