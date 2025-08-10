'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import 'react-phone-input-2/lib/style.css'
import styles from './FillForm.module.css'
import Image from 'next/image'
import NumberInput from '../NumberInput/NumberInput'
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { NumberIcon } from '../Icon/Icon'
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
      const response = await fetch('/api/order-call-full', {
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

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                <span>
                  <NumberIcon className={styles.btnIcon} />
                  <p className={styles.btnIcon}>{isSubmitting ? t('sending') : t('orderCall')}</p>
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
