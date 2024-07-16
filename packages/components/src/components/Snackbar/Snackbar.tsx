import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast'
import React from 'react'
import Toast, { ToastType } from 'react-native-toast-notifications'
import ToastContainer from 'react-native-toast-notifications'

type modifyToastOptions = Omit<ToastOptions, 'data'> & {
  data?: {
    onActionPressed?: () => void
    isError?: boolean
    actionBtnText?: string
    isUndo?: boolean
  }
}

export type SnackbarType = Omit<ToastType, 'show' | 'update'> & {
  /** Shows a new toast. Returns id */
  show: (
    message: string | JSX.Element,
    toastOptions?: modifyToastOptions | undefined,
  ) => string
}

type SnackbarProviderProps = {
  globalSnackbar?: SnackbarType
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  // globalSnackbar,
}) => {
  return (
    <Toast
      animationDuration={100}
      duration={3000} // 1000000000000
      ref={(ref) => ((globalThis.snackbar as ToastContainer | null) = ref)}
      swipeEnabled={false}
    />
  )
}
