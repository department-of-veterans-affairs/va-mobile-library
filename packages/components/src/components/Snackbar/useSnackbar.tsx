import { useCallback, useContext, useMemo } from 'react'

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

  const { offset, setOffset } = context

  const show = useCallback(
    (message: string, snackbarOptions?: SnackbarOptions) => {
      const customOffset = snackbarOptions?.offset

      // Custom offset if provided, else default
      const newOffset =
        customOffset === undefined ? defaultOffset : customOffset

      // Only call setOffset if different from current to avoid re-render
      if (newOffset !== offset) {
        setOffset(newOffset)
      }

      // Auto-dismiss if screen reader is on and there is no action button
      const duration =
        screenReaderEnabled && !snackbarOptions?.onActionPressed
          ? SNACKBAR_DURATIONS.SCREEN_READER
          : SNACKBAR_DURATIONS.DEFAULT

      toast.hideAll()
      toast.show(message, { data: snackbarOptions, duration })
    },
    [defaultOffset, offset, screenReaderEnabled, setOffset, toast],
  )

  return useMemo(
    () => ({
      show,
      hide: toast.hideAll,
      isOpen: toast.isOpen,
    }),
    [show, toast],
  )
}
