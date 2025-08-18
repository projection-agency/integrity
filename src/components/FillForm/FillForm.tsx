'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import 'react-phone-input-2/lib/style.css'
import styles from './FillForm.module.css'
import Image from 'next/image'
import NumberInput from '../NumberInput/NumberInput'
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { NumberBlackIcon, NumberIcon } from '../Icon/Icon'
import { useCustomToastContext } from '@/contexts/CustomToastProvider'
import { useTranslations } from 'next-intl'

interface FormValues {
  name: string
  email: string
  number: string
  county: string
}

const initialValues = {
  name: '',
  email: '',
  number: '',
  county: '',
}

const FillForm = () => {
  const t = useTranslations('FillForm')
  const { showSuccessToast, showErrorToast } = useCustomToastContext()
  const [isHovered, setIsHovered] = useState(false)

  // Оновлена схема валідації
  const validationSchema = Yup.object({
    name: Yup.string().required(t('enterYourNameError')),
    email: Yup.string().email(t('invalidEmailFormat')).required(t('enterYourEmailError')),
    number: Yup.string()
      .required(t('enterYourPhoneNumber'))
      .matches(/^\+?[0-9\s-]+$/, t('invalidPhoneNumberFormat')),
    county: Yup.string(),
  })

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await fetch('/api/order-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'pk_...',
          'x-api-secret': process.env.NEXT_PUBLIC_API_SECRET || 'sk_...',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.number,
        }),
      })

      if (!response.ok) {
        throw new Error(`Помилка при відправці форми: ${response.status}`)
      }

      const result = await response.json()
      console.log('Form sent successfully:', result)
      showSuccessToast(t('formSentSuccessfully'))
      resetForm()
    } catch (error) {
      console.error('Error:', error)
      showErrorToast(t('failedToSendForm'))
    } finally {
      setSubmitting(false)
    }
  }

  const [phoneNumber, setPhoneNumber] = useState('')
  const pathname = usePathname()

  return (
    <div
      className={`${styles.wrapper} ${pathname.includes('contacts') ? styles.contactsPage : ''}`}
    >
      <div className={styles.rowLayout}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          enableReinitialize={true}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <h3 className={styles.title}>
                <div className={styles.fillBlock}>
                  <span className={styles.text}>{t('fill')}</span>
                  <Image
                    src="/images/icons/report.svg"
                    alt="Report"
                    className={styles.titleIcon}
                    width={24}
                    height={24}
                  />
                </div>

                <span className={styles.text}>{t('outTheForm')}</span>
              </h3>
              <div className={styles.inputGroupBlock}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <p className={styles.required}>{t('name')}</p>
                    <Field
                      name="name"
                      className={styles.input}
                      type="text"
                      placeholder={t('enterYourName')}
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => (
                        <div className={`${styles.error} ${msg ? styles.visible : ''}`}>{msg}</div>
                      )}
                    />
                  </label>
                </div>
                <div className={styles.row}>
                  <label className={styles.label}>
                    <p className={styles.required}>{t('email')}</p>
                    <Field
                      name="email"
                      className={styles.input}
                      type="email"
                      placeholder={t('enterYourEmail')}
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <div className={`${styles.error} ${msg ? styles.visible : ''}`}>{msg}</div>
                      )}
                    />
                  </label>
                  <label className={styles.label}>
                    <p className={styles.required}>{t('phoneNumber')}</p>
                    <Field
                      name="number"
                      as={NumberInput}
                      id="forNumber"
                      className={`${styles.input} ${styles.numberInput} ${
                        errors.number && touched.number ? styles.errorBorder : ''
                      }`}
                    />
                    <ErrorMessage
                      name="number"
                      render={(msg) => (
                        <div className={`${styles.error} ${msg ? styles.visible : ''}`}>{msg}</div>
                      )}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>
                  {phone}
                  <p className={styles.btnText}>{isSubmitting ? t('sending') : t('orderCall')}</p>
                </span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default FillForm

const phone = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1135_8671)">
      <path
        d="M7.45669 2.11351C7.14735 1.34013 6.39833 0.833008 5.5654 0.833008H2.76376C1.69797 0.833008 0.833984 1.69681 0.833984 2.76262C0.833984 11.822 8.17811 19.1663 17.2373 19.1663C18.3031 19.1663 19.1668 18.3023 19.1668 17.2364L19.1673 14.4343C19.1673 13.6013 18.6603 12.8524 17.887 12.5431L15.2018 11.4693C14.5071 11.1915 13.7162 11.3165 13.1414 11.7955L12.4484 12.3735C11.639 13.048 10.4482 12.9944 9.70321 12.2494L7.75181 10.2961C7.00685 9.55115 6.9518 8.36123 7.62625 7.55186L8.20413 6.85887C8.68311 6.28408 8.80928 5.4929 8.53141 4.7982L7.45669 2.11351Z"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1135_8671">
        <rect width="20" height="20" />
      </clipPath>
    </defs>
  </svg>
)
