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

// Оновлена схема валідації
const validationSchema = Yup.object({
  name: Yup.string().required('Enter your name'),
  email: Yup.string().email('Invalid email format').required('Enter your email'),
  number: Yup.string()
    .required('Enter your phone number')
    .matches(/^\+?[0-9\s-]+$/, 'Invalid phone number format'),
  county: Yup.string(),
})

const FillForm = () => {
  const { showSuccessToast, showErrorToast } = useCustomToastContext()

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
      showSuccessToast('Form sent successfully!')
      resetForm()
    } catch (error) {
      console.error('Error:', error)
      showErrorToast('Failed to send form. Please try again.')
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
                  <span className={styles.text}>FILL</span>
                  <Image
                    src="/images/icons/report.svg"
                    alt="Report"
                    className={styles.titleIcon}
                    width={24}
                    height={24}
                  />
                </div>

                <span className={styles.text}>OUT THE FORM</span>
              </h3>
              <div className={styles.inputGroupBlock}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <p className={styles.required}>Name</p>
                    <Field
                      name="name"
                      className={styles.input}
                      type="text"
                      placeholder="Enter your name"
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
                    <p className={styles.required}>Email</p>
                    <Field
                      name="email"
                      className={styles.input}
                      type="email"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <div className={`${styles.error} ${msg ? styles.visible : ''}`}>{msg}</div>
                      )}
                    />
                  </label>
                  <label className={styles.label}>
                    <p className={styles.required}>Phone Number</p>
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
                  <p className={styles.btnIcon}>{isSubmitting ? 'Sending...' : 'Order a call'}</p>
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
