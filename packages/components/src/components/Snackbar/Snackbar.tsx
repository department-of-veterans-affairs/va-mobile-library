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

//
// TODO: May need to move the following doc to the custom render to show in Storybook
//

/**
 * To use SnackbarProvider, your app must have a global.d.ts which you can copy the following into:
 * ```
 * type SnackbarType = import('@department-of-veterans-affairs/mobile-component-library').SnackbarType
 * // eslint-disable-next-line no-var
 * declare var snackbar: SnackbarType
 * ```
 * then add SnackbarProvider in App.tsx (or similar foundational file) level with your app rendering:
 * ```
 * <>
 *   <App />
 *   <SnackbarProvider />
 * </>
 * ```
 * 
 * This config will allow it to be called anywhere including outside React components.
 * 
 * The Snackbar remains open indefinitely. App configuration should ensure it is dismissed on navigation.
 */
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  // globalSnackbar,
}) => {
  return (
    <Toast
      animationDuration={100}
      duration={1000000000000} // Essentially indefinite until dismissed
      ref={(ref) => ((globalThis.snackbar as ToastContainer | null) = ref)}
      swipeEnabled={false}
    />
  )
}
