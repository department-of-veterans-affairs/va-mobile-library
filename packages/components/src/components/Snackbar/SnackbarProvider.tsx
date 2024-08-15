import { ToastProvider } from 'react-native-toast-notifications'
import React, { ReactNode, createContext, useState } from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Snackbar, SnackbarProps } from './Snackbar'
import { useSnackbarDefaultOffset } from './useSnackbarDefaultOffset'

type SnackbarContextType = {
  offset: number
  setOffset: (newOffset: number) => void
  setDuration: (newDuration: number) => void
}

export const SNACKBAR_DURATIONS = {
  DEFAULT: 1000000000000,
  SCREEN_READER: 5000
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
)

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // TODO: Check global default setting
  const defaultOffset = useSnackbarDefaultOffset()
  const [offset, setOffset] = useState(defaultOffset)
  const [duration, setDuration] = useState(SNACKBAR_DURATIONS.DEFAULT)

  return (
    <SnackbarContext.Provider value={{ offset, setOffset, setDuration }}>
      <ToastProvider
        animationDuration={100}
        duration={duration} // Essentially indefinite until dismissed
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
