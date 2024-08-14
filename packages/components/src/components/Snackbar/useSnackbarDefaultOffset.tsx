import { useSafeAreaInsets } from 'react-native-safe-area-context'

/**
 * Returns default Snackbar offset depending on safe area bottom inset
 */
export function useSnackbarDefaultOffset() {
  const insets = useSafeAreaInsets()

  if (!insets) {
    throw new Error(
      'useSnackbarDefaultOffset must be used within a SafeAreaProvider. Use SnackbarProviderWithSafeArea or add a SafeAreaProvider with react-native-safe-area-context.',
    )
  }

  const { bottom } = insets
  return bottom === 0 ? 60 : 60 + bottom
}
