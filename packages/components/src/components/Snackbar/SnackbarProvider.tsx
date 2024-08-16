import React, { ReactNode, createContext, useState } from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ToastProvider } from 'react-native-toast-notifications'

import { Snackbar, SnackbarProps } from './Snackbar'
import { useSnackbarDefaultOffset } from './useSnackbarDefaultOffset'

type SnackbarContextType = {
  offset: number
  duration: number
  setDuration: (newDuration: number) => void
  setOffset: (newOffset: number) => void
}

export const SNACKBAR_DURATIONS = {
  DEFAULT: 1000000000000, // Essentially indefinite until dismissed
  SCREEN_READER: 5000,
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
)

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // TODO: Check global default setting
  const [offset, setOffset] = useState(useSnackbarDefaultOffset())
  const [duration, setDuration] = useState(SNACKBAR_DURATIONS.DEFAULT)

  return (
    <SnackbarContext.Provider
      value={{ offset, duration, setDuration, setOffset }}>
      <ToastProvider
        animationDuration={100}
        duration={duration}
        offset={offset}
        placement="bottom"
        renderToast={(toast) => <Snackbar {...(toast as SnackbarProps)} />}
        swipeEnabled={false}>
        {children}
      </ToastProvider>
    </SnackbarContext.Provider>
  )
}

export const SnackbarProviderWithSafeArea: React.FC<{
  children: ReactNode
}> = ({ children }) => (
  <SafeAreaProvider>
    <SnackbarProvider>{children}</SnackbarProvider>
  </SafeAreaProvider>
)
