import { useContext } from 'react'

import * as Toast from 'react-native-toast-notifications'

import { SnackbarContext } from './SnackbarProvider'
import { modifyToastOptions } from './Snackbar'
import { useSnackbarDefaultOffset } from './useSnackbarDefaultOffset'

/**
 * Hook to manipulate the Snackbar with `show`, `hide`, or `isOpen` to query if already present
 *
 * Must be wrapped in `SnackbarProvider` to function
 */
export function useSnackbar() {
  const toast = Toast.useToast()
  const context = useContext(SnackbarContext)
  const defaultOffset = useSnackbarDefaultOffset()

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }

  const show = (
    message: string,
    snackbarOptions?: modifyToastOptions['data'],
  ) => {
    const { offset, setOffset } = context
    toast.hideAll()

    if (snackbarOptions?.offset) {
      setOffset(snackbarOptions.offset)
    } else if (offset !== defaultOffset) {
      setOffset(defaultOffset)
    }

    return toast.show(message, { data: snackbarOptions })
  }

  return {
    show,
    hide: toast.hideAll,
    isOpen: toast.isOpen,
  }
}
