import * as DesignTokens from '@department-of-veterans-affairs/mobile-tokens'
import {
  AccessibilityState,
  Pressable,
  PressableStateCallbackType,
  Text,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native'
import React from 'react'

import { webStorybookColorScheme } from '../../utils'

export enum VAButtonVariants {
  Primary,
  Secondary,
  Destructive,
  White,
}

export type VAButtonProps = {
  /** text appearing in the button */
  label: string
  /** function called when button is pressed */
  onPress: () => void
  /** optional accessibility state */
  accessibilityState?: AccessibilityState
  /** text to use as the accessibility hint */
  a11yHint?: string
  /** specifies button styling type. defaults to primary if none specified  */
  buttonType?: VAButtonVariants
  /** a string value used to set the buttons testID/accessibility label */
  testID?: string
}

export const VAButton: React.FC<VAButtonProps> = ({
  label,
  onPress,
  accessibilityState,
  a11yHint,
  buttonType,
  testID,
}) => {
  const colorScheme = webStorybookColorScheme() || useColorScheme()
  const isDestructive = buttonType === VAButtonVariants.Destructive
  const isSecondary = buttonType === VAButtonVariants.Secondary
  const isWhite = buttonType === VAButtonVariants.White

  let bgColor: string,
    bgColorPressed: string,
    textColor: string,
    textColorPressed: string,
    borderColor: string = 'none',
    borderColorPressed: string = 'none'

  if (isWhite) {
    // This is a one-off, mobile app only variant. Colors are not tokenized
    bgColor = DesignTokens.colorWhite
    bgColorPressed = '#ffffffb3'
    textColor = '#003e73'
  } else if (colorScheme === 'light') {
    bgColor = DesignTokens.colorUswdsSystemColorBlueVivid60
    bgColorPressed = DesignTokens.colorUswdsSystemColorBlueWarmVivid80
    textColor = DesignTokens.colorGrayLightest
    textColorPressed = DesignTokens.colorGrayLightest

    if (isDestructive) {
      bgColor = DesignTokens.colorUswdsSystemColorRedVivid60
      bgColorPressed = DesignTokens.colorUswdsSystemColorRedVivid80
    } else if (isSecondary) {
      bgColor = DesignTokens.colorWhite
      bgColorPressed = DesignTokens.colorWhite
      borderColor = DesignTokens.colorUswdsSystemColorBlueVivid60
      borderColorPressed = DesignTokens.colorUswdsSystemColorBlueWarmVivid80
      textColor = DesignTokens.colorUswdsSystemColorBlueVivid60
      textColorPressed = DesignTokens.colorUswdsSystemColorBlueWarmVivid80
    }
  } else {
    bgColor = DesignTokens.colorUswdsSystemColorBlueVivid30
    bgColorPressed = DesignTokens.colorPrimaryAltLightest
    textColor = DesignTokens.colorBlack
    textColorPressed = DesignTokens.colorBlack

    if (isDestructive) {
      bgColor = DesignTokens.colorUswdsSystemColorRedVivid40
      bgColorPressed = DesignTokens.colorSecondaryLightest
    } else if (isSecondary) {
      bgColor = DesignTokens.colorBlack
      bgColorPressed = DesignTokens.colorBlack
      borderColor = DesignTokens.colorUswdsSystemColorBlueVivid60
      borderColorPressed = DesignTokens.colorWhite
      textColor = DesignTokens.colorUswdsSystemColorBlueVivid30
      textColorPressed = DesignTokens.colorWhite
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
    borderWidth: isSecondary ? 2 : 0,
    borderColor: isSecondary
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
      accessibilityRole="button"
      accessible={true}
      accessibilityState={accessibilityState || {}}
      testID={testID || label}
    >
      {({ pressed }: PressableStateCallbackType) => (
        <Text style={getTextStyle(pressed)}>{label}</Text>
      )}
    </Pressable>
  )
}
