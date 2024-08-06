import { useContext } from 'react'
import * as Toast from 'react-native-toast-notifications'
import {
  DEFAULT_OFFSET,
  modifyToastOptions,
} from '../components/Snackbar/Snackbar'
import { SnackbarContext } from '../components/Snackbar/SnackbarProvider'

/**
 * Passthrough of useToast hook which has been modified to allow for optional
 * offset setting
 */
export function useSnackbar() {
  const toast = Toast.useToast()
  const context = useContext(SnackbarContext)

  if (!context) {
    throw new Error('useSnackbar must be used within an SnackbarProvider')
  }

  const { offset, setOffset } = context

  const show = (
    message: string,
    snackbarOptions?: modifyToastOptions['data'],
  ) => {
    toast.hideAll()

    if (snackbarOptions?.offset) {
      setOffset(snackbarOptions.offset)
    } else if (offset !== DEFAULT_OFFSET) {
      setOffset(DEFAULT_OFFSET)
    }
    return toast.show(message, { data: snackbarOptions })
  }

  return {
    show,
    hide: toast.hideAll,
    isOpen: toast.isOpen,
  }
}
