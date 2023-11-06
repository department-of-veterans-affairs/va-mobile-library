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

import { webStorybookColorScheme } from '../../utils'

export type VAButtonProps = {
  onPress?: () => void
  text: string
  secondary?: boolean
  destructive?: boolean
  disabled?: boolean
}

export const VAButton: React.FC<VAButtonProps> = ({
  onPress,
  text,
  secondary,
  destructive,
  disabled,
}) => {
  const colorScheme = webStorybookColorScheme() || useColorScheme()
  let bgColor: string,
    bgColorPressed: string,
    textColor: string,
    textColorPressed: string,
    borderColor: string = 'none',
    borderColorPressed: string = 'none'

  if (colorScheme === 'light') {
    bgColor = '#005EA2'
    bgColorPressed = '#162E51'
    textColor = DesignTokens.colorGrayLightest
    textColorPressed = DesignTokens.colorGrayLightest

    if (destructive) {
      bgColor = '#B50909'
      bgColorPressed = '#5C1111'
    } else if (secondary) {
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

    if (destructive) {
      bgColor = '#FB5A47'
      bgColorPressed = '#F9DEDE'
    } else if (secondary) {
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
    borderWidth: secondary ? 2 : 0,
    borderColor: secondary
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
    <Pressable style={getBackgroundStyle} onPress={onPress}>
      {({ pressed }: PressableStateCallbackType) => (
        <Text style={getTextStyle(pressed)}>{text}</Text>
      )}
    </Pressable>
  )
}
