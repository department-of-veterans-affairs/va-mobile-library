import { isIOS } from '../../utils/OSfunctions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useSnackbarDefaultOffset() {
  const insets = useSafeAreaInsets()

  if (!insets) {
    throw new Error(
      'useSnackbarDefaultOffset must be used within a SafeAreaProvider. Use SnackbarProviderWithSafeArea or add a SafeAreaProvider with react-native-safe-area-context.',
    )
  }

  const hasHomeButton = isIOS() && insets.bottom === 0
  return isIOS() ? (hasHomeButton ? 60 : 94) : 60
}
