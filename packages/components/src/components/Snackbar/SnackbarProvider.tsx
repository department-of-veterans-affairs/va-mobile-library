import { FC, ReactNode, createContext, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ToastProvider } from 'react-native-toast-notifications'

import { Snackbar, SnackbarProps } from './Snackbar'
import { useSnackbarDefaultOffset } from './useSnackbarDefaultOffset'

type SnackbarContextType = {
  offset: number
  setOffset: (newOffset: number) => void
}

export const SNACKBAR_DURATIONS = {
  DEFAULT: 2147483646, // Essentially indefinite until dismissed (23 days, limited by 32-bit int)
  SCREEN_READER: 5000,
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
)

export const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: Check global default setting
  const [offset, setOffset] = useState(useSnackbarDefaultOffset())

  return (
    <SnackbarContext.Provider value={{ offset, setOffset }}>
      <ToastProvider
        animationDuration={100}
        duration={SNACKBAR_DURATIONS.DEFAULT}
        offset={offset}
        placement="bottom"
        renderToast={(toast) => <Snackbar {...(toast as SnackbarProps)} />}
        swipeEnabled={false}>
        {children}
      </ToastProvider>
    </SnackbarContext.Provider>
  )
}

export const SnackbarProviderWithSafeArea: FC<{
  children: ReactNode
}> = ({ children }) => (
  <SafeAreaProvider>
    <SnackbarProvider>{children}</SnackbarProvider>
  </SafeAreaProvider>
)
