import { useContext } from 'react'
import * as Toast from 'react-native-toast-notifications'
import {
  DEFAULT_OFFSET,
  modifyToastOptions,
} from '../components/Snackbar/Snackbar'
import { SnackbarContext } from '../components/Snackbar/SnackbarProvider'

export function useSnackbar() {
  const toast = Toast.useToast()
  const context = useContext(SnackbarContext)

  if (!context) {
    throw new Error('useSnackbar must be used within an SnackbarProvider')
  }

  const { offset, setOffset } = context

  /** Modified toast.show() function that sets the offset if passed */
  const show = (
    message: string,
    snackbarOptions?: modifyToastOptions['data'],
  ) => {
    if (snackbarOptions?.offset) {
      setOffset(snackbarOptions.offset)
    } else if (offset !== DEFAULT_OFFSET) {
      setOffset(DEFAULT_OFFSET)
    }
    toast.show(message, { data: snackbarOptions })
  }

  return {
    show,
    hide: toast.hide,
  }
}
