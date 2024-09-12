import {
  AccessibilityInfo,
  ColorSchemeName,
  PressableStateCallbackType,
  useColorScheme as RNUseColorScheme,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { useEffect, useState } from 'react'

import { useTheme } from './useTheme'

/** Function to prefill base gray colors */
export function BaseColor() {
  const theme = useTheme()
  return theme.vadsColorForegroundDefault
}

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
 * Hook to monitor screen reader status
 * @returns True when the screen reader is on, else false
 */
export function useIsScreenReaderEnabled(): boolean {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false)

  useEffect(() => {
    // Function to update state based on the screen reader status
    const updateScreenReaderStatus = (isEnabled: boolean) => {
      setScreenReaderEnabled(isEnabled)
    }

    // Initiate with current screen reader status
    AccessibilityInfo.isScreenReaderEnabled().then(updateScreenReaderStatus)

    // Subscribe to screen reader status changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      updateScreenReaderStatus,
    )

    // Cleanup subscription on component unmount
    return () => subscription.remove()
  }, [screenReaderEnabled])

  return screenReaderEnabled
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
