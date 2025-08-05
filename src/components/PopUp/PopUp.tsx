'use client'

import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { object, string } from 'yup'
import styles from './PopUp.module.css'
import { CalcIcon, ClosedIcon, SendIcon } from './Icon'
import PopUpDownload from './PopUpDownload'

type PopUpProps = {
  isOpen: boolean
  onClose: () => void
  onDownload?: () => void
}

export default function PopUp({ isOpen, onClose, onDownload }: PopUpProps) {
  const [sent, setSent] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const handleClose = () => {
    setSent(false)
    setResetKey((k) => k + 1)
    onClose()
  }

  if (!isOpen) return null

  const initialValues = { name: '', email: '' }

  const validationSchema = object({
    name: string().required('Enter your name'),
    email: string().email('Invalid email').required('Enter your email'),
  })

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const response = await fetch('/api/get-calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
          'x-api-secret': process.env.NEXT_PUBLIC_API_SECRET!,
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.status}`)
      }

      const result = await response.json()
      console.log('Success:', result)
      setSent(true)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="close">
          <ClosedIcon />
        </button>

        <Formik
          key={resetKey}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <>
              <Form className={sent ? styles.hidden : styles.form}>
                <div className={styles.header}>
                  <div className={styles.titleRow}>
                    <span className={styles.headerText}>GET A CALCULATOR</span>
                    <span className={styles.calcIconTitle}>
                      <CalcIcon />
                    </span>
                  </div>
                  <span className={styles.headerTextBusiness}>FOR YOUR BUSINESS</span>
                </div>
                <div className={styles.formGroupBlock}>
                  <div className={styles.formGroup}>
                    <label
                      className={`${styles.label} ${
                        errors.name && touched.name ? styles.labelError : ''
                      }`}
                      htmlFor="name"
                    >
                      <span className={styles.required}>Name</span>
                    </label>
                    <Field name="name">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            id="name"
                            placeholder="Enter your name"
                            className={`${styles.input} ${
                              meta.touched && meta.error ? styles.inputError : ''
                            }`}
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className={styles.errorMessage}>{meta.error}</div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>

                  <div className={styles.formGroup}>
                    <label
                      className={`${styles.label} ${
                        errors.email && touched.email ? styles.labelError : ''
                      }`}
                      htmlFor="email"
                    >
                      <span className={styles.required}>Email</span>
                    </label>
                    <Field name="email">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`${styles.input} ${
                              meta.touched && meta.error ? styles.inputError : ''
                            }`}
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className={styles.errorMessage}>{meta.error}</div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                </div>

                <button type="submit" className={styles.actionBtn} disabled={isSubmitting}>
                  <SendIcon />
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </Form>

              {sent && (
                <PopUpDownload
                  isOpen={true}
                  onClose={handleClose}
                  onDownload={onDownload ?? (() => {})}
                />
              )}
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}
