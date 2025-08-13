import { useState, useCallback } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  icon?: React.ReactNode
  duration?: number
}

export const useCustomToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showSuccessToast = useCallback(
    (message: string, options?: { duration?: number; icon?: React.ReactNode }) => {
      return addToast({
        message,
        type: 'success',
        duration: options?.duration || 4000,
        icon: options?.icon,
      })
    },
    [addToast],
  )

  const showErrorToast = useCallback(
    (message: string, options?: { duration?: number; icon?: React.ReactNode }) => {
      return addToast({
        message,
        type: 'error',
        duration: options?.duration || 5000,
        icon: options?.icon,
      })
    },
    [addToast],
  )

  const showInfoToast = useCallback(
    (message: string, options?: { duration?: number; icon?: React.ReactNode }) => {
      return addToast({
        message,
        type: 'info',
        duration: options?.duration || 4000,
        icon: options?.icon,
      })
    },
    [addToast],
  )

  const showWarningToast = useCallback(
    (message: string, options?: { duration?: number; icon?: React.ReactNode }) => {
      return addToast({
        message,
        type: 'warning',
        duration: options?.duration || 4000,
        icon: options?.icon,
      })
    },
    [addToast],
  )

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
    removeToast,
    clearAllToasts,
  }
}
