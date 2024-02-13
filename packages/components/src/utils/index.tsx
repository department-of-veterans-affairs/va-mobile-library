import {
  ColorSchemeName,
  PressableStateCallbackType,
  useColorScheme as RNUseColorScheme,
  StyleProp,
  ViewStyle,
} from 'react-native'

/** Handles return of color scheme based on platform */
export function useColorScheme(): ColorSchemeName {
  // If not web Storybook, set with RN useColorScheme hook
  if (!process.env.STORYBOOK_WEB) {
    return RNUseColorScheme()
  } else {
    try {
      const webStorybookColorScheme =
        require('./storybook').webStorybookColorScheme // eslint-disable-line
      return webStorybookColorScheme()
    } catch (error) {
      return null
    }
  }
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
