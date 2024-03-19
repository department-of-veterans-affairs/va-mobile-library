import {
  AccessibilityInfo,
  ColorSchemeName,
  PressableStateCallbackType,
  useColorScheme as RNUseColorScheme,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import { Colors as TokenColors } from '@department-of-veterans-affairs/mobile-tokens'
import React, { FC, useEffect, useState } from 'react'

/** Function to prefill base gray colors */
export function Base() {
  const colorScheme = useColorScheme()

  return colorScheme === 'dark' ? TokenColors.grayLightest : TokenColors.grayDark
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
      setScreenReaderEnabled(isEnabled);
    };

    // Initiate with current screen reader status
    AccessibilityInfo.isScreenReaderEnabled().then(updateScreenReaderStatus)

    // Subscribe to screen reader status changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      updateScreenReaderStatus
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

export type SpacerProps = {
  /** Size of spacer, default 10 */
  size?: number
  /** True for horizontal spacing */
  horizontal?: boolean
}

/** Convenience component for handling spacing without managing margin/padding between elements */
export const Spacer: FC<SpacerProps> = ({
  size = 10,
  horizontal = false
}) => {
  return (
    <View
      style={{
        width: horizontal ? size : 'auto',
        height: !horizontal ? size : 'auto',
      }}
    />
  )
}