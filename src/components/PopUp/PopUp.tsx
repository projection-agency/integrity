'use client'

import React, { useState, useEffect } from 'react'
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

  // lock/unlock body scroll depending on isOpen
  // useEffect(() => {
  //   if (!isOpen) return

  //   const body = document.body
  //   const scrollY = window.scrollY

  //   const prev = {
  //     overflow: body.style.overflow,
  //     touchAction: body.style.touchAction,
  //     position: body.style.position,
  //     top: body.style.top,
  //     left: body.style.left,
  //     right: body.style.right,
  //   }

  //   body.style.overflow = 'hidden'
  //   body.style.touchAction = 'none'
  //   body.style.position = 'fixed'
  //   body.style.top = `-${scrollY}px`
  //   body.style.left = '0'
  //   body.style.right = '0'

  //   return () => {
  //     body.style.overflow = prev.overflow
  //     body.style.touchAction = prev.touchAction
  //     body.style.position = prev.position
  //     body.style.top = prev.top
  //     body.style.left = prev.left
  //     body.style.right = prev.right
  //     window.scrollTo(0, scrollY)
  //   }
  // }, [isOpen])

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
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="close">
          <ClosedIcon />
        </button>

        {/* ================== FORM STATE ================== */}
        <Formik
          key={resetKey}
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
          <PopUpDownload
            isOpen={true}
            onClose={handleClose}
            onDownload={onDownload ?? (() => {})}
          />
        )}
      </div>
    </div>
  )
}
