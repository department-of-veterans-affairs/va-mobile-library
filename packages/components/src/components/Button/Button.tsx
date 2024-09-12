import {
  Pressable,
  PressableStateCallbackType,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'
import React from 'react'

import { useTheme } from '../../utils/useTheme'

export enum ButtonVariants {
  Base = 'Base',
  BaseSecondary = 'BaseSecondary',
  Destructive = 'Destructive',
  Primary = 'Primary',
  Secondary = 'Secondary',
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
  const theme = useTheme()

  let bgColor: string,
    bgColorPressed: string,
    textColor: string,
    textColorPressed: string,
    borderWidth: number = 0,
    borderColor: string = 'none',
    borderColorPressed: string = 'none'

  switch (buttonType) {
    case ButtonVariants.Base:
      bgColor = theme.vadsColorActionSurfaceBase
      bgColorPressed = theme.vadsColorActionSurfaceBaseActive
      textColor = theme.vadsColorForegroundInverse
      textColorPressed = theme.vadsColorForegroundInverse
      break
    case ButtonVariants.BaseSecondary:
      bgColor = 'transparent'
      bgColorPressed = 'transparent'
      borderColor = theme.vadsColorActionBorderBase
      borderColorPressed = theme.vadsColorActionBorderBaseActive
      textColor = theme.vadsColorActionForegroundBase
      textColorPressed = theme.vadsColorActionForegroundBaseActive
      borderWidth = 2
      break
    case ButtonVariants.Destructive:
      bgColor = theme.vadsColorActionSurfaceDestructive
      bgColorPressed = theme.vadsColorActionSurfaceDestructiveActive
      textColor = theme.vadsColorForegroundInverse
      textColorPressed = theme.vadsColorForegroundInverse
      break
    case ButtonVariants.Secondary:
      bgColor = 'transparent'
      bgColorPressed = 'transparent'
      borderColor = theme.vadsColorActionBorderDefault
      borderColorPressed = theme.vadsColorActionBorderDefaultActive
      textColor = theme.vadsColorActionForegroundDefault
      textColorPressed = theme.vadsColorActionForegroundDefaultActive
      borderWidth = 2
      break
    default:
      bgColor = theme.vadsColorActionSurfaceDefault
      bgColorPressed = theme.vadsColorActionSurfaceDefaultActive
      textColor = theme.vadsColorForegroundInverse
      textColorPressed = theme.vadsColorForegroundInverse
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
