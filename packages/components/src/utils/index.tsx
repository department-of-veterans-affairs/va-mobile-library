import {
  ColorSchemeName,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { useSyncExternalStore } from 'react'

/** Function for web Storybook to override setting colorScheme based on UI toggle button */
export function webStorybookColorScheme(): ColorSchemeName {
  // If not web Storybook, set with RN useColorScheme hook
  if (!process.env.STORYBOOK_WEB) {
    return null
  }
  
  // Mimicking RN's useColorScheme hook, but using storybook-dark-mode's setting of HTML top-body class to light/dark
  return useSyncExternalStore(callback => {
    window.top!.addEventListener("click", callback);
    return () => window.top!.removeEventListener("click", callback);
  },
  (): ColorSchemeName => window.top ? window.top.document.body.className as ColorSchemeName : null,)
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
