import * as DesignTokens from '@department-of-veterans-affairs/mobile-tokens'
import {
  Pressable,
  PressableStateCallbackType,
  Text,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native'
import React from 'react'

import { webStorybookColorScheme } from '../../utils/storybook'

export enum ButtonVariants {
  Base,
  BaseSecondary,
  Destructive,
  Primary,
  Secondary,
  White,
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
      bgColor = DesignTokens.colorGrayMedium
      bgColorPressed = DesignTokens.colorUswdsSystemColorGray80
      textColor = DesignTokens.colorGrayLightest
      textColorPressed = DesignTokens.colorGrayLightest

      if (isDarkMode) {
        bgColor = DesignTokens.colorGrayLightest
        bgColorPressed = DesignTokens.colorUswdsSystemColorGray30
        textColor = DesignTokens.colorBlack
        textColorPressed = DesignTokens.colorBlack
      }
      break
    case ButtonVariants.BaseSecondary:
      bgColor = DesignTokens.colorWhite
      bgColorPressed = DesignTokens.colorWhite
      borderColor = DesignTokens.colorGrayMedium
      borderColorPressed = DesignTokens.colorUswdsSystemColorGray80
      textColor = DesignTokens.colorGrayMedium
      textColorPressed = DesignTokens.colorUswdsSystemColorGray80
      borderWidth = 2

      if (isDarkMode) {
        bgColor = DesignTokens.colorBlack
        bgColorPressed = DesignTokens.colorBlack
        borderColor = DesignTokens.colorGrayLightest
        borderColorPressed = DesignTokens.colorUswdsSystemColorGray30
        textColor = DesignTokens.colorGrayLightest
        textColorPressed = DesignTokens.colorUswdsSystemColorGray30
      }
      break
    case ButtonVariants.Destructive:
      bgColor = DesignTokens.colorUswdsSystemColorRedVivid60
      bgColorPressed = DesignTokens.colorUswdsSystemColorRedVivid80
      textColor = DesignTokens.colorGrayLightest
      textColorPressed = DesignTokens.colorGrayLightest

      if (isDarkMode) {
        bgColor = DesignTokens.colorUswdsSystemColorRedVivid40
        bgColorPressed = DesignTokens.colorSecondaryLightest
        textColor = DesignTokens.colorBlack
        textColorPressed = DesignTokens.colorBlack
      }
      break
    case ButtonVariants.Secondary:
      bgColor = DesignTokens.colorWhite
      bgColorPressed = DesignTokens.colorWhite
      borderColor = DesignTokens.colorUswdsSystemColorBlueVivid60
      borderColorPressed = DesignTokens.colorUswdsSystemColorBlueWarmVivid80
      textColor = DesignTokens.colorUswdsSystemColorBlueVivid60
      textColorPressed = DesignTokens.colorUswdsSystemColorBlueWarmVivid80
      borderWidth = 2

      if (isDarkMode) {
        bgColor = DesignTokens.colorBlack
        bgColorPressed = DesignTokens.colorBlack
        borderColor = DesignTokens.colorUswdsSystemColorBlueVivid60
        borderColorPressed = DesignTokens.colorWhite
        textColor = DesignTokens.colorUswdsSystemColorBlueVivid30
        textColorPressed = DesignTokens.colorWhite
      }
      break
    case ButtonVariants.White:
      bgColor = DesignTokens.colorGrayLightest
      bgColorPressed = DesignTokens.colorUswdsSystemColorGray30
      textColor = DesignTokens.colorBlack
      textColorPressed = DesignTokens.colorBlack
      break
    default:
      bgColor = DesignTokens.colorUswdsSystemColorBlueVivid60
      bgColorPressed = DesignTokens.colorUswdsSystemColorBlueWarmVivid80
      textColor = DesignTokens.colorGrayLightest
      textColorPressed = DesignTokens.colorGrayLightest

      if (isDarkMode) {
        bgColor = DesignTokens.colorUswdsSystemColorBlueVivid30
        bgColorPressed = DesignTokens.colorPrimaryAltLightest
        textColor = DesignTokens.colorBlack
        textColorPressed = DesignTokens.colorBlack
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
    borderWidth: borderWidth,
    borderColor:
      borderColor !== 'none'
        ? pressed
          ? borderColorPressed
          : borderColor
        : 'none',
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
      testOnly_pressed={testOnlyPressed}
    >
      {({ pressed }: PressableStateCallbackType) => (
        <Text style={getTextStyle(pressed)}>{label}</Text>
      )}
    </Pressable>
  )
}
