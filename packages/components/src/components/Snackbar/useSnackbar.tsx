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
    const { offset, setOffset } = context

    // Adjust offset if provided or reset to default
    const newOffset = snackbarOptions?.offset || defaultOffset

    // Only call setOffset if different from current to avoid re-render
    if (newOffset !== offset) {
      setOffset(newOffset)
    }

    // Auto-dismiss if screen reader is on and there is no action button
    const newDuration =
      screenReaderEnabled && !snackbarOptions?.onActionPressed
        ? SNACKBAR_DURATIONS.SCREEN_READER
        : SNACKBAR_DURATIONS.DEFAULT

    toast.hideAll()
    toast.show(message, { data: snackbarOptions, duration: newDuration })
  }

  return {
    show,
    hide: toast.hideAll,
    isOpen: toast.isOpen,
  }
}
