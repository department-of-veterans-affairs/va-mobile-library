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

export const ButtonTypesConstants: {
  buttonPrimary: ButtonTypes
  buttonSecondary: ButtonTypes
  buttonDestructive: ButtonTypes
  buttonWhite: ButtonTypes
} = {
  buttonPrimary: 'buttonPrimary',
  buttonSecondary: 'buttonSecondary',
  buttonDestructive: 'buttonDestructive',
  buttonWhite: 'buttonWhite',
}

export type ButtonTypes =
  | 'buttonPrimary'
  | 'buttonSecondary'
  | 'buttonDestructive'
  | 'buttonWhite'

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
  buttonType?: ButtonTypes
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
  const isDestructive = buttonType === ButtonTypesConstants.buttonDestructive
  const isSecondary = buttonType === ButtonTypesConstants.buttonSecondary
  const isWhite = buttonType === ButtonTypesConstants.buttonWhite

  let bgColor: string,
    bgColorPressed: string,
    textColor: string,
    textColorPressed: string,
    borderColor: string = 'none',
    borderColorPressed: string = 'none'

  if (isWhite) {
    bgColor = DesignTokens.colorWhite
    bgColorPressed = '#ffffffb3'
    textColor = '#003e73'
  } else if (colorScheme === 'light') {
    bgColor = '#005EA2'
    bgColorPressed = '#162E51'
    textColor = DesignTokens.colorGrayLightest
    textColorPressed = DesignTokens.colorGrayLightest

    if (isDestructive) {
      bgColor = '#B50909'
      bgColorPressed = '#5C1111'
    } else if (isSecondary) {
      bgColor = DesignTokens.colorWhite
      bgColorPressed = DesignTokens.colorWhite
      borderColor = '#005EA2'
      borderColorPressed = '#162E51'
      textColor = '#005EA2'
      textColorPressed = '#162E51'
    }
  } else {
    bgColor = '#58B4FF'
    bgColorPressed = '#E1F3F8'
    textColor = '#000000'
    textColorPressed = '#000000'

    if (isDestructive) {
      bgColor = '#FB5A47'
      bgColorPressed = '#F9DEDE'
    } else if (isSecondary) {
      bgColor = '#000'
      bgColorPressed = '#000'
      borderColor = '#005EA2'
      borderColorPressed = DesignTokens.colorWhite
      textColor = '#58B4FF'
      textColorPressed = DesignTokens.colorWhite
    }
  }

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
