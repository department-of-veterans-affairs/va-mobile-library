import React, { ReactNode, createContext, useState } from 'react'

import { DEFAULT_OFFSET, Snackbar } from './Snackbar'
import { ToastProvider } from 'react-native-toast-notifications'

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
