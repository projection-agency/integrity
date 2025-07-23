'use client'

import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { object, string } from 'yup'
import styles from './PopUp.module.css'
import { CalcIcon, ClosedIcon, DownloadIcon, SendIcon } from './Icon'
import PopUpDownload from './PopUpDownload'

type PopUpProps = {
  isOpen: boolean
  onClose: () => void
  onDownload?: () => void
}

export default function PopUp({ isOpen, onClose, onDownload }: PopUpProps) {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const scrollY = window.scrollY
    const body = document.body

    const prevOverflow = body.style.overflow
    const prevTouchAction = body.style.touchAction
    const prevPosition = body.style.position
    const prevTop = body.style.top
    const prevLeft = body.style.left
    const prevRight = body.style.right

    body.style.overflow = 'hidden'
    body.style.touchAction = 'none'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'

    return () => {
      body.style.overflow = prevOverflow
      body.style.touchAction = prevTouchAction
      body.style.position = prevPosition
      body.style.top = prevTop
      body.style.left = prevLeft
      body.style.right = prevRight
      window.scrollTo(0, scrollY)
    }
  }, [])

  if (!isOpen) return null

  const initialValues = { name: '', email: '' }
  const validationSchema = object({
    name: string().required('Enter your name'),
    email: string().email('Invalid email').required('Enter your email'),
  })
  const onSubmit = () => {
    setSent(true)
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="close">
          <ClosedIcon />
        </button>

        {/* ================== FORM STATE ================== */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
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
                      typeof errors !== 'undefined' && errors.name ? styles.labelError : ''
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
                          className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
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
                      typeof errors !== 'undefined' && errors.email ? styles.labelError : ''
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
                          className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
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

              <button type="submit" className={styles.actionBtn}>
                <SendIcon />
                Send
              </button>
            </Form>
          )}
        </Formik>

        {/* ================== THANK-YOU STATE ================== */}
        {sent && (
          <PopUpDownload isOpen={true} onClose={onClose} onDownload={onDownload ?? (() => {})} />
        )}
      </div>
    </div>
  )
}
