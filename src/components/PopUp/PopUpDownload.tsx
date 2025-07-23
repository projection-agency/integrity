'use client'

import React, { useEffect } from 'react'
import styles from './PopUpDownload.module.css'
import { DownloadIcon, CalcIcon, ClosedIcon as CloseIcon } from './Icon'

type PopUpDownloadProps = {
  isOpen: boolean
  onClose: () => void
  onDownload: () => void
}

export default function PopUpDownload({ isOpen, onClose, onDownload }: PopUpDownloadProps) {
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

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="close">
          <CloseIcon />
        </button>

        {/* <div className={styles.thanksWrap}> */}
        <span className={styles.calcIcon}>
          <CalcIcon />
        </span>
        <div className={styles.thanksBlock}>
          <div className={styles.thanksTextPop}>THANK YOU</div>
          <div className={styles.thanksTextPop}>CHECK YOUR E-MAIL</div>
          {/* <p className={styles.thanksTextPop}>{`THANK YOU\nCHECK YOUR E-MAIL`}</p> */}
        </div>
        {/* </div> */}

        <button className={styles.actionBtn} onClick={onDownload} type="button">
          <span className={styles.iconWrap}>
            <DownloadIcon />
          </span>
          Download
        </button>
      </div>
    </div>
  )
}
