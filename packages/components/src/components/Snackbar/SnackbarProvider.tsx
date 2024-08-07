import React, { createContext, useState, ReactNode } from 'react'

import { ToastProvider } from 'react-native-toast-notifications'
import { Snackbar, DEFAULT_OFFSET } from './Snackbar'

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
  const [offset, setOffset] = useState(DEFAULT_OFFSET)

  return (
    <SnackbarContext.Provider value={{ offset, setOffset }}>
      <ToastProvider
        animationDuration={100}
        duration={1000000000000} // Essentially indefinite until dismissed
        offset={offset}
        placement="bottom"
        renderToast={(toast) => <Snackbar {...toast} />}
        swipeEnabled={false}>
        {children}
      </ToastProvider>
    </SnackbarContext.Provider>
  )
}
