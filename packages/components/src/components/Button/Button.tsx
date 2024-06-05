import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableStateCallbackType,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'
import React from 'react'

import { useColorScheme } from '../../utils'

export enum ButtonVariants {
  Base = 'Base',
  BaseSecondary = 'BaseSecondary',
  Destructive = 'Destructive',
  Primary = 'Primary',
  Secondary = 'Secondary',
  White = 'White',
}

export type ButtonProps = {
  /** Text appearing in the button */
  label: string
  /** Handler function called when button is pressed */
  onPress: () => void
  /** Optional text to use as the accessibility hint */
  a11yHint?: string
  /** Optional accessibility override label */
  a11yLabel?: string
  /** Optional button variant. Defaults to primary if none specified  */
  buttonType?: ButtonVariants
  /** Optional test ID for test suites */
  testID?: string
  /** Optional pressed state test suites */
  testOnlyPressed?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  a11yHint,
  a11yLabel,
  buttonType,
  testID,
  testOnlyPressed,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  let bgColor: string,
    bgColorPressed: string,
    textColor: string,
    textColorPressed: string,
    borderWidth: number = 0,
    borderColor: string = 'none',
    borderColorPressed: string = 'none'

  switch (buttonType) {
    case ButtonVariants.Base:
      bgColor = Colors.vadsColorActionSurfaceBaseOnLight
      bgColorPressed = Colors.vadsColorActionSurfaceBaseActiveOnLight
      textColor = Colors.vadsColorForegroundInverseOnLight
      textColorPressed = Colors.vadsColorForegroundInverseOnLight

      if (isDarkMode) {
        bgColor = Colors.vadsColorActionSurfaceBaseOnDark
        bgColorPressed = Colors.vadsColorActionSurfaceBaseActiveOnDark
        textColor = Colors.vadsColorForegroundInverseOnDark
        textColorPressed = Colors.vadsColorForegroundInverseOnDark
      }
      break
    case ButtonVariants.BaseSecondary:
      bgColor = 'transparent'
      bgColorPressed = 'transparent'
      borderColor = Colors.vadsColorActionBorderBaseOnLight
      borderColorPressed = Colors.vadsColorActionBorderBaseActiveOnLight
      textColor = Colors.vadsColorActionForegroundBaseOnLight
      textColorPressed = Colors.vadsColorActionForegroundBaseActiveOnLight
      borderWidth = 2

      if (isDarkMode) {
        borderColor = Colors.vadsColorActionBorderBaseOnDark
        borderColorPressed = Colors.vadsColorActionBorderBaseActiveOnDark
        textColor = Colors.vadsColorActionForegroundBaseOnDark
        textColorPressed = Colors.vadsColorActionForegroundBaseActiveOnDark
      }
      break
    case ButtonVariants.Destructive:
      bgColor = Colors.vadsColorActionSurfaceDestructiveOnLight
      bgColorPressed = Colors.vadsColorActionSurfaceDestructiveActiveOnLight
      textColor = Colors.vadsColorForegroundInverseOnLight
      textColorPressed = Colors.vadsColorForegroundInverseOnLight

      if (isDarkMode) {
        bgColor = Colors.vadsColorActionSurfaceDestructiveOnDark
        bgColorPressed = Colors.vadsColorActionSurfaceDestructiveActiveOnDark
        textColor = Colors.vadsColorForegroundInverseOnDark
        textColorPressed = Colors.vadsColorForegroundInverseOnDark
      }
      break
    case ButtonVariants.Secondary:
      bgColor = 'transparent'
      bgColorPressed = 'transparent'
      borderColor = Colors.vadsColorActionBorderDefaultOnLight
      borderColorPressed = Colors.vadsColorActionBorderDefaultActiveOnLight
      textColor = Colors.vadsColorActionForegroundDefaultOnLight
      textColorPressed = Colors.vadsColorActionForegroundDefaultActiveOnLight
      borderWidth = 2

      if (isDarkMode) {
        borderColor = Colors.vadsColorActionBorderDefaultOnDark
        borderColorPressed = Colors.vadsColorActionBorderDefaultActiveOnDark
        textColor = Colors.vadsColorActionForegroundDefaultOnDark
        textColorPressed = Colors.vadsColorActionForegroundDefaultActiveOnDark
      }
      break
    case ButtonVariants.White:
      bgColor = Colors.vadsColorBaseLightest
      bgColorPressed = Colors.uswdsSystemColorGray30
      textColor = Colors.vadsColorBlack
      textColorPressed = Colors.vadsColorBlack
      break
    default:
      bgColor = Colors.vadsColorActionSurfaceDefaultOnLight
      bgColorPressed = Colors.vadsColorActionSurfaceDefaultActiveOnLight
      textColor = Colors.vadsColorForegroundInverseOnLight
      textColorPressed = Colors.vadsColorForegroundInverseOnLight

      if (isDarkMode) {
        bgColor = Colors.vadsColorActionSurfaceDefaultOnDark
        bgColorPressed = Colors.vadsColorActionSurfaceDefaultActiveOnDark
        textColor = Colors.vadsColorForegroundInverseOnDark
        textColorPressed = Colors.vadsColorForegroundInverseOnDark
      }
  }

  /**
   * Get button styling based on pressed state
   * @param pressed - boolean for pressed state
   * @returns ViewStyle for background
   */
  const getBackgroundStyle = ({
    pressed,
  }: PressableStateCallbackType): ViewStyle => ({
    width: '100%', // Ensure Button fills horizontal space, regardless of flexing content
    alignItems: 'center',
    padding: 10,
    backgroundColor: pressed ? bgColorPressed : bgColor,
    borderRadius: 4,
    borderWidth,
    borderColor: pressed ? borderColorPressed : borderColor,
  })

  /**
   * Get text styling based on pressed state
   * @param pressed - boolean for pressed state
   * @returns TextStyle for text
   */
  const getTextStyle = (pressed: boolean): TextStyle => {
    // TODO: Replace with typography tokens
    const font: TextStyle = {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 20,
      lineHeight: 30,
    }

    return {
      ...font,
      color: pressed ? textColorPressed : textColor,
    }
  }

  return (
    <Pressable
      style={getBackgroundStyle}
      onPress={onPress}
      accessibilityHint={a11yHint}
      role="button"
      accessible={true}
      aria-label={a11yLabel}
      testID={testID || label}
      testOnly_pressed={testOnlyPressed}>
      {({ pressed }: PressableStateCallbackType) => (
        <Text style={getTextStyle(pressed)}>{label}</Text>
      )}
    </Pressable>
  )
}
