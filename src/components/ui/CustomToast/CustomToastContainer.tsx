'use client'

import React, { useState, useEffect } from 'react'
import styles from './CustomToast.module.css'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  icon?: React.ReactNode
  duration?: number
}

interface CustomToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const CustomToastContainer: React.FC<CustomToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className={styles.customToastContainer}>
      {toasts.map((toast, index) => (
        <CustomToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
          style={{ '--index': index } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

interface CustomToastItemProps {
  toast: Toast
  onRemove: () => void
  style?: React.CSSProperties
}

const CustomToastItem: React.FC<CustomToastItemProps> = ({ toast, onRemove, style }) => {
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemoving(true)
      setTimeout(onRemove, 300) // Видаляємо після анімації
    }, toast.duration || 4000)

    return () => clearTimeout(timer)
  }, [toast.duration, onRemove])

  const handleClick = () => {
    if (!isRemoving) {
      setIsRemoving(true)
      setTimeout(onRemove, 300)
    }
  }

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${isRemoving ? styles.removing : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer', ...style }}
    >
      <div className={styles.iconContainer}>
        {toast.icon || (
          <svg
            className={styles.defaultIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {toast.type === 'success' && (
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {toast.type === 'error' && (
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {toast.type === 'warning' && (
              <path
                d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 003.17 21H20.83A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {toast.type === 'info' && (
              <path
                d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.message}>{toast.message}</p>
      </div>
    </div>
  )
}

export default CustomToastContainer
