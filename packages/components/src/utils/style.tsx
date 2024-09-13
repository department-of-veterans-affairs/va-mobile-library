import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'

import { useTheme } from './hooks/useTheme'

// Export related hooks
export { useColorScheme } from './hooks/useColorScheme'
export { useTheme } from './hooks/useTheme'

/** Function to prefill base gray colors */
export function BaseColor() {
  const theme = useTheme()
  return theme.vadsColorForegroundDefault
}

/**
 * Convenience function for handling TouchableOpacity styling on Pressable component
 * @param styles - RN styling to apply to Pressable component besides on press opacity
 */
export function PressableOpacityStyle(
  styles?: ViewStyle,
): (pressed: PressableStateCallbackType) => StyleProp<ViewStyle> {
  if (styles) {
    return ({ pressed }) => [{ opacity: pressed ? 0.2 : 1, ...styles }]
  }

  return ({ pressed }) => [{ opacity: pressed ? 0.2 : 1 }]
}
