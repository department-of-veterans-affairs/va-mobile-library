import { useContext } from 'react'

import * as Toast from 'react-native-toast-notifications'

import { SNACKBAR_DEFAULT_OFFSET, SnackbarOptions } from './Snackbar'
import { SnackbarContext } from './SnackbarProvider'

/**
 * Hook to manipulate the Snackbar with `show`, `hide`, or `isOpen` to query if already present
 *
 * Must be wrapped in `SnackbarProvider` to function
 */
export function useSnackbar() {
  const toast = Toast.useToast()
  const context = useContext(SnackbarContext)

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }

  const { offset, setOffset } = context

  const show = (message: string, snackbarOptions?: SnackbarOptions) => {
    toast.hideAll()

    if (snackbarOptions?.offset) {
      setOffset(snackbarOptions.offset)
    } else if (offset !== SNACKBAR_DEFAULT_OFFSET) {
      setOffset(SNACKBAR_DEFAULT_OFFSET)
    }

    return toast.show(message, { data: snackbarOptions })
  }

  return {
    show,
    hide: toast.hideAll,
    isOpen: toast.isOpen,
  }
}
