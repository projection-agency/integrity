'use client'

import React, { createContext, useContext } from 'react'
import { useCustomToast } from '@/hooks/useCustomToast'
import CustomToastContainer from '@/components/ui/CustomToast/CustomToastContainer'

interface CustomToastContextType {
  showSuccessToast: (
    message: string,
    options?: { duration?: number; icon?: React.ReactNode },
  ) => string
  showErrorToast: (
    message: string,
    options?: { duration?: number; icon?: React.ReactNode },
  ) => string
  showInfoToast: (
    message: string,
    options?: { duration?: number; icon?: React.ReactNode },
  ) => string
  showWarningToast: (
    message: string,
    options?: { duration?: number; icon?: React.ReactNode },
  ) => string
  removeToast: (id: string) => void
  clearAllToasts: () => void
}

const CustomToastContext = createContext<CustomToastContextType | undefined>(undefined)

export const useCustomToastContext = () => {
  const context = useContext(CustomToastContext)
  if (!context) {
    throw new Error('useCustomToastContext must be used within a CustomToastProvider')
  }
  return context
}

interface CustomToastProviderProps {
  children: React.ReactNode
}

export const CustomToastProvider: React.FC<CustomToastProviderProps> = ({ children }) => {
  const toastUtils = useCustomToast()

  return (
    <CustomToastContext.Provider value={toastUtils}>
      {children}
      <CustomToastContainer toasts={toastUtils.toasts} onRemove={toastUtils.removeToast} />
    </CustomToastContext.Provider>
  )
}
