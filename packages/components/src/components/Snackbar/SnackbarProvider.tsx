import React, { ReactNode, createContext, useState } from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Snackbar, SnackbarProps } from './Snackbar'
import { ToastProvider } from 'react-native-toast-notifications'
import { useSnackbarDefaultOffset } from './useSnackbarDefaultOffset'

type SnackbarContextType = {
  offset: number
  setOffset: (newOffset: number) => void
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

  return (
    <SnackbarContext.Provider value={{ offset, setOffset }}>
      <ToastProvider
        animationDuration={100}
        duration={1000000000000} // Essentially indefinite until dismissed
        offset={offset}
        placement="bottom"
        renderToast={(toast: SnackbarProps) => <Snackbar {...toast} />}
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
