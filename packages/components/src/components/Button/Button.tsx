import {
  Pressable,
  PressableStateCallbackType,
  Text as RNText,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { font, spacing } from '@department-of-veterans-affairs/mobile-tokens'

import { useTheme } from '../../utils'

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

/**
 * #### [<u>View guidance for the Button component on the VA Design System</u>](https://design.va.gov/components/button/)
 */
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
  const { typography, family } = font

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
    padding: spacing.vadsSpaceSm,
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
  const getTextStyle = (pressed: boolean): TextStyle => ({
    ...typography.vadsFontBodyLarge,
    fontFamily: family.vadsFontFamilySansSerifBold,
    marginBottom: spacing.vadsSpaceNone,
    color: pressed ? textColorPressed : textColor,
  })

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
        <RNText style={getTextStyle(pressed)}>{label}</RNText>
      )}
    </Pressable>
  )
}
