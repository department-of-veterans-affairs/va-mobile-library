import { useContext } from 'react'

import * as Toast from 'react-native-toast-notifications'

import { SNACKBAR_DURATIONS, SnackbarContext } from './SnackbarProvider'
import { SnackbarOptions } from './Snackbar'
import { useIsScreenReaderEnabled } from '../../utils'
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
  const screenReaderEnabled = useIsScreenReaderEnabled()

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }

  const show = (message: string, snackbarOptions?: SnackbarOptions) => {
    const { offset, onActionPressed } = snackbarOptions || {}
    const { setOffset, setDuration } = context

    // Adjust offset if provided, otherwise set to default
    setOffset(offset ? offset : defaultOffset)

    // Auto-dismiss if screen reader is on and there is no action button
    setDuration(
      screenReaderEnabled && !onActionPressed
        ? SNACKBAR_DURATIONS.SCREEN_READER
        : SNACKBAR_DURATIONS.DEFAULT,
    )

    toast.hideAll()
    toast.show(message, { data: snackbarOptions })
  }

  return {
    show,
    hide: toast.hideAll,
    isOpen: toast.isOpen,
  }
}
