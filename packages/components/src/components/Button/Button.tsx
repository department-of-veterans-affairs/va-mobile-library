import { Colors } from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableStateCallbackType,
  Text,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native'
import React from 'react'

import { webStorybookColorScheme } from '../../utils'

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
  const colorScheme = webStorybookColorScheme() || useColorScheme()
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
      bgColor = Colors.grayMedium
      bgColorPressed = Colors.uswdsGray80
      textColor = Colors.grayLightest
      textColorPressed = Colors.grayLightest

      if (isDarkMode) {
        bgColor = Colors.grayLightest
        bgColorPressed = Colors.uswdsGray30
        textColor = Colors.black
        textColorPressed = Colors.black
      }
      break
    case ButtonVariants.BaseSecondary:
      bgColor = 'transparent'
      bgColorPressed = 'transparent'
      borderColor = Colors.grayMedium
      borderColorPressed = Colors.uswdsGray80
      textColor = Colors.grayMedium
      textColorPressed = Colors.uswdsGray80
      borderWidth = 2

      if (isDarkMode) {
        borderColor = Colors.grayLightest
        borderColorPressed = Colors.uswdsGray30
        textColor = Colors.grayLightest
        textColorPressed = Colors.uswdsGray30
      }
      break
    case ButtonVariants.Destructive:
      bgColor = Colors.secondaryDark
      bgColorPressed = Colors.uswdsRedVivid80
      textColor = Colors.grayLightest
      textColorPressed = Colors.grayLightest

      if (isDarkMode) {
        bgColor = Colors.uswdsRedVivid40
        bgColorPressed = Colors.secondaryLightest
        textColor = Colors.black
        textColorPressed = Colors.black
      }
      break
    case ButtonVariants.Secondary:
      bgColor = 'transparent'
      bgColorPressed = 'transparent'
      borderColor = Colors.primary
      borderColorPressed = Colors.primaryDarker
      textColor = Colors.primary
      textColorPressed = Colors.primaryDarker
      borderWidth = 2

      if (isDarkMode) {
        borderColor = Colors.uswdsBlueVivid30
        borderColorPressed = Colors.white
        textColor = Colors.uswdsBlueVivid30
        textColorPressed = Colors.white
      }
      break
    case ButtonVariants.White:
      bgColor = Colors.grayLightest
      bgColorPressed = Colors.uswdsGray30
      textColor = Colors.black
      textColorPressed = Colors.black
      break
    default:
      bgColor = Colors.primary
      bgColorPressed = Colors.primaryDarker
      textColor = Colors.grayLightest
      textColorPressed = Colors.grayLightest

      if (isDarkMode) {
        bgColor = Colors.uswdsBlueVivid30
        bgColorPressed = Colors.primaryAltLightest
        textColor = Colors.black
        textColorPressed = Colors.black
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
    alignSelf: 'stretch',
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
